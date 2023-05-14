/*
  Warnings:

  - You are about to alter the column `fecha_compra` on the `compra` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[nombre]` on the table `distribuidor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `compra` MODIFY `fecha_compra` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `distribuidor_nombre_key` ON `distribuidor`(`nombre`);
