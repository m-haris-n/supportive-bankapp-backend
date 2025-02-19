import { apiResponse } from "@/app/helpers/functions";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import prisma from "@/app/lib/prisma";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(req: Request) {
  if (req.method == "POST") {
    try {
      let body = await req.json();
      const public_token = body.public_token;

      const existingUser = await prisma.users.findFirst({
        where: {
          id: body.user_id,
        },
      });

      if (!existingUser) {
        return apiResponse(false, { user: "No user registered." }, 404);
      }

      const plaidResponse = await plaidClient.itemPublicTokenExchange({
        public_token,
      });

      const updatedUser = await prisma.users.update({
        where: { id: body.user_id },
        data: {
          access_token: plaidResponse.data.access_token,
          institute_id: body.institute_id,
          is_plaid_connect: true,
        },
      });

      if (updatedUser) {
        return apiResponse(true, { is_plaid_connect: true });
      } else {
        return apiResponse(false, { error: "User not updated" });
      }
    } catch (error) {
      if (error instanceof Error) {
        return apiResponse(false, error, 500);
      }
      return apiResponse(false, { error: "Unknown error" }, 500);
    }
  } else {
    return apiResponse(false, "Method Not Allowed", 405);
  }
}
