import prisma from "../lib/prisma";

export const getUser = async (id: string) => {
  const user = await prisma.users.findUniqueOrThrow({
    where: { id },
    select: {
      transaction_history: {
        select: {
          transactions: true,
          accounts: true,
        },
      },
    },
  });
  return user;
};
