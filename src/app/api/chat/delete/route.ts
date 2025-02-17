import { authMiddleware } from "@/app/middleware/authMiddleware";
import { apiResponse, getUserId } from "@/app/helpers/functions";
import prisma from "@/app/lib/prisma";

export const DELETE = authMiddleware(async (req: any) => {
  if (req.method !== "DELETE") {
    return apiResponse(false, "Method not allowed");
  }

  try {
    const user_id = getUserId(req);
    const { chat_id } = await req.json();

    const chat = await prisma.chats.findUnique({
      where: { id: chat_id, user_id: user_id },
    });

    if (!chat) {
      return apiResponse(false, "Chat not found.");
    }

    await prisma.chat_messages.deleteMany({
      where: { chat_id: chat_id },
    });

    await prisma.chats.delete({
      where: { id: chat_id },
    });

    return apiResponse(true, "Chat deleted successfully");
  } catch (e) {
    return apiResponse(false, e);
  }
});
