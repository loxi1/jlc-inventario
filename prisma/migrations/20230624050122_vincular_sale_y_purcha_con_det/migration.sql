/*
  Warnings:

  - You are about to drop the `Tipomovimiento` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `purcheseId` to the `Purchasedet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleId` to the `Saledet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchasedet" ADD COLUMN     "purcheseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Saledet" ADD COLUMN     "saleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tipomovimiento";

-- AddForeignKey
ALTER TABLE "Purchasedet" ADD CONSTRAINT "Purchasedet_purcheseId_fkey" FOREIGN KEY ("purcheseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saledet" ADD CONSTRAINT "Saledet_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
