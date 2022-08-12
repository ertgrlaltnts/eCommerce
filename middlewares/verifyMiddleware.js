const User = require("../models/User");

exports.isVerify = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.session.user_id });

    if (user) {
      if (!user.isValid) {
        res.json({
          response: "Lütfen mailinizi onaylayın",
        });
      } else {
        next();
      }
    } else {
      res.json({
        response: "Lütfen giriş yapın",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};
