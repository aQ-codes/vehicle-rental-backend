export const vehicleModelIndexSchema = {
  name: 'vehicle_models',
  fields: [
    { name: 'id', type: 'int32', index: true },
    { name: 'name', type: 'string', index: true },
    { name: 'make', type: 'string', index: true },
    { name: 'model', type: 'string', index: true },
    { name: 'type', type: 'string', index: true },
    { name: 'doors', type: 'int32', index: true },
    { name: 'seats', type: 'int32', index: true },
    { name: 'description', type: 'string', index: false },
    { name: 'primaryImage', type: 'string', index: false },
    { name: 'additionalImages', type: 'string[]', index: false },
    { name: 'quantity', type: 'int32', index: true },
  ],
};

export const vehicleInventoryIndexSchema = {
  name: 'vehicle_inventories',
  fields: [
    { name: 'id', type: 'int32', index: true },
    { name: 'vin', type: 'string', index: true },
    { name: 'modelId', type: 'int32', index: true },
    { name: 'variant', type: 'string', index: true },
    { name: 'year', type: 'int32', index: true },
    { name: 'color', type: 'string', index: true },
    { name: 'transmission', type: 'string', index: true },
    { name: 'fuelType', type: 'string', index: true },
    { name: 'engineCapacity', type: 'float', index: true },
    { name: 'mileage', type: 'float', index: true },
    { name: 'pricePerDay', type: 'float', index: true },
    { name: 'status', type: 'string', index: true },
  ],
};
