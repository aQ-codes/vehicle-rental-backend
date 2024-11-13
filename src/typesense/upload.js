import typesenseClient from '../utils/typesense-utils.js';

export const uploadVehicleModel = async (vehicleModel) => {
  const modelData = {
    id: vehicleModel.id.toString(),
    name: vehicleModel.name,
    make: vehicleModel.make,
    model: vehicleModel.model,
    type: vehicleModel.type,
    doors: vehicleModel.doors,
    seats: vehicleModel.seats,
    description: vehicleModel.description,
    primaryImage: vehicleModel.primaryImage,
    additionalImages: vehicleModel.additionalImages,
    quantity: vehicleModel.quantity,
  };

  try {
    await typesenseClient.collections('vehicle_models').documents().upsert(modelData);
    console.log('Single Vehicle Model uploaded');
  } catch (error) {
    console.error('Error uploading single vehicle model:', error);
  }
};

export const uploadVehicleInventory = async (inventory) => {
  const inventoryData = {
    id: inventory.id.toString(),
    vin: inventory.vin,
    modelId: inventory.modelId.toString(),
    variant: inventory.variant,
    year: inventory.year,
    color: inventory.color,
    transmission: inventory.transmission,
    fuelType: inventory.fuelType,
    engineCapacity: parseFloat(inventory.engineCapacity), 
    mileage: parseFloat(inventory.mileage), 
    pricePerDay: parseFloat(inventory.pricePerDay), 
    status: inventory.status,
  };

  try {
    await typesenseClient.collections('vehicle_inventories').documents().upsert(inventoryData);
    console.log('Vehicle Inventory uploaded');
  } catch (error) {
    console.error('Error uploading vehicle inventory:', error);
  }
};
