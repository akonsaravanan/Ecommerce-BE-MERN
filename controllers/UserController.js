const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const signup = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      isAdmin: req.body.isAdmin,
    });
    const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.secretKey, {
      expiresIn: "10hr",
    });
    const { password, ...others } = newUser._doc; //separating password from response

    res.status(201).json({
      message: "User created successfully",
      data: { ...others, token },
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      Error: err.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email } = req.body;
    const extUser = await UserModel.findOne({ email });
    if (extUser) {
      const extPassword = await bcrypt.compare(req.body.password, extUser.password);
      if (!extPassword) {
        console.log("Password mismatch");
        return res.status(400).json({
          message: "user not found",
        });
      }
    } else {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const token = jwt.sign({ id: extUser._id, isAdmin: extUser.isAdmin }, process.env.secretKey, {
      expiresIn: "10hr",
    });
    const { password, isAdmin, createdAt, updatedAt, ...others } = extUser._doc; //separating password from response

    res.status(201).json({
      message: "User logged in successfully",
      data: { ...others, token },
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      Error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No user exists with this id",
      });
    }

    const updatedUser = {
      name,
      email,
      password: await bcrypt.hash(req.body.password, 12),
      _id: id,
    };
    await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });

    res.status(200).json({
      message: "user updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No user exists with this id",
      });
    }

    await UserModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "user removed successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No user exists with this id",
      });
    }

    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json({
      message: "user by id fecthed successfully",
      data: others,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({
      message: "users fecthed successfully",
      data: users,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
const getRecentFiveUsers = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ createdAt: "asc" }).limit(5);

    res.status(200).json({
      message: "users fecthed successfully",
      data: users,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const getUserCreationStatistics = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  console.log(lastYear);
  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
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
  signup,
  signin,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getRecentFiveUsers,
  getUserCreationStatistics,
};
