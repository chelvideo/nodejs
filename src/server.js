const { PORT } = require('./common/config');
const app = require('./app');
const { processLogger } = require('./common/logHandler');

process.on('uncaughtException', err => {
  processLogger({ err });
});
process.on('unhandledRejection', warn => {
  processLogger({ warn });
});

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
