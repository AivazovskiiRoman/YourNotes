const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb://localhost/notedb');

let db = mongoose.connection;

// Check connection
db.once('open', function(){
   console.log('Connected to MangoDB'); 
});

// Check for db errors
db.on('error', function(err){
    console.log(err);
})

// Init app
const app = express();

// Bring in models
let Note = require('./models/note');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body parser middleware 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Expess messages middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.');
      var root = namespace.shift();
      var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Home route
app.get('/', function(req, res){
    Note.find({}, function(err, notes){
        if (err){
            console.log(err);
        } else {
            res.render('index', {
                title: 'Notes',
                notes: notes
            });
        }
    });
});

// Route files
let notes = require('./routes/notes');
app.use('/notes', notes);

// Start server
app.listen(3000, function(){
    console.log('Server started on port 3000');
});