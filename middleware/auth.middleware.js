import jwt from "jsonwebtoken"
import { log } from "../logger/logger.js";


const authMiddleware = (req, res, next) => {
  try {
    // log("req" , req , req.headers);
    const authHeader = req.headers.authorization; //? Take the token from headers
    // log("token______", authHeader);
    const token = authHeader && authHeader.split(" ")[1]
    // log("accessToken_______", token);
    if (!token) { //** Check the token is valid or not
      return res.status(401).json({
        success: false,
        message: "Access denied , This is not A valid token"
      })
    }
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodeTokenInfo; //** Store the userInfo in the request object
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
  next();
}
export { authMiddleware };
