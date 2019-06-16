
const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
  title: String,
  keysPlayed: Array,
});

const Song = mongoose.model('song', songSchema); 

module.exports = {
  Song
};