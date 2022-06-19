const mongoose = require( "mongoose" );


const UserInfo = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const usermodel = mongoose.model("Users", UserInfo);
module.exports = usermodel;
