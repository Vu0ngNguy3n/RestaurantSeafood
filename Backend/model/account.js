const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  displayName: {
    type: String,
  },
  role: {
    type: Number,
  },
});

let Account = mongoose.model("Account", accountSchema);

module.exports = { Account };
