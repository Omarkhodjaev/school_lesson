import { ResData } from "../../common/resData.js";
import { SchoolBadRequest } from "./exception/exception/school.exception.js";
import { SchoolSchema } from "./validation/school.validaton.js";

export class SchoolController {
  #schoolService;
  constructor(SchoolService) {
    this.#schoolService = SchoolService;
  }

  async createSchool(req, res) {
    try {
      const dto = req.body;

      const { value, error } = SchoolSchema.validate(dto);

      if (error) {
        throw new SchoolBadRequest(error.message);
      }

      const resData = await this.#schoolService.create(value);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      if (error) {
        const resData = new ResData(error.message, error.statusCode);
        res.status(resData.statusCode).json(resData);
      }
    }
  }

  async getAllSchool(req, res) {
    try {
      const resData = await this.#schoolService.getAll();

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

  async getSchoolById(req, res) {
    try {
      const schoolId = req.params.id;
      const resData = await this.#schoolService.getById(schoolId);

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

  async deleteSchoolById(req, res) {
    try {
      const schoolId = req.params.id;
      const resData = await this.#schoolService.delete(schoolId);

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
