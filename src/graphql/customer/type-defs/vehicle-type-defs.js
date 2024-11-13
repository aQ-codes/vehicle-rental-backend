import { gql } from 'apollo-server-express';

const vehicleTypeDefs = gql`

  type VehicleModel {
    id: Int!
    name: String!
    make: String!
    type: String!
    doors: Int!
    seats: Int!
    description: String
    primaryImage: String
    minPrice: Float
    maxMileage: Float
    availableCount: Int 
  }

  input VehicleFilterInput {
    status:String
    make: [String]
    type: [String]
    model: [String]
    year: [Int]
    color: [String]
    transmission: [String]
    fuelType: [String]
    minPrice: Float
    maxPrice: Float
    minMileage: Float
    maxMileage: Float
  }

  input VariantFilterInput {
    status:String 
    year: [Int]
    color: [String]
    transmission: [String]
    fuelType: [String]
    minPrice: Float
    maxPrice: Float
    minMileage: Float
    maxMileage: Float
  }

  type VehicleVariant {
    id: ID!
    name:String
    color: String
    variant: String
    year: Int
    transmission: String
    fuelType: String
    engineCapacity: Float
    mileage: Float
    pricePerDay: Float
    status: String
    additionalImages: [String]
    description: String  
    availableCount: Int
  }

  type PriceRange {
    minPrice: Float!
    maxPrice: Float!
  }

  type MileageRange {
    minMileage: Float!
    maxMileage: Float!
  }

  extend type Query { 
    getUniqueMakes: [String!]!  
    getUniqueTypes: [String!]!
    getUniqueColors: [String!]!
    getMinMaxPrices: PriceRange!
    getMinMaxMileage: MileageRange!
    getUniqueTransmission: [String!]!
    getUniqueFuelTypes: [String!]!
  }

  extend type Query {
    getVehicles(filter: VehicleFilterInput): [VehicleModel!]!
    getVariants(vehicleId: ID!, filter: VariantFilterInput): [VehicleVariant!]!
  }

`;

export default vehicleTypeDefs;
