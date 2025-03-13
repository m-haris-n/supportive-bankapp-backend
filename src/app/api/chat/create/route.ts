import prisma from "@/app/lib/prisma";
import { apiResponse, cleanAccounts, cleanTransactions, updateTransactionHistory } from "@/app/helpers/functions";
import { z } from "zod";
import PlaidClient from "@/app/lib/plaid";
import { authMiddleware } from "@/app/middleware/authMiddleware";

const schema = z.object({
  user_id: z.string().min(1, "User id is required"),
});

export const POST = authMiddleware(async (req: Request) => {
  if (req.method == "POST") {
    try {
      let body = await req.json();

      const parsedData = schema.parse(body);

      const chat = await prisma.chats.create({
        // @ts-ignore
        data: parsedData,
      });

      await prisma.users.findFirstOrThrow({
        where: {
          id: parsedData.user_id,
        },
      }); 

      await updateTransactionHistory(parsedData.user_id);

      return apiResponse(true, chat, 201);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        return apiResponse(
          false,
          error.errors.map((e) => e.message),
          400
        );
      }
      return apiResponse(false, error, 500);
    }
  } else {
    return apiResponse(false, "Method Not Allowed", 405);
  }
});
