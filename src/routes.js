const express = require('express');
const { User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routes = express.Router();

routes.post('/users/signUp', async (req, res) => {
  const { email, name, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashPassword });

  return res.status(200).json(newUser);
});

routes.post('/users/signIn', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByPk(email);

  console.log(user);

  if (!user) return res.status(400).json({ message: 'User not found!' });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return res.status(400).send('Invalid password!');

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    'secret',
    { expiresIn: 60 * 60 }
  );

  return res.status(200).json(token);
});

routes.get('/status', (req, res) => {
  return res.status(200).json({ status: 'OK' });
});

module.exports = routes;
