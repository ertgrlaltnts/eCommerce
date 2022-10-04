const User = require("../models/User");
const sendMail = require("../mailer/sendMail");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const uniqueString = sendMail.randomString();
    const isValid = false;
    const user = await User.create({ isValid, uniqueString, ...req.body });
    // sendMail.sendMail(email, uniqueString);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });

    console.log(error);
  }
};

exports.currentUser = async (req, res) => {
  const current = req.session.user;
  if (current) {
    res.json({
      current,
    });
  } else {
    res.json({
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
          req.session.user = user;
          console.log(req.session.user);
          res.json({
            response: 1,
            user,
          });
        } else {
          res.json({
            response: 2,
            err,
          });
        }
      });
    } else {
      res.json({
        response: 3,
      });
    }
  } catch (error) {
    res.json({
      response: "HATA !",
      error,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const users = await User.find({ role: "admin" });
    const admin = users.find((item) => item.name === name);
    if (admin) {
      bcrypt.compare(password, admin.password, (err, same) => {
        if (same) {
          req.session.user = admin;
          res.json({
            response: 1,
            admin,
          });
        } else {
          res.json({
            response: 2,
          });
        }
      });
    } else {
      res.json({
        response: 2,
      });
    }
  } catch (error) {
    res.json({
      response: 2,
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

exports.createAddress = async (req, res) => {
  try {
    const address = req.body;
    const user = await User.findOne({ _id: req.session.user._id });
    user.address.push(address);
    user.save();
    res.json({
      response: 1,
      user,
    });
  } catch (error) {
    res.json({ response: 2, error });
  }
};

exports.createCard = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.user._id });
    user.cards.push({ ...req.body });
    user.save();
    res.json({
      response: 1,
      user,
    });
  } catch (error) {
    res.json({ response: 2, error });
  }
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

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { _id } = req.body;
  try {
    await User.findOneAndDelete({ _id: _id });
    res.json({
      response: 1,
    });
  } catch (error) {
    res.json({ response: 2, error });
  }
};

exports.addAdress = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.user._id });
    user.address.push({ ...req.body });
    user.save();

    res.json({
      response: 1,
      user,
    });
  } catch (error) {
    res.json({
      response: 2,
      error,
    });
  }
};
