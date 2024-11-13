
const bookingController = {

  //CREATE A NEW BOOKING: waiting list or regular booking

  createBooking: async (input) => {
    // Check vehicle availability within the group
    const availableVehicle = await BookingRepository.findAvailableVehicleInGroup(input.vehicleId, input.pickupDate, input.dropoffDate);
  
    if (!availableVehicle) {
      // y Add to the waiting list if no vehicles are available in the group
      const earliestVehicle = await BookingRepository.findEarliestAvailableVehicleInGroup(input.variantId, input.pickupDate, input.dropoffDate);
      
      if (!earliestVehicle) {
        return await Repository.addCustomerToWaitingList({
          customerId: input.customerId,
          variantId: input.variantId,
          startDate: input.pickupDate,
          endDate: input.dropoffDate,
          type: "wl"  // Mark this as a waiting list entry
        });
      }
  
      // Proceed with creating a waiting list booking
      input.vehicleId = earliestVehicle.id;
      input.type = "wl"; // Indicate waiting list type
    } else {
      // Step 2: Assign an available vehicle in the group to this booking
      input.vehicleId = availableVehicle.id;
      input.type = "regular"; // Regular booking type
    }
  
    // Step 4: Proceed with booking creation
    return await BookingRepository.create(input);
  },
  

  //confirm booking once payment is done

  confirmBooking : async (bookingId) => {
    const booking = await BookingRepository.confirmBooking(bookingId);
  
    // Logic for when booking is confirmed
    if (booking) {
      // Logic for car rental (real-time rental tracking) could be here.
    }
  
    return booking;
  },

}

export default bookingController;