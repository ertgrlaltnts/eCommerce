const nodemailer = require("nodemailer");

exports.sendMail = (email, uniqueString) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ertgrlaltnts@gmail.com",
      pass: "avwoiuzyttdkwibn",
    },
  });

  const sender = "eCommerce ekibi";
  var mailOptions;

  mailOptions = {
    from: sender,
    to: email,
    subject: "Email Onayı",
    html: `Mailinizi onaylamak için <a href="http://localhost:3000/users/verify/${uniqueString}">buraya</a> tıklayınız.`,
  };

  transport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mail başarıyla gönderildi");
    }
  });
};

exports.randomString = () => {
  const len = 8;
  let randStr = "";

  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }

  return randStr;
};
