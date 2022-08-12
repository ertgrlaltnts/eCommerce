const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    products: [
      {
        ids: { type: Schema.Types.ObjectId, ref: "Product" },

        amount: {
          type: Number,
        },
      },
    ],

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    isForwarded: {
      type: Boolean,
      default: false,
    },

    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
