/*
  Warnings:

  - Added the required column `roleUId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Typesupplier" AS ENUM ('NATURAL', 'JURIDICA');

-- CreateEnum
CREATE TYPE "Typedocument" AS ENUM ('BOLETA', 'FACTURA');

-- CreateEnum
CREATE TYPE "Typemovement" AS ENUM ('INGRESO', 'SALIDA');

-- CreateEnum
CREATE TYPE "Typeadjustment" AS ENUM ('POSITIVO', 'NEGATIVO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleUId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rolepermission" (
    "id" SERIAL NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Rolepermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "cateoryId" INTEGER NOT NULL,
    "subcategory" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unitmeasure" (
    "id" SERIAL NOT NULL,
    "measure" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Unitmeasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "unidadId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER,
    "price" DECIMAL(65,30),
    "stock_min" DECIMAL(65,30),
    "stock_max" DECIMAL(65,30),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History_Product" (
    "id" SERIAL NOT NULL,
    "historyproductId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "unidadId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER,
    "price" DECIMAL(65,30),
    "stock_min" DECIMAL(65,30),
    "stock_max" DECIMAL(65,30),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "History_Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipomovimiento" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "tipomovimiento" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Tipomovimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identificationdocument" (
    "id" SERIAL NOT NULL,
    "identificationdocument" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Identificationdocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Naturalperson" (
    "id" SERIAL NOT NULL,
    "names" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "identifiationId" INTEGER NOT NULL,
    "numberdocument" TEXT NOT NULL,
    "email" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Naturalperson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Legalperson" (
    "id" SERIAL NOT NULL,
    "business_name" TEXT NOT NULL,
    "RUC" INTEGER NOT NULL,
    "email" TEXT,
    "natId" INTEGER,

    CONSTRAINT "Legalperson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "typeSupplier" "Typesupplier" NOT NULL DEFAULT 'JURIDICA',
    "naturalId" INTEGER,
    "legalId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "typeSupplier" "Typesupplier" NOT NULL DEFAULT 'NATURAL',
    "naturalId" INTEGER,
    "legalId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "typedocument" "Typedocument" NOT NULL DEFAULT 'BOLETA',
    "document_number" INTEGER NOT NULL,
    "monto_total" DECIMAL(65,30),
    "cientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchasedet" (
    "id" SERIAL NOT NULL,
    "prodPId" INTEGER NOT NULL,
    "price" DECIMAL(65,30),
    "amount" DECIMAL(65,30),
    "unidad" TEXT,
    "total_amount" DECIMAL(65,30),
    "name" TEXT,
    "description" TEXT,
    "SKU" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Purchasedet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "typedocument" "Typedocument" NOT NULL DEFAULT 'BOLETA',
    "supplierId" INTEGER NOT NULL,
    "document_number" INTEGER NOT NULL,
    "monto_total" DECIMAL(65,30),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saledet" (
    "id" SERIAL NOT NULL,
    "prodSId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30),
    "price" DECIMAL(65,30),
    "total_amount" DECIMAL(65,30),
    "unidad" TEXT,
    "name" TEXT,
    "description" TEXT,
    "SKU" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Saledet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adjustment" (
    "id" SERIAL NOT NULL,
    "typeadjustment" "Typeadjustment" NOT NULL DEFAULT 'POSITIVO',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Adjustment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adjustmentdet" (
    "id" SERIAL NOT NULL,
    "adjId" INTEGER NOT NULL,
    "prodAId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30),
    "price" DECIMAL(65,30),
    "total_amount" DECIMAL(65,30),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Adjustmentdet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movement" (
    "id" SERIAL NOT NULL,
    "type" "Typemovement" NOT NULL DEFAULT 'INGRESO',
    "movement" TEXT NOT NULL,
    "abreviatura" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "movementId" INTEGER NOT NULL,
    "prodInvetId" INTEGER,
    "purchasedetId" INTEGER,
    "saledetId" INTEGER,
    "adjdetId" INTEGER,
    "stock" DECIMAL(65,30),
    "amount" DECIMAL(65,30),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rolepermission" ADD CONSTRAINT "Rolepermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rolepermission" ADD CONSTRAINT "Rolepermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleUId_fkey" FOREIGN KEY ("roleUId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_cateoryId_fkey" FOREIGN KEY ("cateoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unitmeasure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History_Product" ADD CONSTRAINT "History_Product_historyproductId_fkey" FOREIGN KEY ("historyproductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Naturalperson" ADD CONSTRAINT "Naturalperson_identifiationId_fkey" FOREIGN KEY ("identifiationId") REFERENCES "Identificationdocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Legalperson" ADD CONSTRAINT "Legalperson_natId_fkey" FOREIGN KEY ("natId") REFERENCES "Naturalperson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Naturalperson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_legalId_fkey" FOREIGN KEY ("legalId") REFERENCES "Legalperson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_naturalId_fkey" FOREIGN KEY ("naturalId") REFERENCES "Naturalperson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_legalId_fkey" FOREIGN KEY ("legalId") REFERENCES "Legalperson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_cientId_fkey" FOREIGN KEY ("cientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchasedet" ADD CONSTRAINT "Purchasedet_prodPId_fkey" FOREIGN KEY ("prodPId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saledet" ADD CONSTRAINT "Saledet_prodSId_fkey" FOREIGN KEY ("prodSId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adjustmentdet" ADD CONSTRAINT "Adjustmentdet_adjId_fkey" FOREIGN KEY ("adjId") REFERENCES "Adjustment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adjustmentdet" ADD CONSTRAINT "Adjustmentdet_prodAId_fkey" FOREIGN KEY ("prodAId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_prodInvetId_fkey" FOREIGN KEY ("prodInvetId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_purchasedetId_fkey" FOREIGN KEY ("purchasedetId") REFERENCES "Purchasedet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_saledetId_fkey" FOREIGN KEY ("saledetId") REFERENCES "Saledet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_adjdetId_fkey" FOREIGN KEY ("adjdetId") REFERENCES "Adjustmentdet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
