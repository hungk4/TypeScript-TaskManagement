import { Request, Response } from "express";
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


// [PATCH] /tasks/change-status
export const changeStatus = async (req: Request, res: Response) => {
  try{
    const ids = req.body.ids;
    await Task.updateMany({
      _id : { $in: ids}
    }, {
      status: req.body.status
    })
    res.json({
      message: "Cập nhật thành công!"
    })
  } catch(e){
    console.log(e);
    res.json({
      message: "Not Found 404"
    })
  } 
}

// [POST] /tasks/create
export const create = async (req: Request, res: Response) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json({
      message: "Thêm mới sản phẩm thành công!"
    })
  } catch(e) {
    res.json({
      message: "404 Not Found"
    })
  }

}

// [PATCH] /tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    await Task.updateOne({
      _id: id
    }, req.body);
    res.json({
      message: "Cập nhật task thành công!"
    }) 
  } catch(e){
    res.json({
      message: "404 Not Found"
    })
  }
}

// [PATCH] /tasks/delete
export const deleteItem = async (req: Request, res: Response) => {
  try{
    const ids = req.body.ids;
    await Task.deleteMany({
      _id: { $in: ids}
    })
    res.json({
      message: "Xóa công việc thành công!"
    })
  } catch(e){
    res.json({
      message: "404 Not Found"
    })
  }
}