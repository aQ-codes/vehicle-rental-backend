import vehicleInventoryRepository from "../../repositories/admin/vehicle-inventory-repository.js";
import {vehicleModelRepository} from "../../repositories/admin/vehicle-model-repository.js";
import { uploadFileToMinio } from "../../utils/minio-utils.js";
import { uploadVehicleModel } from "../../typesense/upload.js";

const vehicleModelController = {

  createVehicleModel: async (data) => {
    // Handle image uploads
    try {
        // Check if primary image exists and upload to MinIO
        const primaryImageUrl = data.primaryImage ? await uploadFileToMinio(data.primaryImage) : null;

        // Upload additional images to MinIO and collect their URLs
        const additionalImageUrls = await Promise.all(
            (data.additionalImages || []).map(async (image) => {
                return await uploadFileToMinio(image);
            })
        );

        // Prepare the data for creation
        const vehicleData = {
            ...data,
            primaryImage: primaryImageUrl, // Include the primary image URL
            additionalImages: additionalImageUrls, // Include the array of additional image URLs
        };

        // Call the repository to create the vehicle
        const createdVehicleModel = await vehicleModelRepository.create(vehicleData);
        // Upload to typesense collection
        await uploadVehicleModel(createdVehicleModel);
        
        return "Vehicle created successfully";
    } catch (err) {
        console.error('Error during vehicle creation:', err); // Log the error
        throw new Error('Failed to create vehicle');
    }
  },

  updateVehicleModel: async (id) => {

    try {
      const vehicle = await vehicleModelRepository.getById(id);
      if (!vehicle) throw new Error('Vehicle not found');

      await vehicleModelRepository.update(id);
      return true;
    } catch (err) {
      console.error('Error during vehicle deletion:', err); // Log the error
      throw new Error('Failed to delete vehicle');
    }
  },

  deleteVehicleModel: async (id) => {
    try {
      const vehicle = await vehicleModelRepository.getById(id);
      if (!vehicle) throw new Error('Vehicle not found');

      await vehicleModelRepository.delete(id);
      return true;
    } catch (err) {
      console.error('Error during vehicle deletion:', err); // Log the error
      throw new Error('Failed to delete vehicle');
    }
  },

  getVehicleModels: async () => {
    try {
      const vehicles = await vehicleModelRepository.getAll();
      return vehicles;
    } catch (err) {
      console.error('Error during fetching vehicles:', err); // Log the error
      throw new Error('Failed to fetch vehicles');
    }
  },

  //call this after bulk inventory insert
  updateVehicleModelQuantity : async (modelId) => {
    const count = await vehicleInventoryRepository.getVehicleCountByModelId(modelId);
    await vehicleModelRepository.update(modelId, { quantity: count });
  },

  //call this after deleting a vehicle inventory entry
  decrementVehicleModelQuantity : async (modelId) => {
  const quantity = await vehicleModelRepository.getQuantityById(modelId);
  console.log(quantity.quantity)
  await vehicleModelRepository.update(modelId, { quantity: quantity.quantity - 1 });  
  }

};

export default vehicleModelController;
