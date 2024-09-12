import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { connectDatabase} from "./config/database";
import { routesApi } from "./routes/client/index.route";

connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routesApi(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})