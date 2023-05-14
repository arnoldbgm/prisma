/*
  Warnings:

  - You are about to alter the column `fecha_compra` on the `compra` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `compra` MODIFY `fecha_compra` DATETIME NOT NULL;
