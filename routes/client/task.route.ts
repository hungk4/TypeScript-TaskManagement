import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/task.controller";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status", controller.changeStatus);

router.post("/create", controller.create);

router.patch("/edit/:id", controller.edit);

router.patch("/delete", controller.deleteItem);

export const taskRoute = router;