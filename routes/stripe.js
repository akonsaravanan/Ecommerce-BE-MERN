const express = require("express");
const router = express.Router();
const { pay } = require("../controllers/OrderController.js");
const { TokenAuthenticationUser, TokenAuthenticationAdmin, verifyToken } = require("../middlewares/authentication.js");

router.post("/create-payment", pay);

module.exports = router;
