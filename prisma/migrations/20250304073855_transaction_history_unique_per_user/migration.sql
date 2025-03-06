/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `transaction_history` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transaction_history_user_id_key" ON "transaction_history"("user_id");
