import prisma from '../../models/prisma.client.js';

const vehicleInventoryRepository = {

    getById: async (id) => {
        return await prisma.vehicleInventory.findUnique({
            where: { id }
        });
    },

    getByVin: async (vin) => {
      return await prisma.vehicleInventory.findUnique({
          where: { vin }
      });
    },
  

    create: async (data) => {
        return await prisma.vehicleInventory.create({ data });
    },

    createMany: async (data) => {
          return await prisma.vehicleInventory.createMany({
              data,
              skipDuplicates: true, // Avoids stopping on unique constraints like VIN
          });
    },

    update: async (id, data) => {
        return await prisma.vehicleInventory.update({
            where: { id },
            data,
        });
    },

    delete: async (id) => {
        return await prisma.vehicleInventory.delete({
            where: { id },
        });
    },

    getVehicleCountByModelId: async(modelId) =>{
      return await prisma.vehicleInventory.count({
        where: { modelId: modelId},
      });
    },

    getByModelId: async (modelId) => {
      return await prisma.vehicleInventory.findMany({
          where: { modelId: modelId },
      });
    },
};

export default vehicleInventoryRepository;
