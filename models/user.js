//establish the schema for a user and properly encrypt password
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var Schema = mongoose.Schema
var UserSchema = new Schema({
	username: String,
    password:String
})

UserSchema.pre('save', function(next) {
    var user = this
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)