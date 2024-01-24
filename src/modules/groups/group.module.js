import { Router } from "express";
import { GroupService } from "./group.service.js";
import { GroupController } from "./group.controller.js";

const router = Router();

const groupService = new GroupService();
const groupController = new GroupController(groupService);

router.post("/create", (req, res) => {
  groupController.createGroup(req, res);
});

router.get("/", (req, res) => {
  groupController.getAllGroup(req, res);
});

router.get("/:id", (req, res) => {
  groupController.getGroupById(req, res);
});

router.delete("/:id", (req, res) => {
  groupController.deleteGroupById(req, res);
});

export default { router };
