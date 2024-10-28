// vehicleResolvers.js
import vehicleController from "../../../controllers/public/vehicle-controller.js";

const vehicleResolvers = {
  Query: {
    getUniqueMakes: async () => {
      console.log("entered vehicle resolvers")
      const result =  await vehicleController.getUniqueMakes(); 
      console.log(result)
      return result;
    },
  },
};

export default vehicleResolvers;