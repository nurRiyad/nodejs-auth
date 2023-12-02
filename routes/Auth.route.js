const express = require("express");
const { joiUser } = require("../helper/validator");
const User = require("../model/User.model");
const httpErrors = require("http-errors");

const route = express.Router();

route.post("/register", async (req, res, next) => {
  try {
    const result = await joiUser.validateAsync(req.body);
    const isExist = await User.findOne({ email: result.email });

    if (isExist) throw httpErrors.Conflict(`${result.email} already exist`);

    const user = new User(result);
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

route.post("/login", async (req, res, next) => {
  res.send("Login Route");
});

route.post("/refresh-token", async (req, res, next) => {
  res.send("Refresh token Route");
});

route.delete("/logout", async (req, res, next) => {
  res.send("Logout Route");
});

module.exports = route;
