const mongoose = require("mongoose");
const { scryptSync, randomBytes } = require("node:crypto");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hash password
UserSchema.pre("save", async function (next) {
  const salt = randomBytes(16).toString("hex");
  this.password = scryptSync(this.password, salt, 32).toString("hex");

  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
