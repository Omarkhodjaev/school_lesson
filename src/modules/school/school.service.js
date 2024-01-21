import { ResData } from "../../common/resData.js";
import { SchoolRepository } from "./school.repository.js";
import { SchoolEntity } from "./entity/school.entity.js";
import { SchoolNotFoundById } from "./exception/exception/school.exception.js";

export class SchoolService {
  #repository;
  constructor() {
    this.#repository = new SchoolRepository();
  }
  async create(dto) {
    const newSchool = new SchoolEntity(dto);

    const school = await this.#repository.insert(newSchool);

    const resData = new ResData("A new school is created", 200, school);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All schools is gotten", 200, foundAll);

    return resData;
  }

  async getById(schoolId) {
    const foundSchool = await this.#repository.findOneById(schoolId);

    if (!foundSchool) {
      throw new SchoolNotFoundById();
    }

    const resData = new ResData("Found school by id", 200, foundSchool);

    return resData;
  }

  async delete(schoolId) {
    const foundSchool = await this.#repository.findOneById(schoolId);

    if (!foundSchool) {
      throw new SchoolNotFoundById();
    }

    const deletedSchool = await this.#repository.delete(schoolId);

    const resData = new ResData("Deleted school by id", 200, deletedSchool);

    return resData;
  }
}
