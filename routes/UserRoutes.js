const express = require("express");
const {
  signup,
  signin,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getRecentFiveUsers,
  getUserCreationStatistics,
} = require("../controllers/UserController.js");
const { TokenAuthenticationUser, TokenAuthenticationAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.get("/find/:id", TokenAuthenticationAdmin, getUserById);
router.get("/", TokenAuthenticationAdmin, getAllUsers);
router.get("/find", TokenAuthenticationAdmin, getRecentFiveUsers);
router.get("/stats", TokenAuthenticationAdmin, getUserCreationStatistics);
router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/:id", TokenAuthenticationUser, updateUser);
router.delete("/:id", TokenAuthenticationAdmin, deleteUser);

module.exports = router;
