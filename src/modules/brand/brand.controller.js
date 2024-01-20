import { ResData } from "../../common/resData.js";

export class BrandController {
  #brandService;
  constructor(BrandService) {
    this.#brandService = BrandService;
  }

  async createBrand(req, res) {
    try {
      const dto = req.body;

      const resData = await this.#brandService.create(dto);
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
