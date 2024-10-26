const { gql } = require("apollo-server-express");

const otpTypeDefs = gql`
  type Query {
    sendOtp(phoneNumber: String!): String
    validateOtp(phoneNumber: String!, otp: String!): String
  }
`;

export default otpTypeDefs;

