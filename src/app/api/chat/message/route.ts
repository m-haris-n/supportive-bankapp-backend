import prisma from "@/app/lib/prisma";
import { apiResponse, countGeminiTokens, getUserId } from "@/app/helpers/functions";
import { z } from "zod";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { DynamicRetrievalMode,GoogleSearchRetrievalTool } from "@google/generative-ai";

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

      const user = await prisma.users.findFirstOrThrow({
        where: {
          id: parsedData.sender_id,
        },
        select: {
          transaction_history: {
            select: {
              transactions: true,
              accounts: true
            }
          }
        },
      });

      const transactionHistory = user.transaction_history;
      
      const searchRetrievalTool: GoogleSearchRetrievalTool = {
        googleSearchRetrieval: {
          dynamicRetrievalConfig: {
            mode: DynamicRetrievalMode.MODE_DYNAMIC,
            dynamicThreshold: 0.7,
          },
        },
      };

      const model = new ChatGoogleGenerativeAI({
        modelName: process.env.GOOGLE_MODEL,
        temperature: 0,
        maxRetries: 0,
      })//.bindTools([searchRetrievalTool]);

      // Get chat history
      const chatHistory = await prisma.chat_messages.findMany({
        where: {
          chat_id: parsedData.chat_id,
        },
        orderBy: {
          createdAt: 'asc'
        }
      });
      console.log("Chat History: ",chatHistory);


      const messages = [
        {
          role: "system",
          content: `This is Plaid's transaction history activity data. Please answer questions regarding this data: ${JSON.stringify(transactionHistory)}`
        },
        // Add chat history
        ...chatHistory.map(msg => ({
          role: msg.sender_id ? "human" : "assistant",
          content: msg.message
        })),
        // Add current user message
        {
          role: "human", 
          content: parsedData.message
        }
      ];
      // console.log("Messages: ",messages);
      // const tokens = await countGeminiTokens(JSON.stringify(messages), process.env.GOOGLE_MODEL as string);
      // console.log("Tokens: ",tokens);
      // Get AI response
      const result = await model.invoke(messages);
      const aiResponse = result.content;
      console.log(aiResponse);
      // return apiResponse(true, aiResponse, 201);
      // Save user message
      await prisma.chat_messages.create({
        data: parsedData,
      });

      // Save AI response
      const message = await prisma.chat_messages.create({
        data: {
          chat_id: parsedData.chat_id,
          message: aiResponse.toString(),
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
