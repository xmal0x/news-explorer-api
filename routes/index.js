const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const usersRouter = require('./users.js');
const articlesRouter = require('./articles.js');
const { login, createUser } = require('../controllers/users.js');
const auth = require('../middlewares/auth.js');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);

router.use('/', usersRouter);
router.use('/', articlesRouter);

module.exports = router;
