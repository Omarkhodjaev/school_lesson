import { ResData } from "../../common/resData.js";
import { SubjectRepository } from "./subject.repository.js";
import { SubjectEntity } from "./entity/subject.entity.js";
import {
  SubjectAlreadyExistFoundByName,
  SubjectNotFoundById,
} from "./exception/subject.exception.js";

export class SubjectService {
  #repository;
  constructor() {
    this.#repository = new SubjectRepository();
  }
  async create(dto) {
    const foundSubject = await this.#repository.findByName(dto.name);

    if (foundSubject) {
      throw new SubjectAlreadyExistFoundByName();
    }

    const newSubject = new SubjectEntity(dto);

    const subject = await this.#repository.insert(newSubject);

    const resData = new ResData("A new subject is created", 200, subject);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All subjects is gotten", 200, foundAll);

    return resData;
  }

  async getById(subjectId) {
    const foundSubject = await this.#repository.findOneById(subjectId);

    if (!foundSubject) {
      throw new SubjectNotFoundById();
    }

    const resData = new ResData("Found subject by id", 200, foundSubject);

    return resData;
  }

  async delete(subjectId) {
    const foundSubject = await this.#repository.findOneById(subjectId);

    if (!foundSubject) {
      throw new BrandNotFoundById();
    }

    const deletedBrand = await this.#repository.delete(subjectId);

    const resData = new ResData("Deleted brand by id", 200, deletedBrand);

    return resData;
  }
}
