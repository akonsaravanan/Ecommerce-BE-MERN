const jwt = require("jsonwebtoken");

const TokenAuthenticationUser = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    if (token) {
      /*  jwt.verify(token, process.env.secretKey, (err, user) => {
        if (err) return res.status(500).json("Invalid Token");
        req.user = user;
        next();
      }); */
      const decode = jwt.verify(token, process.env.secretKey);
      req.user = decode;
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do this");
      }
      console.log(req.user);
    }
  } catch (error) {
    res.status(500).json({
      message: "Token Not valid",
      error: error.message,
    });
    console.log(error);
  }
};
const verifyToken = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    if (token) {
      const decode = jwt.verify(token, process.env.secretKey);
      req.user = decode;
      next();
      console.log("TOKEN VALID");
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  } catch (error) {
    res.status(500).json({
      message: "Token Not valid",
      error: error.message,
    });
    console.log(error);
  }
};

const TokenAuthenticationAdmin = async (req, res, next) => {
  try {
    TokenAuthenticationUser(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do this");
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Token Not valid",
      error: error.message,
    });
    console.log(error);
  }
};

module.exports = { TokenAuthenticationUser, TokenAuthenticationAdmin, verifyToken };
