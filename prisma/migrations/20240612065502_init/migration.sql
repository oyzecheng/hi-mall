-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "UserStateEnum" AS ENUM ('enable', 'unable');

-- CreateEnum
CREATE TYPE "ProductStateEnum" AS ENUM ('ready', 'sell', 'empty');

-- CreateEnum
CREATE TYPE "OrderStateEnum" AS ENUM ('checkout', 'new', 'cancelled', 'fulfilled');

-- CreateEnum
CREATE TYPE "OrderPaymentState" AS ENUM ('checkout', 'awaiting', 'cancelled', 'pay', 'refunded');

-- CreateEnum
CREATE TYPE "OrderShipmentState" AS ENUM ('checkout', 'ready', 'cancelled', 'shipped');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "password" TEXT NOT NULL,
    "role" "RoleEnum" DEFAULT 'user',
    "state" "UserStateEnum" DEFAULT 'enable',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorys" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "cover" TEXT[],
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "sale" INTEGER NOT NULL,
    "state" "ProductStateEnum" DEFAULT 'ready',
    "stock" INTEGER NOT NULL,
    "recommend" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "orderNo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "state" "OrderStateEnum" DEFAULT 'checkout',
    "paymentState" "OrderPaymentState" DEFAULT 'checkout',
    "shipmentState" "OrderShipmentState" DEFAULT 'checkout',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "payAt" TIMESTAMP(3) NOT NULL,
    "fulfilledAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
