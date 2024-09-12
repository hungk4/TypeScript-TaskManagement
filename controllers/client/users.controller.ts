import { Request, Response } from "express";
import User from "../../models/user.model";
import md5 from "md5";

import { generateRandomString } from "../../helpers/generate.helper";


// [POST] /users/register
export const register = async (req: Request, res: Response) => {
  try{
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = md5(req.body.password);
    
    const existUser = await User.findOne({
      email: email,
      deleted: false
    });

    if(existUser){
      res.json({
        code: 400,
        message: "Email đã tồn tại!"
      })
      return;
    }

    const token = generateRandomString(30);

    const user = new User({
      fullName: fullName,
      email: email,
      password: password,
      token: token
    });

    await user.save();

    res.json({
      code: 200,
      message: "Tạo mới tài khoản thành công!",
      token: token
    })
  } catch(e){
    res.json({
      message: "404 Not Found"
    })
  }
}


// [POST] /users/login
export const login = async (req: Request, res: Response) => {
  try{
    const email = req.body.email;
    const password = md5(req.body.password);
    const user = await User.findOne({
      email: email,
      deleted: false
    });

    if(!user){
      res.json({
        code: 400,
        message: "Không tồn tại email trong hệ thống"
      });
      return;
    }

    if(user.password !== password){
      res.json({
        code: 400,
        message: "Sai mật khẩu!"
      });
      return;
    }

    res.json({
      code: 200,
      token: user.token,
      message: "Đăng nhập thành công!"
    })
    
  } catch(e){
    res.json({
      code: 400,
      message: "Not Found"
    })
  }
}

