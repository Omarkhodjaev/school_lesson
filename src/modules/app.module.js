import { Router } from "express";
import user from "./user/user.module.js";
import brand from "./brand/brand.module.js";

const router = Router();

router.use("/user", user.router);
router.use("/brand", brand.router);

export default { router };
