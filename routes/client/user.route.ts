import express from "express";
const router = express.Router();

import * as controller  from "../../controllers/client/users.controller"

router.post("/register", controller.register);

router.post("/login", controller.login);

export const userRoute = router
