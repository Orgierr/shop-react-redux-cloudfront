import Joi from 'joi';

export const productSchema = Joi.object({
  count: Joi.number().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  title: Joi.string().required(),
  img: Joi.string().required(),
});
