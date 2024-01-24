import { ResData } from "../../common/resData.js";
import { BrandService } from "../brand/brand.service.js";
import { SubjectBadRequest } from "./exception/subject.exception.js";
import { SubjectSchema } from "./validation/subject.validation.js";
export class SubjectController {
  #subjectService;
  #brandService;

  constructor(SubjectService, BrandService) {
    this.#subjectService = SubjectService;
    this.#brandService = BrandService;
  }

  async createSubject(req, res) {
    try {
      const dto = req.body;

      const { value, error } = SubjectSchema.validate(dto);

      if (error) {
        throw new SubjectBadRequest(error.message);
      }

      await this.#brandService.getById(dto.brandId);

      const resData = await this.#subjectService.create(value);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      if (error) {
        const resData = new ResData(error.message, error.statusCode);
        res.status(resData.statusCode).json(resData);
      }
    }
  }

  async getAllSubject(req, res) {
    try {
      const resData = await this.#subjectService.getAll();

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

  async getSubjectById(req, res) {
    try {
      const subjectId = req.params.id;
      const resData = await this.#subjectService.getById(subjectId);

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

  async deleteSubjectById(req, res) {
    try {
      const subjectId = req.params.id;
      const resData = await this.#subjectService.delete(subjectId);

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
