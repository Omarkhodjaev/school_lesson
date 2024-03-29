import { ResData } from "../../common/resData.js";
import { BrandBadRequest } from "./exception/brand.exception.js";
import { BrandSchema } from "./validation/brand.validation.js";

export class BrandController {
  #brandService;
  constructor(BrandService) {
    this.#brandService = BrandService;
  }

  async createBrand(req, res) {
    try {
      const dto = req.body;

      const { value, error } = BrandSchema.validate(dto);

      if (error) {
        throw new BrandBadRequest(error.message);
      }

      const resData = await this.#brandService.create(value);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      if (error) {
        const resData = new ResData(error.message, error.statusCode);
        res.status(resData.statusCode).json(resData);
      }
    }
  }

  async getAllBrand(req, res) {
    try {
      const resData = await this.#brandService.getAll();

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

  async getBrandById(req, res) {
    try {
      const brandId = req.params.id;
      const resData = await this.#brandService.getById(brandId);

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

  async deleteBrandById(req, res) {
    try {
      const brandId = req.params.id;
      const resData = await this.#brandService.delete(brandId);

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
