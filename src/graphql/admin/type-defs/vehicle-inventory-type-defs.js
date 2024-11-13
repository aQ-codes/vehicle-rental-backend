import { gql } from 'apollo-server-express';

const vehicleInventoryTypeDefs = gql`

  type VehicleInventory {
      id: Int!
      modelId: Int!      
      vin: String!              
      variant: String!         
      year: Int!               
      color: String!            
      transmission: String!     
      fuelType: String!        
      engineCapacity: Float!    
      mileage: Float!           
      pricePerDay: Float!      
      status: String!                 
  }

  input AddVehicleInventoryInput {
      id: Int
      modelId: Int! 
      vin: String!            
      variant: String!
      year: Int!
      color: String!
      transmission: String!
      fuelType: String!
      engineCapacity: Float!
      mileage: Float!
      pricePerDay: Float!
      status: String!
  }

  type ErrorEntry {
      modelId: Int!      
      vin: String!              
      variant: String!          
      year: Int!               
      color: String!            
      transmission: String!     
      fuelType: String!        
      engineCapacity: Float!    
      mileage: Float!           
      pricePerDay: Float!      
      status: String!               
      error: String
    }

  type AddVehicleInventoriesResponse {
    success: Boolean!
    partialSuccess: Boolean
    successCount: Int
    failedCount: Int
    alreadyExistingCount: Int
    errorEntries: [ErrorEntry!]
    }


  # Queries 

  extend type Query {
      getVehicleInventoriesByModelId(modelId: Int!): [VehicleInventory!]!
      getVehicleInventory(id: Int!): VehicleInventory
  }

  # Mutations 

  extend type Mutation {  
      addVehicleInventory(input: AddVehicleInventoryInput!): String!
      addVehicleInventories(input: [AddVehicleInventoryInput!]!): AddVehicleInventoriesResponse!  # Accepts an array of inputs for bulk insertion
      updateVehicleInventory(id:Int!, input: AddVehicleInventoryInput!): Boolean!
      deleteVehicleInventory(id: Int!, modelId: Int!): Boolean!
  }

`;

export default vehicleInventoryTypeDefs;
