const express = require("express");
const router = express.Router();
const { pay } = require("../controllers/OrderController");
const { TokenAuthenticationUser, TokenAuthenticationAdmin, verifyToken } = require("../middlewares/authentication");

router.post("/create-payment", pay);

module.exports = router;
