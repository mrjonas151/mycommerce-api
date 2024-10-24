-- CreateTable
CREATE TABLE "Integrations" (
    "integration_id" SERIAL NOT NULL,
    "user_marketplace_id" TEXT NOT NULL,
    "authorization_code" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Integrations_pkey" PRIMARY KEY ("integration_id")
);

-- AddForeignKey
ALTER TABLE "Integrations" ADD CONSTRAINT "Integrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
