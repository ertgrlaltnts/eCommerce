const User = require("../models/User");
const sendMail = require("../mailer/sendMail");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const uniqueString = sendMail.randomString();
    const isValid = false;
    const user = await User.create({ isValid, uniqueString, ...req.body });
    sendMail.sendMail(email, uniqueString);
    res.status(200).json({
      user,
    });
  } catch (error) {
    // res.status(400).json({
    //   error,
    // });

    console.log(error);
  }
};

exports.currentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.session.user_id });
  const current = req.session.user_id;
  if (current) {
    res.status(200).json({
      current,
      user,
    });
  } else {
    res.status(400).json({
      response: "Giriş yapmış kullanıcı bulunamadı !",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.user_id = user._id;
          res.status(200).json({
            response: "Başarıyla giriş yapıldı",
          });
        } else {
          res.status(400).json({
            response: "Şifreniz hatalı !",
          });
        }
      });
    } else {
      res.status(400).json({
        response: "Kullanıcı bulunamadı !",
      });
    }
  } catch (error) {
    res.status(400).json({
      response: "HATA !",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      response: "Başarıyla çıkış yapıldı",
    });
  });
};

exports.verifyUser = async (req, res) => {
  try {
    const { uniqueString } = req.params;

    const user = await User.findOne({ uniqueString: uniqueString });
    if (user) {
      user.isValid = true;
      user.save();

      res.status(200).json({
        response: "Onay başarıyla gerçekleşti !",
      });
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
