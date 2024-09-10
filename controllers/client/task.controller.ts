import { Request, Response} from "express";
import Task from "../../models/task.model";



// [GET] /tasks
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false
  }
  // Loc theo trang thai
  const status = req.query.status;
  if(status){
    find["status"] = status;
  }
  // Het Loc theo trang thai

  // Sap xep
  const sort = {};
  const sortKey = `${req.query.sortKey}`;
  const sortValue = req.query.sortValue;

  if(sortKey && sortValue) {
    sort[sortKey] = sortValue;
  }
  // Het Sap xep
  const tasks = await Task
    .find(find)
    .sort(sort);
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