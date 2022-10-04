const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    isDelivery: {
      type: Boolean,
      default: false,
    },

    totalPrice: {
      type: Number,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    order: [],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
