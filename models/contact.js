const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const addSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
  });

  const updFavoriteContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
  })

const joiSchema = {
  addSchema,
  updFavoriteContactSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
};