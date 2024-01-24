import { ResData } from "../../common/resData.js";
import { RoomRepository } from "./room.repository.js";
import { RoomEntity } from "./entity/room.entity.js";
import { RoomAlreadyExistFoundByName } from "./exception/room.exception.js";

export class RoomService {
  #repository;
  constructor() {
    this.#repository = new RoomRepository();
  }
  async create(dto) {
    const foundRoom = await this.#repository.findByName(dto.name);
    if (foundRoom) {
      throw new RoomAlreadyExistFoundByName();
    }
    
    
    const newRoom = new RoomEntity(dto);
    
    const room = await this.#repository.insert(newRoom);

    const resData = new ResData("A new room is created", 200, room);
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
