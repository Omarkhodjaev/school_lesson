import Joi from "joi";

export const userParentsSchema = Joi.object({
  childId: Joi.number().required(),
  parentId: Joi.number().required(),
});
