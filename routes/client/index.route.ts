import { Express } from "express";
import { taskRoute } from "./task.route";
import { userRoute }from "./user.route";

export const routesApi = (app: Express) => {
  app.use("/tasks", taskRoute);

  app.use("/users", userRoute);
}