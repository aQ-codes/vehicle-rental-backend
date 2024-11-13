import { gql } from 'apollo-server-express';

const ReservationTypeDefs = gql`

type Reservation {
  startDate: String!
  endDate: String!
  waitingListNumber: Int!
}

type Query{
  getReservationList(vehicleId: Int!): [Reservation!]! #get active and upcoming reservation dates and waitinglist number
}

`;

export default ReservationTypeDefs;
