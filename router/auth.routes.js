import express from "express";
import { changePassword, login, register } from "../controllers/auth.controllers.js";
import { existingUserCheck, registerValidationSchemaCheck } from "../middleware/register.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const AuthRouter= express.Router();


AuthRouter.post("/register",registerValidationSchemaCheck, existingUserCheck ,  register)
AuthRouter.post("/login", login)
AuthRouter.post("/changepassword", authMiddleware , changePassword)
export {AuthRouter};
