const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  movieId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  review: String,
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;