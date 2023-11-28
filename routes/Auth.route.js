const express = require("express");

const route = express.Router();

route.post("/register", async (req, res, next) => {
  res.send("Register Route");
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
