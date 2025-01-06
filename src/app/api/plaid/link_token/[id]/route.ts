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

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: id },
      client_name: "Supportive App",
      products: ["auth"], // Use 'auth' for user authentication
      country_codes: ["US"],
      language: "en",
    });

    return apiResponse(true, response.data);
  } catch (error) {
    if (error instanceof Error) {
      return apiResponse(false, { error: error.message }, 500);
    }
    return apiResponse(false, { error: "Unknown error" }, 500);
  }
};
