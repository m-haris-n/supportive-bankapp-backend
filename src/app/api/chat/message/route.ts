import prisma from "@/app/lib/prisma";
import { apiResponse, getUserId } from "@/app/helpers/functions";
import { z } from "zod";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

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

      await prisma.chat_messages.create({
        data: parsedData,
      });

      const message = await prisma.chat_messages.create({
        data: {
          chat_id: parsedData.chat_id,
          message: "AI BOT response",
        },
      });

      return apiResponse(true, message, 201);
    } catch (error) {
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
