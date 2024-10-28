// vehicleController.js
import vehicleTypesense from "../../typesense/query/vehicle-typesense.js";

const vehicleController = {

  // Function to get all unique vehicle makes
  getUniqueMakes: async () => {
    try {
      console.log("entered vehicle controllers")
      const uniqueMakes = await vehicleTypesense.getUniqueMakes();
      return uniqueMakes;
    } catch (error) {
      console.error("Error fetching unique makes:", error);
      throw new Error('Failed to create vehicle');
    }
  },
};

export default vehicleController;
