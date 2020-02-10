const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_KEY } = require('../config.js');
const RequestError = require('../errors/request-err.js');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const key = NODE_ENV === 'production' ? JWT_SECRET : JWT_KEY;

  User.findUserByCred(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email })
    .then((newUser) => {
      if (newUser) {
        throw new RequestError('Email уже существует');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        }))
        .then((user) => {
          res.status(201).send(user.omitPrivate());
        });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
  // eslint-disable-next-line consistent-return
    .then((user) => {
      res.status(200).send({ email: user.email, name: user.name });
    }).catch(next);
};
