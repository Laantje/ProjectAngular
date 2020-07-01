const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const presetSchema = new Schema({
    skin: Number,
    hair: Number,
    eyes: Number,
})
   
module.exports = mongoose.model('preset', presetSchema, 'presets')
  