import { Router } from "express";
import user from "./user/user.module.js";
import brand from "./brand/brand.module.js";
import school from "./school/school.module.js";
import userParents from "./user_parents/user_parents.module.js";
import rooms from "./rooms/room.module.js";
import subject from "./subject/subject.module.js";
import group from "./groups/group.module.js";

const router = Router();

router.use("/user", user.router);
router.use("/brand", brand.router);
router.use("/school", school.router);
router.use("/userparents", userParents.router);
router.use("/room", rooms.router);
router.use("/subject", subject.router);
router.use("/group", group.router);

export default { router };
