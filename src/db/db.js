const connectToDb = cb => {

    let mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://admin:JTG8jWJyNZLtgD9@clusterchelvideo-dorco.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('we\'re connected!');
        cb();
    });

}

module.exports = {connectToDb}