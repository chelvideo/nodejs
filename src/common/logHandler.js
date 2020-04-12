const reqLogger = (req, res, next) => {
  const { method, url, body, params, query } = req;
  console.log(
    `Request at ${new Date(Date.now())}, url ${url}, method ${
      req.method
    }, params ${JSON.stringify(params)}, query ${JSON.stringify(
      query
    )} body ${JSON.stringify(req.body)}`);

  next();
};

const errLogger = (status, message) => {
  console.log(
    `Error at ${new Date(Date.now())}: status code ${status}, message ${message}`
  );
};

const processLogger = ({ err, warn }) => {
  if (err) {
    console.log('Uncaught exception:', err.message);
    const exit = process.exit;
    exit(1);
  }
  if (warn) {
    console.log('Unhandled rejection:', warn.message);
  }
};

module.exports = { reqLogger, errLogger, processLogger };
