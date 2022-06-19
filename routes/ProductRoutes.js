const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getProductsByCategories,
  getProductsBySearch,
} = require("../controllers/ProductController.js");
const { TokenAuthenticationUser, TokenAuthenticationAdmin, verifyToken } = require("../middlewares/authentication");
const router = express.Router();

router.get("/find/:id", getProductById);
router.get("/find", getProductsByCategories);
router.get("/", getAllProducts);
router.get("/q", getProductsBySearch);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", TokenAuthenticationAdmin, deleteProduct);
router.post("/", TokenAuthenticationAdmin, createProduct);
// router.get("/", TokenAuthenticationUser, getAllProducts);

module.exports = router;
