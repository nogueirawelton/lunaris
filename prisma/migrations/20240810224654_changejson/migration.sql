-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Lead` MODIFY `data` VARCHAR(191) NOT NULL;
