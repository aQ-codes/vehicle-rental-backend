import customerRepository from '../../repositories/customer/customer-repository.js'; 
import { customerValidation } from '../../requests/customer-requests.js';
import bcrypt from 'bcrypt';


const customerController = {

  createCustomer: async (input) => {
    try {
      console.log("entered customer controller")
        // Validate input against the Joi schema
        const { error } = customerValidation.validate(input);
        if (error) {
            return { 
              success:false,
              errors: error.details.map(err => err.message) }; 
        }

        // Check if a customer with the same email or phone already exists
        const existingCustomer = await customerRepository.findCustomerByEmailOrPhone(input.email, input.phone);
        if (existingCustomer) {
          return {
            success: false,
            errors: ["Customer with this email or phone number already exists."]
          };
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);
        input.password = hashedPassword;

        // Create the customer in the database
        await customerRepository.create(input); 
        return { 
          success:true,
          errors:  []
        };  
      } catch (err) {
        console.error(err);
        return { 
          success:false,
          errors: ["An error occurred while creating the customer."] 
        }; 
    }
  },

  getCustomer: async (id) => {
      // Logic to get a customer by ID
      return await customerRepository.findById(id); 
  },



};

export default customerController;
