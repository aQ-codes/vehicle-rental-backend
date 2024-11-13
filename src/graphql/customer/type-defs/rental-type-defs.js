import { gql } from 'apollo-server-express';

const RentalTypeDefs = gql`

type Rental {
  id: Int!
  pickupDate: String!
  dropoffDate: String
  currentDate: String
  status: String! #pending, pickeup, returned
  returnCondition: String # "On-Time", "Late", "Early"
  vehicleCondition: String
}

type Query{
  getActiveRentalStatus(vehicleId: Int!): Rental!
}

`;

export default RentalTypeDefs;
