var express = require('express')
var router = express.Router()
var Movie = require('../models/movie');
var mongoose = require('mongoose');
var User = require('./../models/user.js');
require('./../models/user')

router.get('/home', function(req,res){
    res.render('home')
})

router.get('/', isLoggedInAuth, function(req,res){
    var movies = req.user.movies
    res.render('index',{movies:movies})    
})

router.get('/about', function(req,res){
    res.render('about')
})

router.get('/friends', function(req,res){
    var friendMovies = req.user.friendMovies
    res.render('friends', {friendMovies:friendMovies})
})

router.post('/friends/addFriend', isLoggedInAuth, function(req,res){
    var user = req.user
    //console.log(req.body.name)
    User.findOne({username : req.body.name}, function(err, person){
        var uname = person.username
        var obj = {username: uname, movies: []}
        for(var i = 0; i < person.movies.length; i++){
            obj.movies.push(person.movies[i])
        }
        //console.log(obj)
        user.friendMovies.push(obj)
        user.save(function(err,data){
            if(err) throw err
            else res.redirect('/friends')
        })
    })
    //user.movies.push(movie)
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
        res.redirect('/home')
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