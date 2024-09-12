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

  // Phan trang
  let skip: number = 0;
  let limitItems: number = 2;
  if(req.query.limitItems){
    limitItems = parseInt(`${req.query.limitItems}`);
  };
  let page: number = 1;
  if(req.query.page){
    page = parseInt(`${req.query.page}`);
  }
  skip = (page - 1) * limitItems;
  // Het phan trang

  // Tim kiem
  if(req.query.keyword){
    const regex = new RegExp(`${req.query.keyword}`, 'i');
    find["title"] = regex;
  };
  // Het Tim kiem


  const tasks = await Task
    .find(find)
    .skip(skip)
    .limit(limitItems)
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