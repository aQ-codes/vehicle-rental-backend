import vehicleInventoryRepository from '../../repositories/admin/vehicle-inventory-repository.js';
import { vehicleModelRepository } from '../../repositories/admin/vehicle-model-repository.js';
import { uploadVehicleInventory, uploadVehicleModel } from '../../typesense/upload.js';
import typesenseClient from '../../utils/typesense-utils.js';
import vehicleModelController from './vehicle-model-controller.js';

const vehicleInventoryController = {

  createVehicleInventories: async (data) => {

    const dataLength = data.length; //calculate data length
    const errorEntries = []; //to store error entries
    let successCount = 0;  //to count the number of successfully created entries
    let alreadyExistingCount = 0;  //to count the number of successfully created entries
    
    //main try blovk
    try{
      for (const entry of data) {
        try {
            // Check if the entry already exists by a unique identifier, for example, VIN 
            const existingEntry = await vehicleInventoryRepository.getByVin(entry.vin);
            if (existingEntry) {
              existingCount++;
              continue; // Skip to the next entry in loop if it already exists
            }
            else{
              //try to add an entry if it doesnt already exist
              const createdEntry = await vehicleInventoryRepository.create(entry);
              if (createdEntry){
                successCount++;
                // Update the model's quantity after a successful insert
                await vehicleModelController.updateVehicleModelQuantity(entry.modelId);

                // Typesense : Upload the updated inventory entry and model to Typesense
                try {
                  await uploadVehicleInventory(createdEntry); // Typesense upload for the current entry
                  const updatedModel = await vehicleModelRepository.getById(createdEntry.modelId);
                  await uploadVehicleModel(updatedModel);
                } catch (err) {
                    console.log("Typesense upload error for entry:", createdEntry, err);
                }
              }
            }
  
        } catch (err) {
            console.log("Error inserting entry:", entry, err);
            errorEntries.push({
                ...entry,
                error: err.message,
            });
        }
      }
    }
    //main catch block
    catch(err){
      console.log('error in data., err')
    }

    return {
      success: errorEntries.length === 0,
      partialSuccess: successCount > 0 && successCount < dataLength,
      successCount,
      failedCount:errorEntries.length,
      alreadyExistingCount,
      errorEntries,
    };
  },

  updateVehicleInventory: async (id, data) => {
    console.log("Updating vehicle inventory with ID:", id);

    try {
        // Retrieve the existing vehicle inventory by ID
        const existingVehicle = await vehicleInventoryRepository.getById(id);
        if (!existingVehicle) throw new Error('Vehicle inventory entry not found');

        // Update the vehicle inventory entry with the new data
        const updatedVehicle = await vehicleInventoryRepository.update(id, data);

        //typesense upload updated vehicleinventory
        await uploadVehicleInventory(updatedVehicle);

        return true;
    } catch (err) {
        console.error("Error updating vehicle inventory:", err);
        throw new Error("Failed to update vehicle inventory");
    }
  },


  deleteVehicleInventory: async (id, modelId) => {
      console.log("Deleting vehicle inventory with ID:", id);

      try {
          const vehicle = await vehicleInventoryRepository.getById(id);
          if (!vehicle) throw new Error('Vehicle inventory entry not found');

          await vehicleInventoryRepository.delete(id);
          await vehicleModelController.decrementVehicleModelQuantity(modelId); 

          //typesense 
          await typesenseClient.collections('vehicle_inventories').documents(id).delete();
          //typesense upload updated vehicle model
          updatedModel = await vehicleModelRepository.getById(modelId);
          await uploadVehicleModel(updatedModel);

          return true;
      } catch (err) {
          console.error("Error deleting vehicle inventory:", err);
          throw new Error("Failed to delete vehicle inventory");
      }
  },

  getVehicleInventoriesByModelId: async (modelId) => {
    console.log("Fetching vehicle inventories for model ID:", modelId);

    try {
        const vehicles = await vehicleInventoryRepository.getByModelId(modelId);
        console.log(vehicles)
        if (!vehicles || vehicles.length === 0) throw new Error('No vehicles found for the given model ID');
        return vehicles;
    } catch (err) {
        console.error("Error fetching vehicle inventories:", err);
        throw new Error("No vehicles Found ");
    }
  },
};

export default vehicleInventoryController;
