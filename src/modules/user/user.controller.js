import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import { UserLoginAlreadyExistException } from "./exception/user.exception.js";
import {
  userRegisterSchema,
  userLoginSchema,
} from "./validation/user.schema.js";

export class UserController {
  #userService;
  #brandService;
  constructor(userService, brandService) {
    this.#userService = userService;
    this.#brandService = brandService;
  }

  async getAllUser(req, res) {
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

  async register(req, res) {
    try {
      const dto = req.body;

      validationSchema(userRegisterSchema, dto);

      const resDataGetByLogin = await this.#userService.findByLogin(dto.login);

      if (resDataGetByLogin.data) {
        throw new UserLoginAlreadyExistException();
      }

      await this.#brandService.getById(dto.brandId);

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

  async login(req, res) {
    try {
      const dto = req.body;

      validationSchema(userLoginSchema, dto);

      const resData = await this.#userService.login(dto);

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
