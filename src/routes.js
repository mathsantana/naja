const express = require("express");
const jwt = require("jsonwebtoken");

const {
  signIn,
  signUp,
  googleSignIn,
  googleCallBack,
  authMiddleware,
} = require("./controllers/User");

const routes = express.Router();

routes.post("/user/signUp", signUp);

routes.post("/user/signIn", signIn);

routes.get("/auth/google", googleSignIn);

routes.get("/auth/google/callback", googleCallBack);

routes.get("/status", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

routes.get("/private", authMiddleware, (req, res, next) => {
  return res.status(200).json({ status: "Authenticated" });
});

module.exports = routes;
