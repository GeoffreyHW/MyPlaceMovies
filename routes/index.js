var express = require('express')
var router = express.Router()
var Movie = require('../models/movie');


router.get('/', isLoggedInAuth, function(req,res){
    Movie.find(function(err, movies){
        if(err) res.send(err)
        res.render('index',{
            movies:movies
        })
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

router.post('/api/movies', function(req,res){
    var movie = new Movie({
        movie: req.body.movie,
        score: req.body.score,
        thoughts: req.body.thoughts
    })
    movie.save(function(err,data) {
        if (err) throw err;
    })
    Movie.find(function(err, movies){
        if(err) res.send(err)
        res.redirect('/')
    })
    
})

module.exports = router