import { ResData } from "../../common/resData.js";
import { BrandRepository } from "./brand.repository.js";
import { BrandEntity } from "./entity/brand.entity.js";
import {
  BrandAlreadyExistFoundByName,
  BrandNotFoundById,
} from "./exception/brand.exception.js";

export class BrandService {
  #repository;
  constructor() {
    this.#repository = new BrandRepository();
  }
  async create(dto) {
    const foundBrand = await this.#repository.findByName(dto.name);

    if (foundBrand) {
      throw new BrandAlreadyExistFoundByName();
    }

    const newBrand = new BrandEntity(dto);

    const brand = await this.#repository.insert(newBrand);

    const resData = new ResData("A new brand is created", 200, brand);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All brands is gotten", 200, foundAll);

    return resData;
  }

  async getById(brandId) {
    const foundBrand = await this.#repository.findOneById(brandId);

    if (!foundBrand) {
      throw new BrandNotFoundById();
    }

    const resData = new ResData("Found brand by id", 200, foundBrand);

    return resData;
  }

  async delete(brandId) {
    const foundBrand = await this.#repository.findOneById(brandId);

    if (!foundBrand) {
      throw new BrandNotFoundById();
    }

    const deletedBrand = await this.#repository.delete(brandId);

    const resData = new ResData("Deleted brand by id", 200, deletedBrand);

    return resData;
  }
}
