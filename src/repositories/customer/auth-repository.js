// src/repositories/authRepository.js
import prisma from '../../models/prisma.client.js';

const authRepository = {
  findCustomerByEmail: async (email) => {
    return await prisma.customer.findUnique({
      where: { email },
    });
  },
};

export default authRepository;
