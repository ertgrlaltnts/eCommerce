const Category = require("../models/Category");
const Product = require("../models/Product");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json({
      category,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.getProductsWithCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { _id } = await Category.findOne({ slug: slug });
    const products = await Product.find({ category: _id });
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
      { slug: slug },
      { $set: { name: name, slug: slugify(name) } }
    );
    res.status(200).json({
      category,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOneAndDelete({ slug: slug });
    await Product.deleteMany({ category: category._id });
    res.status(200).json({
      response: "Kategori başarıyla silindi",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
