import { storage } from "../config/cloudinary.config.js";
import multer from "multer";

export const upload = multer({ // this multer middleware need to upload file(images/videos)
  storage, //* this storage is cloudinary storage where store the images
  limits: {
    fileSize: 10 * 1024 * 1024 //* 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
})
