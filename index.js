import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./Lib/configDB.js";
import userRouter from "./Routes/user.Router.js"
import todoRouter from "./Routes/todo.route.js"
config();
const port = process.env.PORT;
const app = express();
//Global Middlewares
app.use( 
  cors({
    origin: [`https://taskify7.netlify.app`],
    credentials:true,
    methods: [`GET`, `POST`, `PUT`, `PATCH`, `DELETE`],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/" , userRouter);
app.use("/" , todoRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
