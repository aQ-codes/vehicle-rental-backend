import { gql } from 'apollo-server-express';

const customerTypeDefs = gql`
  type Customer {
    id: Int!
    name: String!
    email: String!
    phone: String!
    city: String!
    state: String!
    country: String!
    pincode: String!
    isVerified:Boolean!
  }

  input AddCustomerInput {
    name: String!
    email: String!
    phone: String!
    city: String!
    state: String!
    country: String!
    pincode: String!
    password: String!
    isVerified:Boolean!
  }

  type RegisterResponse {
    success: Boolean!
    errors: [String!]!
  }

  # Queries
  extend type Query {
    getCustomers: [Customer!]!
    getCustomer(id: Int!): Customer
  }

  # Mutations
  extend type Mutation {
      addCustomer(input: AddCustomerInput!): RegisterResponse!
  }
`;

export default customerTypeDefs;
