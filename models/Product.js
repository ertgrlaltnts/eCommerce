const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
    },

    rate: {
      type: Number,
    },

    price: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    images: [],

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
