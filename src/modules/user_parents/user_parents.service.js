import { ResData } from "../../common/resData.js";

import { UserParentsEntity } from "./entity/user_parents.entity.js";
import { hashed, compare } from "../../lib/bcript.js";
import { generateToken, verifyToken } from "../../lib/jwt.js";
import { UserParentsRepository } from "./user_parents.repository.js";
import { UserParentsNotCreatedException } from "./exception/user_parents.exception.js";

export class UserParentsService {
  #repository;
  constructor() {
    this.#repository = new UserParentsRepository();
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData(
      "All user and parents is gotten",
      200,
      foundAll
    );

    return resData;
  }

  async getById(userId) {
    console.log(userId);
    const foundById = await this.#repository.findOneById(userId);

    if (!foundById) {
      throw new UserNotFoundException();
    }

    return new ResData("User is gotten by id", 200, foundById);
  }

  async create(dto) {
    const newUserParent = new UserParentsEntity(dto);

    const createdUserParents = await this.#repository.insert(newUserParent);

    if (!createdUserParents) {
      throw new UserParentsNotCreatedException();
    }

    const resData = new ResData("success created", 201, {
      createdUserParents,
    });

    return resData;
  }

  async login(dto) {
    const { data: foundUser } = await this.findByLogin(dto.login);

    if (!foundUser) {
      throw new UserNotFoundException();
    }

    const isValidPassword = await compare(dto.password, foundUser.password);

    if (!isValidPassword) {
      throw new LoginOrPassWrongException();
    }

    const newToken = generateToken(foundUser.id);

    const resData = new ResData("success login", 200, {
      user: foundUser,
      token: newToken,
    });

    return resData;
  }

  async findByLogin(login) {
    const foundByLogin = await this.#repository.findOneByLogin(login);

    let resData;

    if (foundByLogin) {
      resData = new ResData("success login", 200, foundByLogin);
    } else {
      resData = new ResData("user not found", 404, foundByLogin);
    }

    return resData;
  }

  async findById(id) {
    const foundById = await this.#repository.findOneById(id);

    if (!foundById) {
      throw new UserNotFoundException();
    }

    return new ResData("success login", 200, foundById);
  }
}
