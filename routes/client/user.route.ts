import express from "express";
const router = express.Router();

import * as controller  from "../../controllers/client/users.controller"
import { requireAuth }from "../../middlewares/client/auth.middleware";

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/profile", requireAuth, controller.profile);

export const userRoute = router
