const Product = require("../models/Product");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body);
    res.json({
      response: 1,
      product,
    });
  } catch (error) {
    res.json({
      response: 2,
      error,
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json({
      product,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug: slug });
    res.json({
      product,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, desc, rate, price, amount, images, category } = req.body;
    const product = await Product.findOneAndUpdate(
      { slug: slug },
      {
        $set: {
          title: title,
          desc: desc,
          rate: rate,
          price: price,
          amount: amount,
          images: images,
          category: category,
          slug: slugify(title),
        },
      }
    );

    res.json({
      response: 1,
      product,
    });
  } catch (error) {
    res.json({
      response: 2,
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    await Product.findOneAndDelete({ slug: slug });
    res.json({
      response: 1,
    });
  } catch (error) {
    res.json({
      response: 2,
      error,
    });
  }
};
