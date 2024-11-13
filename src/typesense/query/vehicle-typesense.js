import typesenseClient from '../../utils/typesense-utils.js';

const vehicleTypesense = {
  //get unique makes
  async getUniqueMakes() {
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

  async getUniqueTypes() {
    console.log("entered vehicle typesense types");
    try {
      const results = await typesenseClient.collections('vehicle_models').documents().search({
        q: '*',
        query_by: 'type',
        facet_by: 'type',
        per_page: 1,
        max_facet_values: 100 
      });
      return results.facet_counts[0].counts.map(count => count.value);
    } catch (error) {
      console.error('Error fetching unique types from Typesense:', error);
      throw error;
    }
  },
  
  async getUniqueColors() {
    console.log("entered vehicle typesense colors" );
    try {
      const results = await typesenseClient.collections('vehicle_inventories').documents().search({
        q: '*',
        query_by: 'color',
        facet_by: 'color',
        per_page: 1,
        max_facet_values: 100 
      });
      return results.facet_counts[0].counts.map(count => count.value);
    } catch (error) {
      console.error('Error fetching unique colors from Typesense:', error);
      throw error;
    }
  },
  
  async getMinMaxPrices() {
    console.log("Fetching min and max prices from Typesense");
    try {
      const minResults = await typesenseClient.collections('vehicle_inventories').documents().search({
        q: '*',
        sort_by: 'pricePerDay:asc',
        per_page: 1,
      });
      const minPrice = minResults.hits.length > 0 ? minResults.hits[0].document.pricePerDay : 0;
  
      const maxResults = await typesenseClient.collections('vehicle_inventories').documents().search({
        q: '*',
        sort_by: 'pricePerDay:desc',
        per_page: 1,
      });
      const maxPrice = maxResults.hits.length > 0 ? maxResults.hits[0].document.pricePerDay : 0;
  
      return { minPrice, maxPrice };
    } catch (error) {
      console.error('Error fetching min/max prices from Typesense:', error);
      throw error;
    }
  }
  ,
  
  async getMinMaxMileage() {
    console.log("Fetching min and max mileage from Typesense");
    try {
      const minResults = await typesenseClient.collections('vehicle_inventories').documents().search({
        q: '*',
        sort_by: 'mileage:asc',
        per_page: 1,
      });
      const minMileage = minResults.hits.length > 0 ? minResults.hits[0].document.mileage : 0;
  
      const maxResults = await typesenseClient.collections('vehicle_inventories').documents().search({
        q: '*',
        sort_by: 'mileage:desc',
        per_page: 1,
      });
      const maxMileage = maxResults.hits.length > 0 ? maxResults.hits[0].document.mileage : 0;
  
      return { minMileage, maxMileage };
    } catch (error) {
      console.error('Error fetching min/max mileage from Typesense:', error);
      throw error;
    }
  },
  
  async getUniqueTransmission() {
    console.log("entered vehicle typesense transmission");
    try {
      const results = await typesenseClient.collections('vehicle_inventories').documents().search({
        q: '*',
        query_by: 'transmission',
        facet_by: 'transmission',
        per_page: 1,
        max_facet_values: 100 
      });
      return results.facet_counts[0].counts.map(count => count.value);
    } catch (error) {
      console.error('Error fetching unique transmission from Typesense:', error);
      throw error;
    }
  },
  
  async getUniqueFuelTypes() {
    console.log("entered vehicle typesense fuel");
    try {
      const results = await typesenseClient.collections('vehicle_inventories').documents().search({
        q: '*',
        query_by: 'fuelType',
        facet_by: 'fuelType',
        per_page: 1,
        max_facet_values: 100 
      });
      return results.facet_counts[0].counts.map(count => count.value);
    } catch (error) {
      console.error('Error fetching unique fuel types from Typesense:', error);
      throw error;
    }
  },

  //filter vehicle Models
  async filterVehicleModels(filter) {
    console.log('entered typesense filter');

    // Step 1: Prepare inventory filters
    const inventoryFilterConditions = [];

    // Handle status
    if (filter.status) {
        inventoryFilterConditions.push(`status:=${filter.status}`);
    }

    // Handle price range
    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
        inventoryFilterConditions.push(
            `pricePerDay:=${filter.minPrice || 0}..${filter.maxPrice || 10000}`
        );
    }

    // Handle mileage range
    if (filter.minMileage !== undefined || filter.maxMileage !== undefined) {
        inventoryFilterConditions.push(
            `mileage:=${filter.minMileage || 0}..${filter.maxMileage || 500000}`
        );
    }

    // Handle color (supports multiple selections)
    if (filter.color && filter.color.length > 0 && !filter.color.includes('all')) {
        const colorsFilter = filter.color.map(c => `color:=${c}`).join(' OR ');
        inventoryFilterConditions.push(`(${colorsFilter})`);
    }

    // Handle transmission (supports multiple selections)
    if (filter.transmission && filter.transmission.length > 0 && !filter.transmission.includes('all')) {
        const transmissionsFilter = filter.transmission.map(t => `transmission:=${t}`).join(' OR ');
        inventoryFilterConditions.push(`(${transmissionsFilter})`);
    }

    // Handle fuel type (supports multiple selections)
    if (filter.fuelType && filter.fuelType.length > 0 && !filter.fuelType.includes('all')) {
        const fuelTypesFilter = filter.fuelType.map(f => `fuelType:=${f}`).join(' OR ');
        inventoryFilterConditions.push(`(${fuelTypesFilter})`);
    }

    // Handle years (supports multiple selections)
    if (filter.year && filter.year.length > 0) {
        const yearsFilter = filter.year.map(y => `year:=${y}`).join(' OR ');
        inventoryFilterConditions.push(`(${yearsFilter})`);
    }   

    
    console.log(inventoryFilterConditions)
    // Combine all inventory filters
    const inventoryFilter = {
        q: '*', // Ensure q parameter is included
        filter_by: inventoryFilterConditions.join(' AND '),
        query_by: 'modelId',
    };

    // Step 2: Filter in `vehicle_inventories` collection
    const inventoryResults = await typesenseClient
        .collections('vehicle_inventories')
        .documents()
        .search(inventoryFilter);

    // Log the results to see the structure
    console.log('Inventory Results:', inventoryResults);

    // Ensure modelIds are unique and convert to strings
    const modelIds = [...new Set(inventoryResults.hits.map(hit => String(hit.document.modelId)))];

    // Log the modelIds to ensure they are strings
    console.log('Model IDs:', modelIds);

    // Step 3: Fetch matching `vehicle_models`
    const modelFilter = {
        q: '*', // Ensure q parameter is included for models
        filter_by: `id:=[${modelIds.join(',')}]`, // Use modelIds as strings
        query_by: 'make,type,model',
        facet_by: 'make,type,model',
    };

    console.log('Model Filter:', modelFilter); // Log the model filter for debugging

    const modelResults = await typesenseClient
        .collections('vehicle_models')
        .documents()
        .search(modelFilter);

    // Step 4: Aggregate data to enhance vehicle model output
    return modelResults.hits.map(hit => {
        const model = hit.document;

        // Get inventory records for this model to calculate min price, max mileage, and available count
        const relatedInventories = inventoryResults.hits
            .map(h => h.document)
            .filter(inv => String(inv.modelId) === model.id); // Ensure comparison is done with strings

        return {
            id: model.id,
            name: model.name,
            make: model.make,
            type: model.type,
            doors: model.doors,
            seats: model.seats,
            description: model.description,
            primaryImage: model.primaryImage,
            minPrice: relatedInventories.length > 0 ? Math.min(...relatedInventories.map(inv => inv.pricePerDay)) : null, // Handle empty case
            maxMileage: relatedInventories.length > 0 ? Math.max(...relatedInventories.map(inv => inv.mileage)) : null, // Handle empty case
            availableCount: relatedInventories.filter(inv => inv.status === 'Available').length,
        };
    });
},


//filter vehicle inventories 

  async filterVehicleVariants(vehicleId, filter) {

  // Retrieve `vehicle_models` including additional images and description
  const vehicleModel = await typesenseClient.collections('vehicle_models')
    .documents(vehicleId)
    .retrieve();

  // Filter `vehicle_inventories`
  const inventoryFilterConditions = [];

  if (filter.status) {
    inventoryFilterConditions.push(`status:=${filter.status}`);
  }

  if (filter.minPrice || filter.maxPrice) {
    inventoryFilterConditions.push(`pricePerDay:=${filter.minPrice || 0}..${filter.maxPrice || 10000}`);
  }

  // Filter on mileage range
  if (filter.minMileage || filter.maxMileage) {
    inventoryFilterConditions.push(`mileage:=${filter.minMileage || 0}..${filter.maxMileage || 500000}`);
  }


  
  // Additional filters for year, color, transmission, etc.

  // Perform search
  const inventoryResults = await typesenseClient.collections('vehicle_inventories')
    .documents()
    .search({
      q: '*',
      filter_by: inventoryFilterConditions.join(' AND '),
      query_by: 'modelId',
    });

  // Aggregate variants by unique characteristics and apply availability check
  const uniqueVariants = {};
  inventoryResults.hits.forEach(hit => {
    const doc = hit.document;
    const key = `${doc.color}_${doc.variant}_${doc.year}_${doc.transmission}_${doc.fuelType}_${doc.engineCapacity}_${doc.mileage}_${doc.pricePerDay}`;

    if (!uniqueVariants[key]) {
      uniqueVariants[key] = {
        ...doc,
        description: vehicleModel.description,  // Include description from the model
        additionalImages: vehicleModel.additionalImages,
        status: 'Available',
      };
    } else if (doc.status === 'Available') {
      uniqueVariants[key].status = 'Available';
    }
  });

  return Object.values(uniqueVariants);
}


  
};

export default vehicleTypesense;
