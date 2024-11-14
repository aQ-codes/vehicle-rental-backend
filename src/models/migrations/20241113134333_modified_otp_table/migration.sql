/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OTP_customerId_key" ON "OTP"("customerId");
