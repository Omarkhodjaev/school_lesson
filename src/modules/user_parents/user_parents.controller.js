import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { UserParentsParentOrStudentNotFoundException } from "./exception/user_parents.exception.js";

import { userParentsSchema } from "./validation/user_parents.schema.js";

export class UserParentsController {
  #userService;
  #repository;
  constructor(userService, userParentRepository) {
    this.#userService = userService;
    this.#repository = userParentRepository;
  }

  async getAllUserParents(req, res) {
    try {
      const resData = await this.#userService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const resData = await this.#userService.getById(userId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async create(req, res) {
    try {
      const dto = req.body;

      validationSchema(userParentsSchema, dto);

      const foundStudent = await this.#repository.findOneById(dto.childId);
      const foundParent = await this.#repository.findOneById(dto.parentId);

      if (!foundParent || !foundStudent) {
        throw new UserParentsParentOrStudentNotFoundException();
      }

      const resData = await this.#userService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

}
