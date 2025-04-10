import prisma from "@/app/lib/prisma";
import { apiResponse, generateOTP } from "@/app/helpers/functions";
import { z } from "zod";
import nodemailer from "nodemailer";

const userSchema = z.object({
  email: z.string().email("Email is invalid"),
});

export async function POST(req: Request) {
  if (req.method == "POST") {
    try {
      const body = await req.json();

      const parsedData = userSchema.parse(body);

      const user = await prisma.users.findUnique({
        where: {
          email: parsedData.email,
        },
      });

      if (!user) {
        return apiResponse(false, { user: "No user registered." }, 404);
      }

      const otp = generateOTP();
      const otp_expiry = new Date();
      otp_expiry.setDate(otp_expiry.getDate() + 1);

      const updatedUser = await prisma.users.update({
        where: { id: user.id },
        data: {
          otp: otp,
          otp_expire_at: otp_expiry,
        },
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "OTP",
        text: otp,
      };

      await transporter.sendMail(mailOptions);

      if (updatedUser) {
        return apiResponse(true, { msg: "OTP has been to your email address" });
      } else {
        return apiResponse(false, { error: "Failed to send OTP" });
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
