const Product = require("../models/Product");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug: slug });
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name, price, quantity, photos, subtitle, category } = req.body;
    const product = await Product.findOneAndUpdate(
      { slug: slug },
      {
        $set: {
          name: name,
          price: price,
          quantity: quantity,
          photos: photos,
          subtitle: subtitle,
          category: category,
          slug: slugify(name),
        },
      }
    );

    res.status(200).json({
      response: "Ürün güncellemesi başarıyla yapıldı",
      product,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    await Product.findOneAndDelete({ slug: slug });
    res.status(200).json({
      response: "Ürün başarıyla silindi",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
