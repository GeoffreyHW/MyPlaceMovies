var mongoose = require('mongoose')

var Schema = mongoose.Schema
var MovieSchema = new Schema({
    movie : String,
    score : String,
    thoughts: String
})

module.exports = mongoose.model('Movie', MovieSchema)