const mongoose = require("mongoose");
const OrderModel = require("../models/OrderModel.js");
const stripe = require("stripe")("sk_test_51L9EcaSIOH2wvcof0Nhmo4zwTaV70m5MuGuB7cMsaBi5BTsPA7qaLldGPperMY9GzB9YA3LqWWE4kTq2Z6oKV6Vl00zhehRaon");

const pay = async (req, res) => {
  try {
    const total = req.body.amount;
    console.log("Payment Request recieved for this ruppess", total);

    const payment = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "inr",
    });

    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  } catch (error) {
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const Order = await OrderModel.create(req.body);
    res.status(200).json({
      message: "Order  created successfully",
      data: Order,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No Order exists with this id",
      });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No Order exists with this id",
      });
    }

    await OrderModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Order removed successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No product exists with this id",
      });
    }

    const Order = await OrderModel.find({ userId: req.params.id });

    res.status(200).json({
      message: "Order by id fecthed successfully",
      data: Order,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const Orders = await OrderModel.find();

    res.status(200).json({
      message: "Orders fecthed successfully",
      data: Orders,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const getIncomeStatistics = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const data = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: prevMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getAllOrders,
  getIncomeStatistics,
  pay,
};
