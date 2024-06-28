const Joi = require("joi");

const addOrderValidationSchema = Joi.object({
    products: Joi.array().items(Joi.object({
        quantity: Joi.number().integer().min(1).required(),
        product: Joi.string().alphanum().length(24).required()
    })).required(),
    customer: Joi.string().alphanum().length(24).required(),
});

module.exports = { addOrderValidationSchema }