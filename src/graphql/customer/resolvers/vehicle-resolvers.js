// vehicleResolvers.js
import vehicleController from "../../../controllers/public/vehicle-controller.js";

const vehicleResolvers = {
  Query: {
    getUniqueMakes: async () => {
      return await vehicleController.getUniqueMakes(); 
    },
    getUniqueTypes: async () => {
      return await vehicleController.getUniqueTypes();
    },
    getUniqueColors: async () => {
      return await vehicleController.getUniqueColors();
    },
    getMinMaxPrices: async () => {
      return await vehicleController.getMinMaxPrices();
    },
    getMinMaxMileage: async () => {
      return await vehicleController.getMinMaxMileage();
    },
    getUniqueTransmission: async () => {
      return await vehicleController.getUniqueTransmission();
    },
    getUniqueFuelTypes: async () => {
      return await vehicleController.getUniqueFuelTypes();
    },

    //filter 
    getVehicles: async (_, { filter }) => {
      const result = await vehicleController.getVehicleModels(filter);
      return result;
    },

    // Resolvers file (e.g., vehicleResolvers.js)
    getVariants: async (_, { vehicleId, filter }) => {
      console.log('entered vehicle variant reolvver')
      const result = await vehicleController.getVehicleVariants(vehicleId, filter);
      return result;
    },
    

  },
};

export default vehicleResolvers;