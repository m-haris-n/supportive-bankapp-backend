import { apiResponse } from "@/app/helpers/functions";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

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
      const { public_token } = await req.json();

      if (!public_token) {
        return apiResponse(false, "Missing paramter", 400);
      }

      const response = await plaidClient.itemPublicTokenExchange({
        public_token,
      });

      return apiResponse(true, response.data);
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
