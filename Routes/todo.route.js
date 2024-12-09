import { Router  } from "express";
import {protectRoute} from "../Middlewares/protectRoute.js"
import {AddTodo , GetTodo , ToggleTodo , DeleteTodo} from "../Controllers/todo.controller.js"

const router = Router();

router.post("/api/todo" ,protectRoute , AddTodo );
router.get("/api/todo" , protectRoute , GetTodo);
router.patch("/api/todo/:todoID" , protectRoute , ToggleTodo)
router.delete("/api/todo/:todoID" , protectRoute , DeleteTodo);

export default router;