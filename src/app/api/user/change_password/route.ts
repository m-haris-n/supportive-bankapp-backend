import prisma from "@/app/lib/prisma";
import { apiResponse } from "@/app/helpers/functions";
import { z } from "zod";
import bcrypt from "bcrypt";

const userSchema = z.object({
  id: z.string(),
  old_password: z.string(),
  new_password: z.string(),
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

      const checkPassword = await bcrypt.compare(
        parsedData.old_password,
        user.password
      );

      if (!checkPassword) {
        return apiResponse(
          false,
          { password: "Old password is not correct" },
          401
        );
      }

      parsedData.new_password = await bcrypt.hash(parsedData.new_password, 10);

      const updatedUser = await prisma.users.update({
        where: { id: parsedData.id },
        data: {
          password: parsedData.new_password,
        },
      });

      if (updatedUser) {
        return apiResponse();
      } else {
        return apiResponse(false, { error: "Password didn't changed" });
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
