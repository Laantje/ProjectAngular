const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const markerSchema = new Schema({
    latitude: Number,
    longitude: Number,
    name: String,
    description: String
})
   
module.exports = mongoose.model('marker', markerSchema, 'markers')
  