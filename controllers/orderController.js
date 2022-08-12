const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const Iyzipay = require("iyzipay");

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    let isError = [];

    if (products.length < 1) {
      res.status(400).json({
        response: "Sepete ürün ekleyiniz",
      });
    } else {
      for (let i = 0; i < products.length; i++) {
        const product = await Product.findOne({ _id: products[i].ids });
        {
          product.quantity < products[i].amount
            ? isError.push(product.name)
            : null;
        }
      }

      if (isError.length > 0) {
        res.status(400).json({
          response: `Eklediğiniz şu ürünler yetersiz : ${isError}`,
        });
      } else {
        const user = await User.findOne({ _id: req.session.user_id });

        let totalPrice = 0;
        let productList = [];
        for (let i = 0; i < products.length; i++) {
          const product = await Product.findOne({ _id: products[i].ids });
          const basketProducts = {
            id: `${product._id}`,
            name: product.name,
            category1: `${product.category}`,
            category2: `${product.category}`,
            itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
            price: `${product.price * products[i].amount}`,
          };

          totalPrice += product.price * products[i].amount;
          productList.push(basketProducts);
        }

        var iyzipay = new Iyzipay({
          apiKey: "sandbox-bde22ANA62PUbRDCIGg2fUT87vITbEob",
          secretKey: "sandbox-Pxgj3MgiDxjqGqk2cVDHrw8vgrDA7TCQ",
          uri: "https://sandbox-api.iyzipay.com",
        });

        var request = {
          locale: Iyzipay.LOCALE.TR,
          conversationId: "123456789",
          price: `${totalPrice}`,
          paidPrice: `${totalPrice}`,
          currency: Iyzipay.CURRENCY.TRY,
          installment: "1",
          paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
          paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
          paymentCard: {
            cardHolderName: `${user.name} ${user.surName}`,
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: "123",
            registerCard: "0",
          },
          buyer: {
            id: "BY789",
            name: user.name,
            surname: user.surName,
            gsmNumber: "+905350000000",
            email: user.email,
            identityNumber: "74300864791",
            lastLoginDate: "2015-10-05 12:43:35",
            registrationDate: "2013-04-21 15:12:09",
            registrationAddress:
              "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732",
          },
          shippingAddress: {
            contactName: user.name,
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742",
          },
          billingAddress: {
            contactName: user.name,
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742",
          },
          basketItems: productList,
        };

        iyzipay.payment.create(request, async function (err, result) {
          if (result.status === "success") {
            const order = await Order.create({
              ...req.body,
              user: req.session.user_id,
            });

            res.status(200).json({
              order,
            });
          }
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
