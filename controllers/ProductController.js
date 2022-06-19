const mongoose = require("mongoose");
const ProductModel = require("../models/productmodel");

const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(200).json({
      message: "product  created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No product exists with this id",
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: "product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No product exists with this id",
      });
    }

    await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "product removed successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "Fail",
        message: "No product exists with this id",
      });
    }

    const product = await ProductModel.findById(req.params.id);

    res.status(200).json({
      message: "product by id fecthed successfully",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const page = +req.query.page;
    const limit = 8;
    const startIndex = (page - 1) * limit;
    const totalProducts = await ProductModel.countDocuments({});
    const products = await ProductModel.find().limit(limit).skip(startIndex);

    res.status(200).json({
      message: "products fecthed successfully",
      results: products.length,
      data: products,
      currentPage: page,
      totalProducts,
      noOfPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
const getProductsByCategories = async (req, res) => {
  try {
    const queryNew = req.query.new;
    const categories = req.query.categories;
    const color = req.query.color;
    const size = req.query.size;
    const sortCondition = req.query.sort;
    const page = +req.query.page;
    const limit = 8;
    const startIndex = (page - 1) * limit;
    const totalProducts = await ProductModel.countDocuments({});
    console.log(color, size);
    let products;
    /*  if (queryNew) {
      products = await ProductModel.find().sort({ createdAt: "asc" }).limit(5);
    } else */
    /*  if (queryCategory) {
      products = await ProductModel.find({
        categories: {
          $in: [queryCategory],
        },
      })

        .limit(limit)
        .skip(startIndex);
    } */

    /*   products = await ProductModel.find({ $and: [{ categories: queryCategory }, { $and: [({ color: color }, { size: size })] }],
    })
      .limit(limit)
      .skip(startIndex); */
    /* 
    if (color == "undefined" && size == "undefined") {
      products = await ProductModel.find({ queryCategory }).limit(limit).skip(startIndex);
    } else if (color !== "undefined" && size == "undefined") {
      products = await ProductModel.find({ $and: [{ categories: queryCategory }, { color: color }] })
        .limit(limit)
        .skip(startIndex); first_name: { $eq: "Brian" } , { color: color }, { size: size }
    } */
    // mongoose.find( { title: { $in: [ "some title", "some other title" ] } } );

    products = await ProductModel.find({ categories: { $in: [categories] } })
      .limit(limit)
      .skip(startIndex);
    /*  products = await ProductModel.find({ $or: [{ categories: { $eq: categories }, $or: [{ color: { $eq: color } }, { size: { $eq: size } }] }] })
      .limit(limit)
      .skip(startIndex); */
    // const sizedata = products.find

    res.status(200).json({
      message: "products fecthed successfully",
      results: products.length,
      data: products,
      currentPage: page,
      totalProducts,
      noOfPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    return res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const getProductsBySearch = async (req, res) => {
  const title = new RegExp(req.query.title, "i");
  try {
    let SearchData = await ProductModel.find({ categories: title });
    if (SearchData.length > 0) {
      console.log("Category Data found");
    } else {
      SearchData = await ProductModel.find({ color: title });
      console.log("Color Data found");
    }
    return res.status(200).json({
      message: "success",
      results: SearchData.length,
      data: SearchData,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getProductsByCategories,
  getProductsBySearch,
};
