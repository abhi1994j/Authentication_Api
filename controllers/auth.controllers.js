import { authModal } from "../model/auth.model.js";
import bcrypt from "bcrypt"
import { genarateToken } from "../config/token.config.js";


const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10) // genarate hash password
    const user = await authModal.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role
    })

    // const safeUser = {
    //   id: user._id,
    //   username: user.username,
    //   email: user.email,
    //   role: user.role
    // };
    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      // user: safeUser
    })
  } catch (error) {
    console.log("error----------------------------->", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkRegisteredEmail = await authModal.findOne({ email });
    if (!checkRegisteredEmail) {
      return res.status(404).json({
        success: false,
        message: "You are not registered ,please kindly register"
      })
    }
    const hashPassword = checkRegisteredEmail.password
    const comparePassword = await bcrypt.compare(password, hashPassword) //* check is that client send passowrd is correct or not
    if (!comparePassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    // access the token
    const userInfo = {
      userId: checkRegisteredEmail._id,
      username: checkRegisteredEmail.username,
      role: checkRegisteredEmail.role
    }
    const accessToken = genarateToken(userInfo); // genarate a token

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      accessToken
    })
  } catch (error) {
    console.log("error----------------------------->", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await authModal.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not exist"
      })
    }
    //TODO check the old password that client provided is correct or not
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    console.log(checkOldPassword);
    if (!checkOldPassword) {
      return res.status(400).json({
        success: false,
        message: "password is not correct"
      })
    }
    const hashChangedPassword = await bcrypt.hash(newPassword, 10)

    // ? update user password and store it in database
    user.password = hashChangedPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "passowrd update successfully"
    })
  } catch (error) {
    console.log("error----------------------------->", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export { register, login, changePassword }
