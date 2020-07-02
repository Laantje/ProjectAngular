const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    username: String,
    itemid: Number
})

module.exports = mongoose.model('item', itemSchema, 'items')


