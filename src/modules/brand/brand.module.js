import { Router } from "express";
import { BrandService } from "./brand.service.js";
import { BrandController } from "./brand.controller.js";

const router = Router();

const brandService = new BrandService();
const brandController = new BrandController(brandService);

router.post("/", (req, res) => {
  brandController.createBrand(req, res);
});

router.get("/", (req, res) => {
  brandController.getAllBrand(req, res);
});

router.get("/:id", (req, res) => {
  brandController.getBrandById(req, res);
});

router.delete("/:id", (req, res) => {
    brandController.deleteBrandById(req, res);
  });



export default { router };
