import { apiResponse } from "@/app/helpers/functions";
import { NextRequest, NextResponse } from "next/server";
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from "plaid";

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

export async function GET(
  request: NextRequest,
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  if (request.method == "GET") {
    try {
      const id = params.id;

      const response = await plaidClient.linkTokenCreate({
        user: { client_user_id: id },
        client_name: "Supportive App",
        products: ["auth" as Products], // Use 'auth' for user authentication
        country_codes: ["US" as CountryCode],
        language: "en",
      });

      return apiResponse(true, response.data);
    } catch (error) {
      if (error instanceof Error) {
        return apiResponse(false, { error: error.message }, 500);
      }
      return apiResponse(false, { error: "Unknown error" }, 500);
    }
  } else {
    return apiResponse(false, "Method Not Allowed", 405);
  }
}
