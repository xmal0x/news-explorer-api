const NotFoundError = require('../errors/not-found-err.js');

module.exports = () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};
