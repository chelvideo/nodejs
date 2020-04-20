const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDb } = require('./db/db');
const { processLogger } = require('./common/logHandler');



process.on('uncaughtException', err => {
  processLogger({ err });
});
process.on('unhandledRejection', warn => {
  processLogger({ warn });
});

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

connectToDb(()=> {
    app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

