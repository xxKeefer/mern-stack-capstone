const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, bcrypt: true },
  roles: { type: Array, required: true, default: ["user"] },
});

userSchema.plugin(require("mongoose-bcrypt"));

module.exports = mongoose.model("User", userSchema);
