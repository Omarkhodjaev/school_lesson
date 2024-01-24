import { Router } from "express";
import { SubjectService } from "./subject.service.js";
import { SubjectController } from "./subject.controller.js";
import { BrandService } from "../brand/brand.service.js";

const router = Router();

const subjectService = new SubjectService();
const brandService = new BrandService();
const subjectController = new SubjectController(subjectService, brandService);

router.post("/create", (req, res) => {
  subjectController.createSubject(req, res);
});

router.get("/", (req, res) => {
  subjectController.getAllSubject(req, res);
});

router.get("/:id", (req, res) => {
  subjectController.getSubjectById(req, res);
});

router.delete("/:id", (req, res) => {
  subjectController.deleteSubjectById(req, res);
});

export default { router };
