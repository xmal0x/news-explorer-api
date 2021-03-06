const Article = require('../models/article.js');
const NotFoundError = require('../errors/not-found-err.js');
const ForbiddenError = require('../errors/forbidden-err.js');

module.exports.getArticles = (req, res, next) => {
  const { _id } = req.user;
  Article.find({ owner: _id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send(article.omitPrivate()))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const owner = req.user._id;

  Article.findById(articleId)
    // eslint-disable-next-line consistent-return
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Карточки с таким ID не найдено');
      }
      if (article.owner.toString() === owner) {
        Article.findByIdAndDelete(articleId)
          .then(() => res.status(200).send({ data: articleId }));
      } else {
        throw new ForbiddenError('У вас нет прав для удаления данной статьи');
      }
    }).catch(next);
};
