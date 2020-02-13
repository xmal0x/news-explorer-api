require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const router = require('./routes/index.js');
const errorsController = require('./middlewares/errorsController.js');
const badRequest = require('./middlewares/badRequest.js');

const { NODE_ENV, MONGO_PATH } = process.env;

const { PORT = 3000 } = process.env;
const MONGO_URL = NODE_ENV === 'production' ? MONGO_PATH : 'mongodb://localhost:27017/news';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(badRequest);

app.use(errors());

app.use(errorsController);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
