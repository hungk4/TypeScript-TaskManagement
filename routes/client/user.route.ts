import express from "express";
const router = express.Router();

import * as controller  from "../../controllers/client/users.controller"

router.post("/register", controller.register);

export const userRoute = router
