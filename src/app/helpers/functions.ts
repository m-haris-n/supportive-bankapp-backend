import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { RemovedTransaction, Transaction } from "plaid";
import prisma from "../lib/prisma";
import PlaidClient from "../lib/plaid";
import { calculateMaxTokens } from "@langchain/core/language_models/base";
import { chat_messages } from "@prisma/client";

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

export const cleanTransactions = (
  transactions: Transaction[],
  accounts: PlaidAccount[]
) => {
  return transactions.map((transaction) => {
    return {
      id: transaction.transaction_id,
      account: accounts.find(
        (account: PlaidAccount) => account.id === transaction.account_id
      )?.name,
      amount: transaction.amount,
      date: transaction.date,
      name: transaction.name,
      merchant_name: transaction.merchant_name,
      payment_channel: transaction.payment_channel,
      personal_finance_category: transaction.personal_finance_category?.primary,
      personal_finance_category_detailed:
        transaction.personal_finance_category?.detailed,
      category: transaction.category,
      currency: transaction.iso_currency_code,
      pending: transaction.pending,
    };
  }) as PlaidTransaction[];
};

export async function countGeminiTokens(
  text: string,
  modelName = "gemini-pro"
) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string); // Replace with your API key
  const model = genAI.getGenerativeModel({ model: modelName });

  const countTokensResponse = await model.countTokens(text);
  return countTokensResponse.totalTokens;
}

export const updateTransactionHistory = async (userId: string) => {
  try {
    // Get user with access token
    const user = await prisma.users.findFirstOrThrow({
      where: {
        id: userId,
      },
    });
    let cursor = "";
    let cleanedAccounts: PlaidAccount[] = [];
    let cleanedTransactions: PlaidTransaction[] = [];
    // Initialize Plaid client and fetch transactions
    const plaidClient = new PlaidClient(user.access_token as string);
    while (true) {
      const transactions = await plaidClient.getTransactions(cursor);

      // Clean the data
      cleanedAccounts.push(...cleanAccounts(transactions.accounts));
      cleanedTransactions.push(
        ...cleanTransactions(transactions.added, cleanedAccounts)
      );

      const tokens = await countGeminiTokens(
        JSON.stringify(cleanedTransactions),
        process.env.GOOGLE_MODEL as string
      );
      if (tokens > 100000 || !transactions.has_more) {
        break;
      }
      cursor = transactions.next_cursor;
    }
    // Check if a record exists for this user
    const existingRecord = await prisma.transaction_history.findFirst({
      where: {
        user_id: userId,
      },
    });

    if (existingRecord) {
      // Update existing record
      await prisma.transaction_history.update({
        where: {
          id: existingRecord.id,
        },
        data: {
          accounts: JSON.stringify(cleanedAccounts),
          transactions: JSON.stringify(cleanedTransactions),
        },
      });
    } else {
      // Create new record
      await prisma.transaction_history.create({
        data: {
          user_id: userId,
          accounts: JSON.stringify(cleanedAccounts),
          transactions: JSON.stringify(cleanedTransactions),
        },
      });
    }

    return {
      accounts: cleanedAccounts,
      transactions: cleanedTransactions,
    };
  } catch (error) {
    console.error("Error updating transaction history:", error);
    throw error;
  }
};


export const transformChatHistory = (chatHistory: chat_messages[]) => {
  return chatHistory.map((message) => {
    return {
      role: message.sender_id ? "user" : "model",
      parts: [{ text: message.message }],
    };
  });
};

export const deTransformChatHistory = (chatHistory: Content[]) => {
  return chatHistory.map((message) => {
    return {
      message: message.parts[0].text,
    };
  });
};