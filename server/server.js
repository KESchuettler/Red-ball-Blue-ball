// modules ================================================
require('dotenv').config();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var shortId = require('shortid')
const express = require('express');
const app = express();
var Visitors = require('./db/visitor.js');
// CONFIGURATION ===========================================

// configure our server with all the middleware and routing
app.use(morgan('dev'));
app.use(cookieParser('mightyhive'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// app.get('/', (req, res) => res.redirect('/index'));
app.get('/', (req, res) => {
  var { mhData } = req.cookies;
  if( mhData ) { 
    console.log('mhData: ', mhData)
    console.log(mhData.visits++)
    var visits = mhData.visits++;
    console.log(`New Visits: ${visits}`)
    Visitors.findOneAndUpdate(
      { identity: mhData.identity },
      { visits: visits },
      function(err, doc) {
        if(err) console.log(`Error updating exisitng visitor document.\n Error: ${err}`)
        else {
          image = doc.image;
          console.log(`Updated existing visitor document. ${doc}`);
          res.cookie('mhData', doc);
          res.sendFile(path.join(__dirname, '../client/index.html'))
        }
      }
    );
  } else {
    var newId = shortId.generate();
    var rand = Math.random()
    Visitors.create({
      identity: newId,
      image: rand > .5 ? 'red.png' : 'blue.png',
      }, 
      function(err, doc) {
        if(err) console.log(`Error creating new visitor document.\n Error: ${err}`)
        else {
          res.cookie('mhData', doc)
          console.log(`Created new visitor document. ${doc}`);
          res.sendFile(path.join(__dirname, '../client/index.html'));
        }
      }
    )
  } 
});
    
app.get('/report', (req, res) => {
  Visitors.find({}, function(err, docs) {
    if(err) console.log(`Error reporting visitors. Error: ${err}`);
    else {
      res.send(docs)
    }
  });
})
    
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '/../../node_modules')));

// Set up database connection
var db = require('./db/db-config.js');
    
    // Sets the port to either the Process Environment's or 3000.
let port = process.env.PORT || 3000;

// Run the Server and console.log the port
if(!module.parent) {
  app.listen(port);
  console.log('Listening on:', port);
}

module.exports = app;
