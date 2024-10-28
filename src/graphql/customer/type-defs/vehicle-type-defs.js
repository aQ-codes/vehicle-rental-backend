import { gql } from 'apollo-server-express';

const vehicleTypeDefs = gql`
  # Response type for unique vehicle makes

  extend type Query {
    getUniqueMakes: [String!]!  
  }
`;

export default vehicleTypeDefs;
