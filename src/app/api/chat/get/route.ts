import { authMiddleware } from "@/app/middleware/authMiddleware";
import { apiResponse, getUserId } from "@/app/helpers/functions";
import prisma from "@/app/lib/prisma";

export const GET = authMiddleware(async (req: any) => {
  if (req.method == "GET") {
    try {
      const user_id = getUserId(req);
      const url = new URL(req.url);
      const chat_id = url.searchParams.get("chat_id");

      if (!chat_id) {
        return apiResponse(false, "Chat ID is required");
      }

      const chats = await prisma.chats.findFirst({
        where: { id: chat_id, user_id: user_id },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (!chats) {
        return apiResponse(false, "Chat not found");
      }

      return apiResponse(true, chats);
    } catch (e) {
      return apiResponse(false, e);
    }
  } else {
    return apiResponse(false, "Method not allowed");
  }
});
