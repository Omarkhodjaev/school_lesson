import { Router } from "express";
import { UserParentsController } from "./user_parents.controller.js";
import { UserParentsService } from "./user_parents.service.js";
import { UserParentsRepository } from "./user_parents.repository.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const userParentService = new UserParentsService();
const repository = new UserParentsRepository();
const userParentsController = new UserParentsController(userParentService, repository);

const authorizationMiddleware = new AuthorizationMiddleware();
router.post("/create", (req, res) => {
  userParentsController.create(req, res);
});

router.get(
  "/",
  // authorizationMiddleware.checkToken,
  // authorizationMiddleware.checkUser,
  // authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userParentsController.getAllUserParents(req, res);
  }
);


router.get(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userParentsController.getUserById(req, res);
  }
);

export default { router };
