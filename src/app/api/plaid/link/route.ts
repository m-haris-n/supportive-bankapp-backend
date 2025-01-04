import { apiResponse, getUserId } from "@/app/helpers/functions";
const plaid = require("plaid");

const plaidClient = new plaid.Client({
  clientID: "676846d8491dca001bd2dd6f",
  secret: "1e50e0803950989dd5573d29deb470",
  env: plaid.environments.sandbox, // Choose sandbox, development, or production
});

export const GET = async (req: any) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: req },
      client_name: "Supportive App",
      products: ["auth"], // Use 'auth' for user authentication
      country_codes: ["US"],
      language: "en",
    //   redirect_uri: "https://yourapp.com/oauth", // Optional, for OAuth flows
    });
    return apiResponse(true, response.data);
  } catch (error) {
    return apiResponse(false, error);
  }
};
