import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    uploadedBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"auth",
      required:true
    }
  },
  {
    timestamps: true
  }
)

const imageModel = mongoose.model("images", imageSchema);

export { imageModel }
