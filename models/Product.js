const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    photos: [],

    quantity: {
      type: Number,
      required: true,
    },

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
  this.slug = slugify(this.name);
  next();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
