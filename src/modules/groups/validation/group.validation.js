import Joi from "joi";

export const GroupSchema = Joi.object({
  name: Joi.string().max(32).required(),
  brandId: Joi.number().max(32).required(),
  headTeacherId: Joi.number().required(),
  roomId: Joi.number(),
});
