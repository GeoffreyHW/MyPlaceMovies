var express = require('express')
var router = express.Router()
var Discussion = require('../models/discussions');

router.get('/discussion', isLoggedInAuth, function(req,res){
    Discussion.find(function(err, discussion){
        if(err) res.send(err)
        res.render('discussion',{
            discussion:discussion
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

router.post('/api/discussion', function(req,res){
    var discussion = new Discussion({
        post: req.body.post,
        poster: req.body.user
    })
    discussion.save(function(err,data) {
        if (err) throw err;
    })
    Discussion.find(function(err, discussion){
        if(err) res.send(err)
        res.redirect('/')
    })
    
})

module.exports = router