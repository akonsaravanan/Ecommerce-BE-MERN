const mongoose = require("mongoose");
const CartModel = require("../models/CartModel.js");

const createCart = async (req, res) => {
  try {
    const Cart = await CartModel.create(req.body);
    res.status(200).json({
      message: "Cart  created successfully",
      data: Cart,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No Cart exists with this id",
      });
    }

    const updatedCart = await CartModel.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No cart exists with this id",
      });
    }

    await CartModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "cart removed successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const getCartById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No product exists with this id",
      });
    }

    // const cart = await CartModel.findOne({ userId: req.params.id });
    const cart = await CartModel.find({ userId: req.params.id });

    res.status(200).json({
      message: "cart by id fecthed successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
const getAllCarts = async (req, res) => {
  try {
    const carts = await CartModel.find();

    res.status(200).json({
      message: "carts fecthed successfully",
      data: carts,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCartById,
  getAllCarts,
};
