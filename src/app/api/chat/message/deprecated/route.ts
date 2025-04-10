import { masterPrompt } from "@/app/constants/prompt";
import { getChatHistory } from "@/app/controllers/ChatControllers";
import { getUser } from "@/app/controllers/UserControllers";
import {
  apiResponse,
  countGeminiTokens,
  transformChatHistory,
} from "@/app/helpers/functions";
import prisma from "@/app/lib/prisma";
import {
  Content,
  GoogleGenerativeAI,
  SchemaType,
} from "@google/generative-ai";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { z } from "zod";
const schema = z.object({
  chat_id: z.string().min(1),
  sender_id: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  if (req.method == "POST") {
    try {
      let body = await req.json();

      const parsedData = schema.parse(body);

      const user = await getUser(parsedData.sender_id);

      const transactionHistory = user?.transaction_history;

      const genAI = new GoogleGenerativeAI(
        process.env.GOOGLE_API_KEY as string
      );

      const model = genAI.getGenerativeModel({
        model: process.env.GOOGLE_MODEL as string,
        // tools: [
        //   {
        //     functionDeclarations: [
        //       {
        //         name: "google_search",
        //         description:
        //           "Performs a Google Search and returns snippets of search results.",
        //         parameters: {
        //           type: SchemaType.OBJECT,
        //           properties: {
        //             query: {
        //               type: SchemaType.STRING,
        //               description: "The search query.",
        //             },
        //           },
        //           required: ["query"],
        //         },
        //       },
        //     ],
        //   },
        // ],
      });

      // Get chat history
      const chatHistory = await getChatHistory(parsedData.chat_id);


      // Format messages according to Google GenAI API requirements
      const messages: Content[] = [...transformChatHistory(chatHistory)];

      const tokens = await countGeminiTokens(
        JSON.stringify(messages),
        process.env.GOOGLE_MODEL as string
      );
      if (tokens >= 500000) {
        return apiResponse(
          false,
          "Exceeded chat limit. Please start a new chat.",
          400
        );
      }

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `${masterPrompt}
${JSON.stringify(transactionHistory)}`,
              },
            ],
          },
          ...messages,
        ],
      });

      const result = await chat.sendMessage([{ text: parsedData.message }]);
      const aiResponse = result.response.text();
      if(aiResponse == "") {

        const functionCall = result.response.candidates?.[0]?.content.parts[0].functionCall;
        if(functionCall) {
          const functionName = functionCall.name;
          const functionArgs = functionCall.args;
          if(functionName === "google_search") {
            console.log("functionArgs: ", functionArgs);
          }
        }
        return apiResponse(true, "I'm sorry, I don't know how to answer that.", 201);
      }

      await prisma.chat_messages.create({
        data: parsedData,
      });

      // Save AI response
      const message = await prisma.chat_messages.create({
        data: {
          chat_id: parsedData.chat_id,
          message: aiResponse ?? "I'm sorry, I don't know how to answer that.",
        },
      });

      return apiResponse(true, message, 201);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        return apiResponse(
          false,
          error.errors.map((e) => e.message),
          400
        );
      }

      if (error instanceof PrismaClientValidationError) {
        return apiResponse(false, error.message);
      }
      return apiResponse(false, error, 500);
    }
  } else {
    return apiResponse(false, "Method Not Allowed", 405);
  }
}
