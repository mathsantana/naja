const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const {
  signIn,
  signUp,
  googleSignIn,
  googleCallBack,
  authMiddleware,
} = require('./controllers/User');

const Category = require('./controllers/Category');
const Product = require('./controllers/Product');

const routes = express.Router();

routes.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header('Access-Control-Allow-Origin', '*');
  //Quais são os métodos que a conexão pode realizar na API
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  console.log('Aconteceu!');
  routes.use(cors());
  next();
});

routes.post('/user/signUp', signUp);
routes.post('/user/signIn', signIn);
routes.get('/auth/google', googleSignIn);
routes.get('/auth/google/callback', googleCallBack);

routes.get('/status', (req, res) => {
  return res.status(200).json({ status: 'OK' });
});

routes.get('/private', authMiddleware, (req, res, next) => {
  return res.status(200).json({ status: 'Authenticated' });
});

routes.get('/category/:id', Category.index);
routes.put('/category/:id', Category.update);
routes.delete('/category/:id', Category.delete);
routes.post('/category', Category.create);
routes.get('/category', Category.list);

routes.get('/product/:id', Product.index);
routes.put('/product/:id', Product.update);
routes.delete('/product/:id', Product.delete);
routes.post('/product', Product.create);
routes.get('/product', Product.list);

module.exports = routes;
