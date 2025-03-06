-- CreateTable
CREATE TABLE "transaction_history" (
    "id" UUID NOT NULL,
    "added" JSONB NOT NULL DEFAULT '[]',
    "removed" JSONB NOT NULL DEFAULT '[]',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "transaction_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction_history" ADD CONSTRAINT "transaction_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
