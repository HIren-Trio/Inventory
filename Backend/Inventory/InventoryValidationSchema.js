const Joi = require("joi");

const InventoryAddValidationSchema = Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
    name: Joi.string().min(1).max(255).required(),
    category: Joi.string().min(1).max(255).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    description: Joi.string().min(0).max(255),

})
const InventoryUpdateValidationSchema = Joi.object().keys({
    name: Joi.string().min(1).max(255),
    category: Joi.string().min(1).max(255),
    price: Joi.number().positive(),
    stock: Joi.number().integer().min(0),
    description: Joi.string().min(0).max(255),
});


module.exports = { InventoryAddValidationSchema, InventoryUpdateValidationSchema }