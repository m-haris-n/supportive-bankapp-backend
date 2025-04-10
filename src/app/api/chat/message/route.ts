import { masterPrompt } from "@/app/constants/prompt";
import { getChatHistory } from "@/app/controllers/ChatControllers";
import { getUser } from "@/app/controllers/UserControllers";
import {
  apiResponse,
  countGeminiTokens,
  transformChatHistory,
} from "@/app/helpers/functions";
import prisma from "@/app/lib/prisma";
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
      
      // Get chat history
      const chatHistory = await getChatHistory(parsedData.chat_id);

      // Format request for Python backend
      const chatRequest = {
        message: parsedData.message,
        chat_history: [
          {
            role: "user",
            content: `${masterPrompt}\n${JSON.stringify(transactionHistory)}`
          },
          {
            role: "model",
            content: "Sure, understood."
          },
          ...chatHistory.map(msg => ({
            role: msg.sender_id === parsedData.sender_id ? "user" : "model",
            content: msg.message
          }))
        ]
      };

      // Check token count
      const tokens = await countGeminiTokens(
        JSON.stringify(chatRequest),
        process.env.GOOGLE_MODEL as string
      );
      if (tokens >= 500000) {
        return apiResponse(
          false,
          "Exceeded chat limit. Please start a new chat.",
          400
        );
      }

      console.log(chatRequest);
      
      // Send request to Python backend
      const response = await fetch(process.env.GENAI_LINK as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatRequest)
      });

      const data = await response.json();
      const aiResponse = data.response;

      // Save user message
      await prisma.chat_messages.create({
        data: parsedData,
      });

      console.log("aiResponse",data);
      // Save AI response
      const message = await prisma.chat_messages.create({
        data: {
          chat_id: parsedData.chat_id,
          message: aiResponse,
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
