import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDatabase} from "./config/database";
import Task from "./models/task.model";

connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})