import { apiResponse } from "@/app/helpers/functions";
import { NextRequest } from "next/server";
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";

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

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id") as string;

    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: id },
      client_name: "Supportive App",
      products: ["auth" as Products, "transactions" as Products], // Use 'auth' for user authentication
      country_codes: ["US" as CountryCode],
      language: "en",
      android_package_name: 'com.supportive.app',
    });

    return apiResponse(true, response.data);
  } catch (error) {
    if (error instanceof Error) {
      return apiResponse(false, { error: error.message }, 500);
    }
    return apiResponse(false, { error: "Unknown error" }, 500);
  }
};
