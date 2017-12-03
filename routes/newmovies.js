var express = require('express')
var router = express.Router()
var Discussion = require('../models/discussions');

router.get('/', isLoggedInAuth, function(req,res){
    res.render('newmovies')
})

router.post('/coco', isLoggedInAuth, function(req,res){
    var user = req.user
    user.movies.push({title: "Coco", score: "TBD", thoughts: "To watch"})
    user.save(function(err,data){
        if(err) throw err
        else res.redirect('/')
    })
})

router.post('/thor', isLoggedInAuth, function(req,res){
    var user = req.user
    user.movies.push({title: "Thor Ragnarok", score: "TBD", thoughts: "To watch"})
    user.save(function(err,data){
        if(err) throw err
        else res.redirect('/')
    })
})

router.post('/justiceleague', isLoggedInAuth, function(req,res){
    var user = req.user
    user.movies.push({title: "Justice League", score: "TBD", thoughts: "To watch"})
    user.save(function(err,data){
        if(err) throw err
        else res.redirect('/')
    })
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