import { gql } from 'apollo-server-express';

const otpTypeDefs = gql`

  extend type Mutation {
    sendOtp(phoneNumber: String!): String
  }

  extend type Query {
    validateOtp(phoneNumber: String!, otp: String!): String
  }
`;

export default otpTypeDefs;

