import { authModal } from "../model/auth.model.js";
import { registerSchema } from "../validators/auth.validator.js";



const registerValidationSchemaCheck = async(req , res , next)=>{
  const { username, email, password } = req.body
  const {error} = registerSchema.validate({ username, email, password });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    })
  }
  next();
}

const existingUserCheck = async(req, res , next)=>{
  const {username , email} = req.body
  const existingUser = await authModal.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exist ,please try different username , email"
    })
  }
  next()
}
export {registerValidationSchemaCheck , existingUserCheck};
