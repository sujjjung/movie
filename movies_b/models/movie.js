const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: Number,
  genre: [String],
  director: String,
  availableOn: [String],
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;