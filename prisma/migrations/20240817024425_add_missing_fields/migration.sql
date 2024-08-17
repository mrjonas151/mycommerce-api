-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bill_data" TEXT,
ADD COLUMN     "buyer_reputation" TEXT,
ADD COLUMN     "company" VARCHAR(100),
ADD COLUMN     "context" TEXT,
ADD COLUMN     "registration_identifiers" TEXT,
ADD COLUMN     "secure_email" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seller_reputation" TEXT,
ADD COLUMN     "status" VARCHAR(20),
ADD COLUMN     "thumbnail" TEXT;
