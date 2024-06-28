const Joi = require("joi");
const { firstname } = require("./CustomerSchema");

const customerValidationSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    userId: Joi.string().alphanum().length(24).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


module.exports = { customerValidationSchema ,loginSchema}