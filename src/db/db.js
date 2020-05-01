let mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const { createUser } = require('../resources/users/user.service');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const connectToDb = cb => {

    mongoose.connect(MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', async () => {
        console.log('MongoDB is connected!');
        await db.dropDatabase();
        await createUser({ name: 'Admin', login: 'admin', password: 'admin' });
        cb();
    });

}

module.exports = {connectToDb}