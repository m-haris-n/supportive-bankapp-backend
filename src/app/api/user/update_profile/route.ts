import prisma from "@/app/lib/prisma";
import { apiResponse } from "@/app/helpers/functions";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export async function PUT(req: Request) {
  if (req.method == "PUT") {
    try {
      let body = await req.json();

      const parsedData = userSchema.parse(body);

      const user = await prisma.users.findUnique({
        where: {
          id: parsedData.id,
        },
      });

      if (!user) {
        return apiResponse(false, { user: "No user registered." }, 404);
      }

      const updatedUser = await prisma.users.update({
        where: { id: parsedData.id },
        data: parsedData,
      });

      if (updatedUser) {
        return apiResponse();
      } else {
        return apiResponse(false, { error: "Profile not upated" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return apiResponse(
          false,
          error.errors.map((e) => e.message),
          400
        );
      }
      return apiResponse(false, "Internal Server Error", 500);
    }
  } else {
    return apiResponse(false, "Method Not Allowed", 405);
  }
}
