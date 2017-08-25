const db = require('./db-config.js');
const mongoose = require('mongoose');

module.exports = mongoose.model('Visitor', {
    identity: {
      type: String,
      required: true
    },
    image: {
      type: String, 
      required: true
    },
    visits: {
      type: Number,
      required: true,
      default: 1
    }
})
