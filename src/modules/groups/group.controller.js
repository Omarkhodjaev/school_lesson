import { ResData } from "../../common/resData.js";
import { GroupBadRequest } from "./exception/group.exception.js";
import { GroupSchema } from "./validation/group.validation.js";
export class GroupController {
  #groupService;

  constructor(GroupService) {
    this.#groupService = GroupService;
  }

  async createGroup(req, res) {
    try {
      const dto = req.body;

      const { value, error } = GroupSchema.validate(dto);

      if (error) {
        throw new GroupBadRequest(error.message);
      }

      const resData = await this.#groupService.create(value);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      if (error) {
        const resData = new ResData(error.message, error.statusCode);
        res.status(resData.statusCode).json(resData);
      }
    }
  }

  async getAllGroup(req, res) {
    try {
      const resData = await this.#groupService.getAll();

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

  async getGroupById(req, res) {
    try {
      const groupId = req.params.id;
      const resData = await this.#groupService.getById(groupId);

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

  async deleteGroupById(req, res) {
    try {
      const groupId = req.params.id;
      const resData = await this.#groupService.delete(groupId);

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
