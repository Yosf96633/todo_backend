import { Router } from "express";
import {registerMiddleware , loginMiddleware , logoutMiddleware , deleteMiddleware} from "../Middlewares/user.middleware.js"
import {Register , Login , Logout , DeleteAccount} from "../Controllers/user.Controller.js"
const router = Router();

router.post("/api/user/register" , registerMiddleware , Register);
router.post("/api/user/login" , loginMiddleware , Login);
router.post("/api/user/logout" ,logoutMiddleware , Logout );
router.post("/api/user/delete" ,deleteMiddleware , DeleteAccount )

export default router; 