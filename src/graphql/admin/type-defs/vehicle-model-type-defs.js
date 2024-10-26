import { gql } from 'apollo-server-express';

const vehicleModelTypeDefs = gql`
    scalar Upload

    type VehicleModel {
        id: Int!
        name: String!
        make: String!
        model: String!
        type: String!
        doors: Int!                
        seats: Int!               
        description: String!      
        primaryImage: String      
        additionalImages: [String!]!  
        quantity: Int!
    }

    input AddVehicleModelInput {
        name: String!
        make: String!
        model: String!
        type: String!
        doors: Int!
        seats: Int!
        description: String! 
        primaryImage: Upload! 
        additionalImages: [Upload!]!
    }

    # Queries 
    extend type Query {
        getVehicleModels: [VehicleModel!]!
        getVehicleModel(id: Int!): VehicleModel
    }

    # Mutations 
    extend type Mutation {
        addVehicleModel(input: AddVehicleModelInput!): String!
        editVehicleModel(input: AddVehicleModelInput!): String!
        deleteVehicleModel(id: Int!): Boolean!
    }
`;

export default vehicleModelTypeDefs;
