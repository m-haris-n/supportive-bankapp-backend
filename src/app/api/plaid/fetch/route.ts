import { apiResponse, cleanAccounts, cleanTransactions, getUserId } from "@/app/helpers/functions";
import PlaidClient from "@/app/lib/plaid";
import prisma from "@/app/lib/prisma";
import { authMiddleware } from "@/app/middleware/authMiddleware";
export const GET = authMiddleware(async (req: any) => {
  if (req.method !== "GET") {
    return apiResponse(false, "Method not allowed", 405);
  }

  const user_id = getUserId(req);

  const user = await prisma.users.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    return apiResponse(false, "User not found", 404);
  }

  const plaidClient = new PlaidClient(user.access_token as string);

  const response = await plaidClient.getTransactions();

  const cleanedAccounts = cleanAccounts(response.accounts);
  const addedTransactions = cleanTransactions(response.added, cleanedAccounts);
  const modifiedTransactions = cleanTransactions(response.modified, cleanedAccounts);

  const transactions = [...addedTransactions, ...modifiedTransactions];

  return apiResponse(true, { cleanedAccounts, transactions }, 200);
});
