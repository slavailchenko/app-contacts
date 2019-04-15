const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const contactsRouter = require('./routes/contacts.route');

const config = require('./config/app.config');
const log = require('./services/log.service')(module);
const ServerError = require('./libs/errors');
const mongoose = require('./libs/mongoose');

let app;

mongoose.connect().then(()=> new Promise ((res, rej) => {

  app = express ();
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:500}));
  app.use(cors());
  app.use(expressValidator());

  app.use('/api/v1/contacts', contactsRouter);

  app.use(ServerError.handle404Error);
  app.use(ServerError.errorLogger);
  app.use(ServerError.errorHandler);

  app.listen(config.server.port, config.server.host, err => {
    if (err) {
      log.error(`Server creation error: ${err}`);
      return;
    }
    log.info(`server started on ${config.server.host}:${config.server.port}`);
  });
  res();
})
)
.catch((err) => log.error(err.message));