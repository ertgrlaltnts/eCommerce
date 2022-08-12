const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
