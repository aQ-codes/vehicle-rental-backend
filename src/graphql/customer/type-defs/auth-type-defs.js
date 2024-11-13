import { gql } from 'apollo-server-express';

const customerAuthTypeDefs = gql`

type LoginResponse {
  success: Boolean!
  errors: [String]
  id: Int
}

extend type Mutation {
  loginCustomer(email: String!, password: String!): LoginResponse!
  logoutCustomer: String! 
}

`;

export default customerAuthTypeDefs;
