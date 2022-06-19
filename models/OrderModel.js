const mongoose = require("mongoose");

const OrderInfo = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    addresses: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const ordermodel = mongoose.model("Orders", OrderInfo);
module.exports = ordermodel;
