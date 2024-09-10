import { Request, Response} from "express";
import Task from "../../models/task.model";



// [GET] /tasks
export const index = async (req: Request, res: Response) => {
  const tasks = await Task.find({});
  res.json(tasks);
}

// [GET] /tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false
  });
  res.json(task);
}