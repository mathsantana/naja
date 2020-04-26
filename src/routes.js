const express = require("express");
const jwt = require("jsonwebtoken");

const {
  signIn,
  signUp,
  googleSignIn,
  googleCallBack,
  authMiddleware,
} = require("./controllers/User");

const Category = require("./controllers/Category");
const Product = require("./controllers/Product");

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

routes.get("/category/:id", Category.index);
routes.post("/category", Category.create);
routes.get("/category", Category.list);
routes.delete("/category", Category.delete);
routes.put("/category", Category.update);

routes.post("/product", Product.create);
routes.get("/product", Product.list);

module.exports = routes;
