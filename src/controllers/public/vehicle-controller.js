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

  getUniqueTypes: async () => {
    try {
      console.log("entered vehicle controllers");
      const uniqueTypes = await vehicleTypesense.getUniqueTypes();
      return uniqueTypes;
    } catch (error) {
      console.error("Error fetching unique types:", error);
      throw new Error('Failed to fetch unique types');
    }
  },
  
  getUniqueColors: async () => {
    try {
      console.log("entered vehicle controllers");
      const uniqueColors = await vehicleTypesense.getUniqueColors();
      return uniqueColors;
    } catch (error) {
      console.error("Error fetching unique colors:", error);
      throw new Error('Failed to fetch unique colors');
    }
  },
  
  getMinMaxPrices: async () => {
    try {
      console.log("entered vehicle controllers");
      const { minPrice, maxPrice } = await vehicleTypesense.getMinMaxPrices();
      return { minPrice, maxPrice };
    } catch (error) {
      console.error("Error fetching min/max prices:", error);
      throw new Error('Failed to fetch min/max prices');
    }
  },
  
  getMinMaxMileage: async () => {
    try {
      console.log("entered vehicle controllers");
      const { minMileage, maxMileage } = await vehicleTypesense.getMinMaxMileage();
      return { minMileage, maxMileage };
    } catch (error) {
      console.error("Error fetching min/max mileage:", error);
      throw new Error('Failed to fetch min/max mileage');
    }
  },
  
  getUniqueTransmission: async () => {
    try {
      console.log("entered vehicle controllers");
      const uniqueTransmission = await vehicleTypesense.getUniqueTransmission();
      return uniqueTransmission;
    } catch (error) {
      console.error("Error fetching unique transmission:", error);
      throw new Error('Failed to fetch unique transmission');
    }
  },
  
  getUniqueFuelTypes: async () => {
    try {
      console.log("entered vehicle controllers");
      const uniqueFuelTypes = await vehicleTypesense.getUniqueFuelTypes();
      return uniqueFuelTypes;
    } catch (error) {
      console.error("Error fetching unique fuel types:", error);
      throw new Error('Failed to fetch unique fuel types');
    }
  },
  
  //filter and get the vehicle models
  getVehicleModels: async (filter) => {
    const vehicleModels = await vehicleTypesense.filterVehicleModels(filter);
    return vehicleModels;
  },

  getVehicleVariants: async (vehicleId, filter) => {
    console.log("entered vehicle variant controller")
    const vehicleVariants = await vehicleTypesense.filterVehicleVariants(vehicleId, filter);
    return vehicleVariants;
  },
  

};

export default vehicleController;
