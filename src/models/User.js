const mongoose = require("mongoose");

const model = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
  role: String,
});

module.exports = model;
