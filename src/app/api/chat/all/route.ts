import { authMiddleware } from "@/app/middleware/authMiddleware";
import { apiResponse, getUserId } from "@/app/helpers/functions";
import prisma from "@/app/lib/prisma";

export const GET = authMiddleware(async (req: any) => {
  if (req.method !== "GET") {
    return apiResponse(false, "Method not allowed", 405);
  }

  try {
    const user_id = getUserId(req);

    // Fetch all chats with last message
    const chats = await prisma.chats.findMany({
      where: { user_id },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1, // Fetch only the last message
        },
      },
    });

    // Fetch pinned chats separately
    const pinnedChats = await prisma.pin_chats.findMany({
      where: { user_id },
      include: {
        chats: {
          include: {
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1, // Fetch only the last message
            },
          },
        },
      },
    });

    return apiResponse(true, {
      pinnedChats: pinnedChats.map((pin) => pin.chats), // Extract chat objects
      chats,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return apiResponse(false, "An error occurred while fetching chats", 500);
  }
});
