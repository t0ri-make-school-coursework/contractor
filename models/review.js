// const mongoose = require('mongoose');
//
// const ReviewSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   movieTitle: String
// })
//
// const Review = mongoose.model('Review', ReviewSchema);
// // const Comment = require('./models/comment')
//
// module.exports = Review


const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String,
});

module.exports = Review;
