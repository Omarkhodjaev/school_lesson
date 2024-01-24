import { ResData } from "../../common/resData.js";
import { RoomBadRequest } from "./exception/room.exception.js";
import { roomSchema } from "./validation/room.validation.js";

export class RoomController {
  #roomService;
  #schoolService;
  constructor(RoomService, SchoolService) {
    this.#roomService = RoomService;
    this.#schoolService = SchoolService;
  }

  async createRoom(req, res) {
    try {
      const dto = req.body;

      const { value, error } = roomSchema.validate(dto);

      if (error) {
        throw new RoomBadRequest(error.message);
      }

      const foundSchool = await this.#schoolService.getById(dto.schoolId);

      const resData = await this.#roomService.create(value);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      if (error) {
        const resData = new ResData(error.message, error.statusCode);
        res.status(resData.statusCode).json(resData);
      }
    }
  }

  async getAllRoom(req, res) {
    try {
      const resData = await this.#roomService.getAll();

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

  async getRoomById(req, res) {
    try {
      const roomId = req.params.id;
      const resData = await this.#roomService.getById(roomId);

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

  async deleteRoomById(req, res) {
    try {
      const roomId = req.params.id;
      const resData = await this.#roomService.delete(roomId);

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
