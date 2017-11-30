var mongoose = require('mongoose')

var Schema = mongoose.Schema
var DiscussionSchema = new Schema({
    post : String,
    poster : String,
})

module.exports = mongoose.model('Discussion', DiscussionSchema)