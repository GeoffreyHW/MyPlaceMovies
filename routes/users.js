var express = require('express')
var router = express.Router()
var User = require('../models/user');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

router.get('/register', function(req,res){
    res.render('register')
})

router.get('/login', function(req,res){
    res.render('login')
})

router.post('/register', function(req,res){
    var uname = req.body.uname
    var pword = req.body.pword
    var same_pass = req.body.same_pass

    req.checkBody('uname', 'Please enter a username').notEmpty()
    req.checkBody('pword', 'Please enter a password').notEmpty()
    req.checkBody('same_pass', 'password is not the same please reenter password').equals(req.body.pword)

    var errors = req.validationErrors()
    if(errors){
        //render form with error information
        res.render('register', {
            errors:errors
        })
    }
    else{
        //no error so save to DB
        var user = new User({
            username: uname,
            password: pword
        })
        user.save(function(err,data) {
            if (err) throw err;
        })
        res.redirect('/users/login')
    }
})

passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({ username: username }, function(err,user){
            console.log(username)
            if(err) throw err;
            if(!user){
                return done(null, false, { message: 'Incorrect username.' })
            }
            if(!user.validPassword(password))
                return done(null, false, {message: 'Invalid password'})  

            return done(null, user)
        
        })
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });



router.post('/login', 
passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/users/login',
    failureFlash : true
}),
function(req, res) {
  res.redirect('/');
});



router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/users/login')
})

module.exports = router