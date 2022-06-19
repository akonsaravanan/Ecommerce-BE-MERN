const express = require("express");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const stripeRoutes = require("./routes/stripe");
const app = express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 102400 }));

app.get("/", (req, res) => {
  res.send("Hello Welcome Sara");
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", stripeRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening to EXPRESS http://localhost:${process.env.PORT}`);
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewURLParser: true,
    })
    .then(() => {
      console.log("MONGO-DB Connection Successfull");
    })
    .catch((err) => console.log(err.message + "server not able to connect"));
});
