import { ResData } from "../../common/resData.js";
import { UserEntity } from "./entity/user.entity.js";
import {
  LoginOrPassWrongException,
  UserNotCreatedException,
  UserNotFoundException,
} from "./exception/user.exception.js";
import { UserRepository } from "./user.repository.js";
import { hashed, compare } from "../../lib/bcript.js";
import { generateToken, verifyToken } from "../../lib/jwt.js";

export class UserService {
  #repository;
  constructor() {
    this.#repository = new UserRepository();
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("success login", 200, foundAll);

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
    const hashedPassword = await hashed(dto.password);

    dto.password = hashedPassword;

    const newUser = new UserEntity(dto);

    const createdUser = await this.#repository.insert(newUser);

    if (!createdUser) {
      throw new UserNotCreatedException();
    }

    const token = generateToken(createdUser.id);

    const resData = new ResData("success created", 201, {
      user: createdUser,
      token,
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
