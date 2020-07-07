const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const markerSchema = new Schema({
    username: String,
    latitude: String,
    longitude: String,
    name: String,
    description: String
})
   
module.exports = mongoose.model('marker', markerSchema, 'markers')
  