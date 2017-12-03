var express = require('express')
var router = express.Router()
var Movie = require('../models/movie');

router.get('/', isLoggedInAuth, function(req,res){
    var movies = req.user.movies
    res.render('index',{movies:movies})    
})

router.get('/about', function(req,res){
    res.render('about')
})
    /*req.user.movies.find(function(err, movies){
        if(err) res.send(err)
        res.render('index',{
            movies:movies
        })
    })
})*/

function isLoggedInAuth(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    else{
        res.redirect('/users/login')
    }
}

router.post('/api/movies', isLoggedInAuth, function(req,res){
    var user = req.user
    var movie = {title: req.body.movie, score: req.body.score, thoughts: req.body.thoughts}
    user.movies.push(movie)
    user.save(function(err,data){
        if(err) throw err
        else res.redirect('/')
    })
    /*var movie = new Movie({
        movie: req.body.movie,
        score: req.body.score,
        thoughts: req.body.thoughts
    })
    user.save(()=>{
        res.redirect('/')
    })
    /*movie.save(function(err,data) {
        if (err) throw err;
    })
    Movie.find(function(err, movies){
        if(err) res.send(err)
        res.redirect('/')
    })*/
    
})

module.exports = router