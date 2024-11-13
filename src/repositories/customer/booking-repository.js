import prisma from '../../models/prisma.client.js'; 

const bookingRepository = {

  create : async (data) => {
    return await prisma.booking.create({
      data,
    });
  },
  
  confirmBooking : async (bookingId) => {
    // Begin a transaction
    return await prisma.$transaction(async (prisma) => {
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "Confirmed" },
      });
  
      await prisma.vehicleReservation.create({
        data: {
          bookingId: booking.id,
          vehicleId: booking.variantId,
          customerId: booking.customerId,
          startDate: booking.pickupDate,
          endDate: booking.dropoffDate,
          status: "Reserved",
        },
      });
  
      return booking;
    });
  },
  
  getAvailableVehiclesInGroup: async (vehicleGroup, startDate, endDate) => {
    const availableVehicles = [];
  
    for (const vehicle of vehicleGroup) {
      const isAvailable = await prisma.booking.findFirst({
        where: {
          vehicleId: vehicle.id,
          OR: [
            { dropoffDate: { lt: startDate } },
            { pickupDate: { gt: endDate } }
          ]
        }
      });
  
      if (isAvailable) availableVehicles.push(vehicle);
    }
  
    return availableVehicles;
  },

}

export default bookingRepository;