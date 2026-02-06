import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from "dotenv";

config(); //! very very important :always add this config method before cloudinary config

//* Check if env vars exist when this file is imported
// console.log('🔍 Cloudinary Config File Loaded');
// console.log('CLOUD_NAME:', process.env.CLOUD_NAME);
// console.log('CLOUD_API_KEY:', process.env.CLOUD_API_KEY);
// console.log('CLOUD_API_SECRET:', process.env.CLOUD_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'CloudinaryDemo',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  }
});

export {storage };
