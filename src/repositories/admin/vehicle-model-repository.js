import prisma from '../../models/prisma.client.js'; 

export const vehicleModelRepository = {
    getAll: async () => {
        return await prisma.vehicleModel.findMany();
    },

    getById: async (id) => {
        return await prisma.vehicleModel.findUnique({ where: { id } });
    },

    create: async (data) => {
        return await prisma.vehicleModel.create({ data });
    },

    update: async (id, data) => {
        return await prisma.vehicleModel.update({ where: { id }, data });
    },

    delete: async (id) => {
        return await prisma.vehicleModel.delete({ where: { id } });
    },

    getQuantityById: async(id) =>{
      return await prisma.vehicleModel.findUnique({
        where: { id: id },
        select: { quantity: true }, 
      });
    }


};

