import Joi from "joi";

export const roomSchema = Joi.object({
  number: Joi.number(),
  name: Joi.string(),
  floor: Joi.number(),
  capacity: Joi.number(),
  schoolId: Joi.number().required(),
});
