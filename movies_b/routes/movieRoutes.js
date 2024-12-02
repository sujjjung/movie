const express = require('express');
const Movie = require('../models/movie'); // 영화 모델
const Review = require('../models/review'); // 리뷰 모델

const router = express.Router();

// 영화 평점 계산 및 상위 5개 영화 반환 API
router.get('/top-rated-movies', async (req, res) => {
  try {
    // 모든 영화 가져오기
    const movies = await Movie.find();

    // 각 영화에 대한 평균 평점 계산
    const movieRatings = await Promise.all(
      movies.map(async (movie) => {
        const reviews = await Review.find({ movieId: movie._id });
        const averageRating = reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0; // 리뷰가 없다면 평점 0으로 설정
        return {
          ...movie.toObject(),
          averageRating, // 평균 평점 추가
        };
      })
    );

    // 평점 기준 내림차순 정렬 후 상위 5개 영화 선택
    const topRatedMovies = movieRatings
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    res.json(topRatedMovies); // 결과 반환
  } catch (error) {
    console.error('영화 평점 계산 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;