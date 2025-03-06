import prisma from "../lib/prisma";

export const getChatHistory = async (chat_id: string) => {
  const chatHistory = await prisma.chat_messages.findMany({
    where: { chat_id },
    orderBy: { createdAt: "asc" },
  });
  return chatHistory;
};
