/*
  Warnings:

  - You are about to drop the column `abreviatura` on the `Movement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "abreviatura",
ADD COLUMN     "abbreviation" TEXT;
