/*
  Warnings:

  - You are about to drop the column `bufferDays` on the `VehicleReservation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `VehicleReservation` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `VehicleReservation` table. All the data in the column will be lost.
  - Added the required column `dropoffDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffLocation` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLocation` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `VehicleReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `WaitingList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `WaitingList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VehicleReservation" DROP CONSTRAINT "VehicleReservation_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Billing" ALTER COLUMN "fine" DROP NOT NULL,
ALTER COLUMN "additionalService" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "dropoffDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dropoffLocation" INTEGER NOT NULL,
ADD COLUMN     "dropoffTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pickupDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pickupLocation" INTEGER NOT NULL,
ADD COLUMN     "pickupTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "returnDate" TIMESTAMP(3),
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "VehicleReservation" DROP COLUMN "bufferDays",
DROP COLUMN "status",
DROP COLUMN "vehicleId",
ADD COLUMN     "returnDate" TIMESTAMP(3),
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WaitingList" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "CarRental" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "dropoffDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "return" TEXT,
    "actualReturnDate" TIMESTAMP(3),

    CONSTRAINT "CarRental_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VehicleReservation" ADD CONSTRAINT "VehicleReservation_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "VehicleInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarRental" ADD CONSTRAINT "CarRental_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarRental" ADD CONSTRAINT "CarRental_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarRental" ADD CONSTRAINT "CarRental_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
