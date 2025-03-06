-- AlterTable
ALTER TABLE "transaction_history" ADD COLUMN     "accounts" JSONB NOT NULL DEFAULT '[]';
