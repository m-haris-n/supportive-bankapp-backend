import { masterPrompt } from "@/app/constants/prompt";
import { getChatHistory } from "@/app/controllers/ChatControllers";
import { getUser } from "@/app/controllers/UserControllers";
import {
  apiResponse,
  countGeminiTokens,
  transformChatHistory,
} from "@/app/helpers/functions";
import prisma from "@/app/lib/prisma";
import { createSearchChain } from "@/app/lib/search";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
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

      const { search, model } = createSearchChain();
      
      // Get chat history
      const chatHistory = await getChatHistory(parsedData.chat_id);
      const messages = transformChatHistory(chatHistory);

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

      let searchContext = '';
      try {
        // Perform search and get formatted results
        const searchResults = await search(parsedData.message, transactionHistory);
        if (searchResults) {
          searchContext = `\n${searchResults}\n\nPlease use the above search results to help answer the question. 
          If the search results are relevant, incorporate them into your response. 
          If they're not relevant, you can ignore them and answer based on your knowledge.`;
        }
      } catch (error) {
        console.error("Search failed, continuing without search results:", error);
        // Continue without search results
      }
      console.log(messages.toString());
      const response = await model.invoke([
        new SystemMessage(`${masterPrompt}
${JSON.stringify(transactionHistory)}${searchContext}`),
        ...messages.map(msg => 
          msg.role === "user" 
            ? new HumanMessage(msg.parts[0].text)
            : new AIMessage(msg.parts[0].text)
        ),
        new HumanMessage(parsedData.message),
      ]);

      const aiResponse = response.content.toString();

      if (!aiResponse) {
        return apiResponse(true, "I'm sorry, I don't know how to answer that.", 201);
      }

      // await prisma.chat_messages.create({
      //   data: parsedData,
      // });

      // // Save AI response
      // const message = await prisma.chat_messages.create({
      //   data: {
      //     chat_id: parsedData.chat_id,
      //     message: aiResponse,
      //   },
      // });

      return apiResponse(true, aiResponse, 201);
    } catch (error) {
      console.error("Error in chat message:", error);
      return apiResponse(false, error, 500);
    }
  } else {
    return apiResponse(false, "Method not allowed", 405);
  }
}
