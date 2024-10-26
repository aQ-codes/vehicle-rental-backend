/*
  Warnings:

  - You are about to drop the column `door` on the `VehicleModel` table. All the data in the column will be lost.
  - Added the required column `doors` to the `VehicleModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VehicleModel" DROP COLUMN "door",
ADD COLUMN     "doors" INTEGER NOT NULL;
