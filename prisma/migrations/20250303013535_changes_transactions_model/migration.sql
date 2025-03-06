/*
  Warnings:

  - You are about to drop the column `added` on the `transaction_history` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `transaction_history` table. All the data in the column will be lost.
  - You are about to drop the column `removed` on the `transaction_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transaction_history" DROP COLUMN "added",
DROP COLUMN "metadata",
DROP COLUMN "removed",
ADD COLUMN     "transactions" JSONB NOT NULL DEFAULT '[]';
