import { gql } from 'apollo-server-express';

const BookingTypeDefs = gql`

type Booking {
  id: Int!
  customerId: Int!
  vehicleId: Int!
  pickupLocation: Int!
  dropoffLocation: Int!
  pickupDate: String!
  dropoffDate: String!
  pickupTime: String!
  dropoffTime: String!
  type: String!  #regular or waiting-list
  status: String! # e.g., "Pending", "Confirmed", "Cancelled"
  returnDate: String
  returnTime: String
  vehicleCondition: String
}

# Input types for mutations
input BookingInput {
  customerId: Int!
  vehicleId: Int!
  pickupLocation: Int!
  dropoffLocation: Int!
  pickupDate: String!
  dropoffDate: String!
  pickupTime: String!
  dropoffTime: String!
  type:String!
  status: String!
}


type Mutation {
  createBooking(input: BookingInput!): String!
  confirmBooking(bookingId: Int!): String!
  cancelBooking(bookingId: Int!): String!
}

type Query{
  getBookingStatus(bookingId: Int!): String!
}

`;

export default BookingTypeDefs;
