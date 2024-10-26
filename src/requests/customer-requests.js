import Joi from 'joi';

const customerValidation = Joi.object({
    name: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.base': 'Name must be a valid string.',
            'string.empty': 'Name is required.',
            'string.min': 'Name must be at least 1 character long.',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a valid string.',
            'string.empty': 'Email is required.',
            'string.email': 'Please enter a valid email address.',
        }),
    phone: Joi.string()
        .pattern(/^\+?\d{0,3}?\d{10}$/)
        .required()
        .messages({
            'string.base': 'Phone number must be a valid string.',
            'string.empty': 'Phone number is required.',
            'string.pattern.base': 'Phone number must be exactly 10 digits long and contain only numbers.',
        }),
    city: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.base': 'City must be a valid string.',
            'string.empty': 'City is required.',
            'string.min': 'City must be at least 1 character long.',
        }),
    state: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.base': 'State must be a valid string.',
            'string.empty': 'State is required.',
            'string.min': 'State must be at least 1 character long.',
        }),
    country: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.base': 'Country must be a valid string.',
            'string.empty': 'Country is required.',
            'string.min': 'Country must be at least 1 character long.',
        }),
    pincode: Joi.string()
        .pattern(/^[0-9]+$/) // Matches any numeric string
        .length(6) // Ensures exactly 6 digits
        .required()
        .messages({
            'string.base': 'Pincode must be a valid string.',
            'string.empty': 'Pincode is required.',
            'string.pattern.base': 'Pincode must contain only numbers.',
            'string.length': 'Pincode must be exactly 6 digits long.',
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.base': 'Password must be a valid string.',
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 8 characters long.',
        }),
    isVerified:Joi.boolean()
});

export { customerValidation };
