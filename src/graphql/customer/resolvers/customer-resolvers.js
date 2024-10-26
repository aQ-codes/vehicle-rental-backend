import customerController from "../../../controllers/customer/customer-controller.js";

const customerResolvers = {
    Query: {
        getCustomers: async () => {
            return await customerController.getCustomers(); 
        },
        getCustomer: async (_, { id }) => {
            return await customerController.getCustomer(id); 
        },
    },
    Mutation: {
        addCustomer: async (_, { input }) => {
            console.log('Resolver received customer data:', input);
            return await customerController.createCustomer(input); 
            
        }

    },
};

export default customerResolvers;
