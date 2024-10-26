import { gql } from 'apollo-server-express';

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default baseTypeDefs;
