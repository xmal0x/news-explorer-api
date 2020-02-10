const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const RequestError = require('../errors/request-err.js');

const validateEmailTemplate = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    match: validateEmailTemplate,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCred = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new RequestError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new RequestError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

userSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
