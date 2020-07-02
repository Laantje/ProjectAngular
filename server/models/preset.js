const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const presetSchema = new Schema({
    username: String,
    skin: { type: Number, default: '0' },
    hair: { type: Number, default: '0' },
    eyes: { type: Number, default: '0' }
})
   
module.exports = mongoose.model('preset', presetSchema, 'presets')
  