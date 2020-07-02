const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    password: String,
    balance: { type: Number, default: '0'},
    points: { type: Number, default: '0'}
})

module.exports = mongoose.model('user', userSchema, 'users')


