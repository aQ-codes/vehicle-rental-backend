/*
  Warnings:

  - You are about to drop the column `variantId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `WaitingList` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `WaitingList` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `WaitingList` table. All the data in the column will be lost.
  - You are about to drop the `CarRental` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleReservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleCondition` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `WaitingList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `WaitingList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarRental" DROP CONSTRAINT "CarRental_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "CarRental" DROP CONSTRAINT "CarRental_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CarRental" DROP CONSTRAINT "CarRental_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleReservation" DROP CONSTRAINT "VehicleReservation_customerId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleReservation" DROP CONSTRAINT "VehicleReservation_variantId_fkey";

-- DropForeignKey
ALTER TABLE "WaitingList" DROP CONSTRAINT "WaitingList_modelId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "variantId",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "vehicleCondition" TEXT NOT NULL,
ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WaitingList" DROP COLUMN "endDate",
DROP COLUMN "modelId",
DROP COLUMN "startDate",
ADD COLUMN     "bookingId" INTEGER NOT NULL,
ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CarRental";

-- DropTable
DROP TABLE "VehicleReservation";

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "returnStatus" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalActive" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "dropOffDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "vehicleCondition" TEXT NOT NULL DEFAULT 'N/A',
    "currentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentalActive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "otpValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalActive" ADD CONSTRAINT "RentalActive_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalActive" ADD CONSTRAINT "RentalActive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalActive" ADD CONSTRAINT "RentalActive_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingList" ADD CONSTRAINT "WaitingList_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
