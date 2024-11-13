

const bookingResolvers = {
  Mutation: {
    createBooking: async (_, { input }) => {
      console.log('Resolver received booking data')
      return await bookingController.createBooking(input);
    },
    confirmBooking: async (_, { bookingId }) => {
      return await confirmBooking(bookingId);
    },
  },
};

export default bookingResolvers;