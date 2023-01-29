const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    createdAt: new Date()
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email or password is incorrect');

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send('Email or password is incorrect');

  const token = jwt.sign({ _id: user._id }, config.secret);
  res.header('auth-token', token).send(token);
});

module.exports = router;
