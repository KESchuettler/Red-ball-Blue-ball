const mongoose = require('mongoose');

// Connect to database

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoD connection open');
});

module.exports = db;