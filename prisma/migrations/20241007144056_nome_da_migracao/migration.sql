/*
  Warnings:

  - You are about to drop the column `cnpj` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fantasy_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tax_rate` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_cnpj_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cnpj",
DROP COLUMN "company_name",
DROP COLUMN "fantasy_name",
DROP COLUMN "nickname",
DROP COLUMN "tax_rate";

-- CreateTable
CREATE TABLE "Company" (
    "company_id" TEXT NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "fantasy_name" VARCHAR(255),
    "tax_rate" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
