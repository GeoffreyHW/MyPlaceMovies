var express = require('express')
var router = express.Router()
var Discussion = require('../models/discussions');

router.get('/', isLoggedInAuth, function(req,res){
        res.render('newmovies')
})

function isLoggedInAuth(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    else{
        res.redirect('/users/login')
    }
}

module.exports = router