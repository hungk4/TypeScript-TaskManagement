import { Express } from "express";
import { taskRoute } from "./task.route";

export const routesApi = (app: Express) => {
  app.use("/tasks", taskRoute);
}