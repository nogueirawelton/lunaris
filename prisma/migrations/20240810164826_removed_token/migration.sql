/*
  Warnings:

  - You are about to drop the column `token` on the `Customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Customer_token_key` ON `Customer`;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `token`;
