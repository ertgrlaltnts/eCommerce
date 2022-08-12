const User = require("../models/User");

module.exports = (role) => {
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req.session.user_id });
    const userRole = user.role;
    console.log(userRole);
    if (role === userRole) {
      next();
    } else {
      res.status(400).json({
        response: "Bunu yapmaya yetkiniz yok !",
      });
    }
  };
};
