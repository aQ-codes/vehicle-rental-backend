export const vehicleModelIndexSchema = {
  name: 'vehicle_models',
  fields: [
    { name: 'id', type: 'int32', index: true, facet: true },
    { name: 'name', type: 'string', index: true, facet: true },
    { name: 'make', type: 'string', index: true, facet: true },
    { name: 'model', type: 'string', index: true, facet: true },
    { name: 'type', type: 'string', index: true, facet: true },
    { name: 'doors', type: 'int32', index: true, facet: true },
    { name: 'seats', type: 'int32', index: true, facet: true },
    { name: 'description', type: 'string', index: false,  },
    { name: 'primaryImage', type: 'string', index: false },
    { name: 'additionalImages', type: 'string[]', index: false },
    { name: 'quantity', type: 'int32', index: true, facet: true },
  ],
};

export const vehicleInventoryIndexSchema = {
  name: 'vehicle_inventories',
  fields: [
    { name: 'id', type: 'int32', index: true, facet: true },
    { name: 'vin', type: 'string', index: true, facet: true },
    { name: 'modelId', type: 'string', index: true, facet: true },
    { name: 'variant', type: 'string', index: true, facet: true },
    { name: 'year', type: 'int32', index: true, facet: true },
    { name: 'color', type: 'string', index: true, facet: true },
    { name: 'transmission', type: 'string', index: true, facet: true },
    { name: 'fuelType', type: 'string', index: true, facet: true },
    { name: 'engineCapacity', type: 'float', index: true, facet: true },
    { name: 'mileage', type: 'float', index: true, facet: true },
    { name: 'pricePerDay', type: 'float', index: true, facet: true },
    { name: 'status', type: 'string', index: true, facet: true },
  ],
};
