// vehicleTypesense.js
import typesenseClient from '../../utils/typesense-utils.js';

const vehicleTypesense = {
  async getUniqueMakes() {
    console.log("entered vehicle typesense")
    try {
      const results = await typesenseClient.collections('vehicle_models').documents().search({
        q: '*',             // Wildcard search to match all entries
        query_by: 'make',   // This can be any indexed field in case you want filtering
        facet_by: 'make',   // Group by 'make' to get unique makes
        per_page: 1,        // Limit results per group
        max_facet_values: 100 
      });
      
      // Extract unique make names from facet results
      return results.facet_counts[0].counts.map(count => count.value);
    } catch (error) {
      console.error('Error fetching unique makes from Typesense:', error);
      throw error;
    }
  },

  // You can add other vehicle-related Typesense functions here in the future
};

export default vehicleTypesense;
