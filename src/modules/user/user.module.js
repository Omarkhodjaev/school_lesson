import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { BrandService } from "../brand/brand.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const userService = new UserService();
const brandService = new BrandService();
const userController = new UserController(userService, brandService);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post("/register", (req, res) => {
  userController.register(req, res);
});

router.get(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.getAllUser(req, res);
  }
);

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.get(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.getUserById(req, res);
  }
);

export default { router };
