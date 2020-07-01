const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    password: String,
    balance: Number,
    points: Number,
    rank: Number,
})

module.exports = mongoose.model('user', userSchema, 'users')


