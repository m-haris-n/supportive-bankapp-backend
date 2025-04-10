import { authMiddleware } from "@/app/middleware/authMiddleware";
import { apiResponse, getUserId } from "@/app/helpers/functions";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const GET = authMiddleware(async (req: NextRequest) => {
  const user = await prisma.users.findFirst({
    where: {
      id: getUserId(req),
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
    },
  });

  if (!user) {
    return apiResponse(
      false,
      { email: "No user registered with this email" },
      404
    );
  }

  return apiResponse(true, user);
});
