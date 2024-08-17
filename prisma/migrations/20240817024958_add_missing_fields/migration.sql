/*
  Warnings:

  - You are about to drop the column `credit_consumed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `credit_level_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "credit_consumed",
DROP COLUMN "credit_level_id",
ADD COLUMN     "credit" JSONB;
