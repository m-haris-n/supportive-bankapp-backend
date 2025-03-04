import { GoogleGenerativeAI } from "@google/generative-ai";
import { RemovedTransaction, Transaction } from "plaid";

export function apiResponse(
  success: boolean = true,
  data: any = null,
  status: number = 200
) {
  return Response.json(
    { success: success, data: data, status: status },
    { status }
  );
}

export function getUserId(req: any) {
  return (req as any).user.userId;
}


export const generateOTP = (length: number = 6): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
};


export const cleanAccounts = (accounts: any[]) => {
  return accounts.map((account: any) => {
    return {
      id: account.account_id,
      name: account.name,
      official_name: account.official_name,
      type: account.type,
      subtype: account.subtype,
      available_balance: account.balances.available,
      current_balance: account.balances.current,
      currency: account.balances.iso_currency_code,
    };
  }) as PlaidAccount[];
};

export const cleanTransactions = (transactions: Transaction[], accounts: PlaidAccount[]) => {


  return transactions.map((transaction) => {
    return {
      id: transaction.transaction_id,
      account: accounts.find((account: PlaidAccount) => account.id === transaction.account_id)?.name,
      amount: transaction.amount,
      date: transaction.date,
      name: transaction.name,
      merchant_name: transaction.merchant_name,
      payment_channel: transaction.payment_channel,
      personal_finance_category: transaction.personal_finance_category?.primary,
      personal_finance_category_detailed: transaction.personal_finance_category?.detailed,
      category: transaction.category,
      currency: transaction.iso_currency_code,
      pending: transaction.pending
    };
  }) as PlaidTransaction[];
};



export async function countGeminiTokens(text: string, modelName = "gemini-pro") {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string); // Replace with your API key
  const model = genAI.getGenerativeModel({ model: modelName });

  const countTokensResponse = await model.countTokens(text);
  return countTokensResponse.totalTokens;
}
