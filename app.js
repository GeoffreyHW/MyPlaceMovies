var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser'); // to read body for POST requests
var exphbs = require('express-handlebars')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var expressValidator = require('express-validator');

//connect to database
mongoose.connect('mongodb://admin:password@ds044667.mlab.com:44667/movieapp', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to databse')
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express()
var session = require('express-session')
 
//view
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())

//static files handling
app.use(express.static(__dirname + '/public'))

//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//passport init
app.use(passport.initialize())
app.use(passport.session())
passport.authenticate('local')
  
app.use(function (req, res, next){
    res.locals.user = req.user || null
    next()
  })

app.use(flash())
app.use('/', routes)
app.use('/users', users)

var port = (process.env.Port||8080)
app.listen(port, function(){
    console.log("listening on " + port)
})