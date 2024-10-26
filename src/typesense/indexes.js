
import typesenseClient from '../utils/typesense-utils.js';
import { vehicleModelIndexSchema, vehicleInventoryIndexSchema } from './schema.js';

// Initialize both Typesense indices
export const initializeTypesenseIndexes = async () => {
  try {
    // Create vehicle model index
    await typesenseClient.collections().create(vehicleModelIndexSchema);
    console.log('Vehicle Models index created');
    
    // Create vehicle inventory index
    await typesenseClient.collections().create(vehicleInventoryIndexSchema);
    console.log('Vehicle Inventory index created');
    
  } catch (error) {
    // Check for 'already exists' errors to avoid re-creating indices
    if (error.message.includes("already exists")) {
      console.log("One or more Typesense indices already exist, skipping creation.");
    } else {
      console.error('Error initializing Typesense indices:', error);
      throw error; // Re-throw error if it’s a different issue
    }
  }
};
