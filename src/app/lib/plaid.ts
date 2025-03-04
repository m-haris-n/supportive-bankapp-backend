import { PlaidApi, PlaidEnvironments, Configuration, Transaction, TransactionsSyncRequest } from "plaid";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const ENVIRONMENT = process.env.ENVIRONMENT;

const config = new Configuration({
  basePath: ENVIRONMENT === "local" ? PlaidEnvironments.sandbox : PlaidEnvironments.production,
  baseOptions: {
    headers: { "PLAID_CLIENT_ID": PLAID_CLIENT_ID, "PLAID_SECRET": PLAID_SECRET },
  },    
});

class PlaidClient {
  private plaidApi: PlaidApi;
  private accessToken: string;

  private config: Configuration;

  constructor(accessToken: string) {
    this.config = config;
    this.plaidApi = new PlaidApi(this.config);
    this.accessToken = accessToken;
  }

  public async getTransactions() {
    try {
      
        const request: TransactionsSyncRequest = {
          access_token: this.accessToken,
          cursor: "",
          client_id: PLAID_CLIENT_ID,
          secret: PLAID_SECRET,
          count: 500,
        }

      const response = await this.plaidApi.transactionsSync(request)
      return response.data;
    } catch (error) {
    
      console.log("Error fetching transactions:", error);
      throw error;
    }
  }
}

export default PlaidClient;
