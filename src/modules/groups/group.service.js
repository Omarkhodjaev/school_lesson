import { ResData } from "../../common/resData.js";
import { GroupRepository } from "./group.repository.js";
import { GroupEntity } from "./entity/group.entity.js";
import {
  GroupAlreadyExistFoundByName,
  GroupNotFoundById,
} from "./exception/group.exception.js";

export class GroupService {
  #repository;
  constructor() {
    this.#repository = new GroupRepository();
  }
  async create(dto) {
    const foundGroup = await this.#repository.findByName(dto.name);

    if (foundGroup) {
      throw new GroupAlreadyExistFoundByName();
    }

    const newGroup = new GroupEntity(dto);

    const group = await this.#repository.insert(newGroup);

    const resData = new ResData("A new group is created", 200, group);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All groups is gotten", 200, foundAll);

    return resData;
  }

  async getById(groupId) {
    const foundGroup = await this.#repository.findOneById(groupId);

    if (!foundGroup) {
      throw new GroupNotFoundById();
    }

    const resData = new ResData("Found group by id", 200, foundGroup);

    return resData;
  }

  async delete(groupId) {
    const foundGroup = await this.#repository.findOneById(groupId);

    if (!foundGroup) {
      throw new GroupNotFoundById();
    }

    const deletedBrand = await this.#repository.delete(groupId);

    const resData = new ResData("Deleted group by id", 200, deletedBrand);

    return resData;
  }
}
