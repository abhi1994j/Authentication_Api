import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const UserRouter = express.Router();


UserRouter.get("/user", authMiddleware ,(req, res)=>{

  return res.status(200).json({
    success:true,
    message:"Welcome to the home Page",
    id: req.user.userId,
    username: req.user.username,
    role: req.user.role
  })
})
export { UserRouter };
