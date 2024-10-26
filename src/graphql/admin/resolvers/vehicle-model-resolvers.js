import vehicleModelController from "../../../controllers/admin/vehicle-model-controller.js";
import { GraphQLUpload } from 'graphql-upload';

const vehicleModelResolvers = {
    Upload: GraphQLUpload,
    Query: {
        getVehicleModels: async () => {
            return await vehicleModelController.getVehicleModels(); // Fetch all vehicle models
        },
        getVehicleModel: async (_, { id }) => {
            return await vehicleModelController.getVehicleModel(id); // Fetch a specific vehicle model
        },
    },
    Mutation: {
        addVehicleModel: async (_, { input }) => { // Destructure 'input' from args
            console.log('Resolver received data:', input);
            return await vehicleModelController.createVehicleModel(input); // Pass resolved vehicle model data to the controller
        },
        editVehicleModel: async (_, { id }) => {
          return await vehicleModelController.editVehicleModel(id); // Delete the vehicle model
      },
        deleteVehicleModel: async (_, { id }) => {
            return await vehicleModelController.deleteVehicleModel(id); // Delete the vehicle model
        },
    },
};

export default vehicleModelResolvers;
