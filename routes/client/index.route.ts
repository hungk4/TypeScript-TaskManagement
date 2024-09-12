import { Express } from "express";
import { taskRoute } from "./task.route";
import { userRoute }from "./user.route";

import { requireAuth }from "../../middlewares/client/auth.middleware";

export const routesApi = (app: Express) => {
  app.use("/tasks", requireAuth, taskRoute);

  app.use("/users", userRoute);
}