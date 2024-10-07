/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `allow_to_buy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `allow_to_list` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `allow_to_sell` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `alternative_phone_area_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `alternative_phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bill_data` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `buyer_canceled_transactions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `buyer_reputation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `context` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `credit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `identification_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `identification_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mercadoenvios` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mercadopago_account_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mercadopago_tc_accepted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `permalink` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_area_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `registration_identifiers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `secure_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_experience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_power_seller_status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_ratings_negative` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_ratings_neutral` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_ratings_positive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_reputation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_reputation_level_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_transactions_canceled` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_transactions_completed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seller_transactions_total` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `site_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `site_status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_level` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "allow_to_buy",
DROP COLUMN "allow_to_list",
DROP COLUMN "allow_to_sell",
DROP COLUMN "alternative_phone_area_code",
DROP COLUMN "alternative_phone_number",
DROP COLUMN "bill_data",
DROP COLUMN "buyer_canceled_transactions",
DROP COLUMN "buyer_reputation",
DROP COLUMN "city",
DROP COLUMN "company",
DROP COLUMN "context",
DROP COLUMN "country_id",
DROP COLUMN "credit",
DROP COLUMN "gender",
DROP COLUMN "identification_number",
DROP COLUMN "identification_type",
DROP COLUMN "logo",
DROP COLUMN "mercadoenvios",
DROP COLUMN "mercadopago_account_type",
DROP COLUMN "mercadopago_tc_accepted",
DROP COLUMN "permalink",
DROP COLUMN "phone_area_code",
DROP COLUMN "phone_number",
DROP COLUMN "phone_verified",
DROP COLUMN "points",
DROP COLUMN "registration_identifiers",
DROP COLUMN "secure_email",
DROP COLUMN "seller_experience",
DROP COLUMN "seller_power_seller_status",
DROP COLUMN "seller_ratings_negative",
DROP COLUMN "seller_ratings_neutral",
DROP COLUMN "seller_ratings_positive",
DROP COLUMN "seller_reputation",
DROP COLUMN "seller_reputation_level_id",
DROP COLUMN "seller_transactions_canceled",
DROP COLUMN "seller_transactions_completed",
DROP COLUMN "seller_transactions_total",
DROP COLUMN "site_id",
DROP COLUMN "site_status",
DROP COLUMN "state",
DROP COLUMN "status",
DROP COLUMN "tags",
DROP COLUMN "thumbnail",
DROP COLUMN "user_type",
DROP COLUMN "zip_code",
ADD COLUMN     "cnpj" VARCHAR(20),
ADD COLUMN     "company_name" VARCHAR(255),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fantasy_name" VARCHAR(255),
ADD COLUMN     "phone" VARCHAR(20),
ADD COLUMN     "tax_rate" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_level" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "User"("cnpj");
