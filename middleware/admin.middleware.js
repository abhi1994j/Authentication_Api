const adminAccess = async (req, res, next) => {
  try {
    console.log("req.user------------------------------>" ,req.user.role);
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied, admin rights required"
      })
    }
    next()
  } catch (err) {
    next(err)
  }
}

export { adminAccess }
