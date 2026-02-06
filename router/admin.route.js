import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminAccess } from "../middleware/admin.middleware.js";

const AdminRouter = express.Router();


AdminRouter.get("/admin", authMiddleware,adminAccess, (req, res) => {

  return res.status(200).json({
    success: true,
    message: "Welcome to the home Page",
    id: req.user.userId,
    username: req.user.username,
    role:req.user.role
  })
})
export { AdminRouter };
