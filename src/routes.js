const express = require("express");
const { User } = require("./models");

const routes = express.Router();

routes.post("/users", async (req, res) => {
  const { email, name, password } = req.body;

  const newUser = await User.create({ name, email, password });

  return res.status(200).json(newUser);
});

routes.get("/status", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

module.exports = routes;
