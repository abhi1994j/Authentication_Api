import jwt from "jsonwebtoken"

function genarateToken(userInfo){
  return jwt.sign(userInfo, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
}

export {genarateToken}
