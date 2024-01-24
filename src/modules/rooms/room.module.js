import { Router } from "express";
import { RoomService } from "./room.service.js";
import { RoomController } from "./room.controller.js";
import { SchoolService } from "../school/school.service.js";

const router = Router();

const roomService = new RoomService();
const schoolService = new SchoolService();
const roomController = new RoomController(roomService, schoolService);

router.post("/create", (req, res) => {
  roomController.createRoom(req, res);
});

router.get("/", (req, res) => {
  roomController.getAllRoom(req, res);
});

router.get("/:id", (req, res) => {
  roomController.getRoomById(req, res);
});

router.delete("/:id", (req, res) => {
  roomController.deleteRoomById(req, res);
});

export default { router };
