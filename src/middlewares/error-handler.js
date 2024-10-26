// errorHandler.js
export const errorHandler = (error) => {
    if (error.extensions?.code === "BAD_USER_INPUT") {
      return {
        message: error.message,
        details: error.extensions?.exception?.validationErrors || null,
      };
    }
  
    console.error('An unexpected error occurred:', error);
    return {
      message: 'Internal Server Error',
    };
};
