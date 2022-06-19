const express = require("express");
const { createCart, updateCart, deleteCart, getCartById, getAllCarts } = require("../controllers/CartController.js");
const { TokenAuthenticationUser, TokenAuthenticationAdmin, verifyToken } = require("../middlewares/authentication.js");
const router = express.Router();

router.put("/:id", verifyToken, updateCart); // cart id
router.delete("/:id", verifyToken, deleteCart); // cart id
router.get("/find/:id", getCartById); //get cart by user id
router.get("/", TokenAuthenticationAdmin, getAllCarts);

router.post("/", verifyToken, createCart);

module.exports = router;
