import Joi from "joi";
export const SchoolSchema = Joi.object({
  name: Joi.string().required(),
  brandId: Joi.number().required(),
  address: Joi.string(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  phone: Joi.array().items(Joi.number()).required(),
});
