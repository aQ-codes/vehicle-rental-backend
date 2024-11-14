import prisma from '../../models/prisma.client.js'; 

const customerRepository = {

    create: async (input) => {
      console.log("entered customer repository")

        return await prisma.customer.create({
            data: input,
        });
    },

    // Function to check if a customer exists by email or phone
    findCustomerByEmailOrPhone: async (email, phone) => {
      return await prisma.customer.findFirst({
        where: {
          OR: [
            { email: email },
            { phone: phone }
          ]
        }
      });
    },

    findById: async (id) => {
      return await prisma.customer.findUnique({
          where: { id },
      });
    },

};

export default customerRepository;
