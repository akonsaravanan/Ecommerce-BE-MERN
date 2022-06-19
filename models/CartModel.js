const mongoose = require("mongoose");

const CartInfo = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const cartmodel = mongoose.model("Carts", CartInfo);
module.exports = cartmodel;
