import Joi from "joi";

export const SubjectSchema = Joi.object({
  name: Joi.string().max(32).required(),
  brandId: Joi.number().required(),
});
