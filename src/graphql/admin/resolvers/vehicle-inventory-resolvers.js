import vehicleInventoryController from "../../../controllers/admin/vehicle-inventory-controller.js";
import { GraphQLUpload } from 'graphql-upload';


const vehicleInventoryResolvers = {
  Upload: GraphQLUpload,
  Query: {
    getVehicleInventory: async (_, { id }) => {
      return await vehicleInventoryController.getVehicleInventory(id); 
    },
    getVehicleInventoriesByModelId: async (_, { modelId }) => {
      return await vehicleInventoryController.getVehicleInventoriesByModelId(modelId); 
    },
  },
  Mutation: {

    addVehicleInventories: async (_, { input }) => {
      console.log('Resolver received data:', input);

      // Call the controller method that processes batch creation
    const { success, partialSuccess, successCount, failedCount, alreadyExistingCount, errorEntries } =
    await vehicleInventoryController.createVehicleInventories(input);

    return {
        success,
        partialSuccess,
        successCount,
        failedCount,
        alreadyExistingCount,
        errorEntries
    };
    },

    updateVehicleInventory: async (_, { id, input }) => {
      return await vehicleInventoryController.updateVehicleInventory(id, input); // to update the vehicle Inventory
    },
    
    deleteVehicleInventory: async (_, { id, modelId }) => {
      return await vehicleInventoryController.deleteVehicleInventory(id,modelId); 
    },
  },
};

export default vehicleInventoryResolvers;
