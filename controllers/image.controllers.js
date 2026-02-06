import { v2 as cloudinary } from 'cloudinary';
import { imageModel } from '../model/image.model.js';

const uploadImageController = async (req, res) => {
  // console.log(req.user);
  try {
    //TODO: check if client send this file or not  */
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }
    //** Save file in mongoo datdbase */
    const image = await imageModel.create({
      url: req.file.path,
      publicId: req.file.filename,
      uploadedBy: req.user.userId // from auth middleware
    });

    res.status(201).json({ success: true, image });
  } catch (error) {
    //! Delete from Cloudinary if DB save fails
    if (req.file?.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({ message: error.message });
  }
};


const getImageController = async (req, res) => {
  try {
    const image = await imageModel.find({})
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      })
    }
    return res.status(200).json({
      success: true,
      image
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const deleteImageController = async(req, res)=>{
  const imageIdToDelete = req.params.id;
  console.log("--------------------------->" , imageIdToDelete);
}
export { uploadImageController, getImageController , deleteImageController}
