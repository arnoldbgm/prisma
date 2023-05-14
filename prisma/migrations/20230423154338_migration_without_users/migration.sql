/*
  Warnings:

  - You are about to alter the column `fecha_compra` on the `compra` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `compra` MODIFY `fecha_compra` DATETIME NOT NULL;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `user`;
