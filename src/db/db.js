let mongoose = require('mongoose');
const User = require('../resources/users/user.model');

const connectToDb = cb => {

    mongoose.connect('mongodb+srv://admin:admin@clusterchelvideo-dorco.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('we\'re connected!');
        db.dropDatabase();
        cb();
    });

}

module.exports = {connectToDb}