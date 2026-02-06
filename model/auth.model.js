import mongoose from "mongoose";


// defines how data is stored (database layer)
const authSchema =  mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase:true
    },
    password:{
      type:String,
      required:true
    },
    role:{
      type:String,
      enum :["user" , "admin"],
      default:"user"
    }
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    versionKey: false,
  }
);
const authModal = mongoose.model("auth", authSchema)
export {authModal} ;
