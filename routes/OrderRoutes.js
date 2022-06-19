const express = require("express");
const { getIncomeStatistics, createOrder, updateOrder, deleteOrder, getOrderById, getAllOrders } = require("../controllers/OrderController");
const { TokenAuthenticationUser, TokenAuthenticationAdmin, verifyToken } = require("../middlewares/authentication");
const router = express.Router();

router.get("/find/:id", getOrderById); //get Order by user id
router.get("/", TokenAuthenticationAdmin, getAllOrders);
router.get("/income", TokenAuthenticationAdmin, getIncomeStatistics);
router.put("/:id", TokenAuthenticationAdmin, updateOrder); // Order id
router.delete("/:id", TokenAuthenticationAdmin, deleteOrder); // Order id
router.post("/", verifyToken, createOrder);

module.exports = router;
