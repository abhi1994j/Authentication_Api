import express from "express"
import { uploadImageController, getImageController } from "../controllers/image.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminAccess } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/upload.middleware.js";



const imageRouter = express.Router();

// TODO only authorized admin user can upload or delete the images
imageRouter.post("/image/upload",authMiddleware, adminAccess, upload.single("image") , uploadImageController); //? single('image') - image is the key to upload a file in postman or client

imageRouter.get("/image/get", authMiddleware, getImageController);
imageRouter.delete("/image/delete/:id", authMiddleware, adminAccess,  getImageController);

export {imageRouter};

