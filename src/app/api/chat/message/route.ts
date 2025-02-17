import prisma from "@/app/lib/prisma";
import { apiResponse, getUserId } from "@/app/helpers/functions";
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
      const user_id = getUserId(req);

      const parsedData = schema.parse(body);

      const message = await prisma.chat_messages.create({
        // @ts-ignore
        data: parsedData,
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
      return apiResponse(false, error, 500);
    }
  } else {
    return apiResponse(false, "Method Not Allowed", 405);
  }
}
