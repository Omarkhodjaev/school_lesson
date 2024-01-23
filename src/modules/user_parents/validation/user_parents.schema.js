import Joi from "joi";
import { roles, sex } from "../../../common/enums/roles.js";

const rolesArray = Object.values(roles);
const sexArray = Object.values(sex);

export const userParentsSchema = Joi.object({
  childId: Joi.number().required(),
  parentId: Joi.number().required(),
});
