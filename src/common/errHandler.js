const { errLogger } = require('./logHandler');

const errHandler = (err, req, res, next) => {
  let status;
  let message;
  if (err.status === undefined) {
    status = 500;
    message = 'Something broke!';
  } else {
    status = err.status;
    message = err.message;
  }

  errLogger(status, message);
  res.status(status).send(message);
};

module.exports = errHandler;
