import { Router } from "express";
import { SchoolService } from "./school.service.js";
import { SchoolController } from "./school.controller.js";

const router = Router();

const schoolService = new SchoolService();
const schoolController = new SchoolController(schoolService);

router.post("/", (req, res) => {
  schoolController.createSchool(req, res);
});

router.get("/", (req, res) => {
  schoolController.getAllSchool(req, res);
});

router.get("/:id", (req, res) => {
  schoolController.getSchoolById(req, res);
});

router.delete("/:id", (req, res) => {
  schoolController.deleteSchoolById(req, res);
});

export default { router };
