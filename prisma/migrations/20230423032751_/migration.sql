/*
  Warnings:

  - You are about to alter the column `fecha_compra` on the `compra` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[id_producto]` on the table `cantidad` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `cantidad` DROP FOREIGN KEY `Cantidad_id_producto_fkey`;

-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_id_consumidor_fkey`;

-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_id_producto_fkey`;

-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `Producto_id_distribuidor_fkey`;

-- AlterTable
ALTER TABLE `compra` MODIFY `fecha_compra` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cantidad_id_producto_key` ON `cantidad`(`id_producto`);

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_id_distribuidor_fkey` FOREIGN KEY (`id_distribuidor`) REFERENCES `distribuidor`(`id_distribuidor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cantidad` ADD CONSTRAINT `cantidad_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_id_consumidor_fkey` FOREIGN KEY (`id_consumidor`) REFERENCES `consumidor`(`id_consumidor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;
