const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');  // 회원가입 라우트
const authRoutes = require('./routes/authRoutes');  // 로그인 라우트

const app = express();
const port = 5000;

// CORS 설정 (다른 도메인에서 요청이 올 수 있도록 허용)
app.use(cors());

// Express에서 JSON 데이터를 파싱할 수 있도록 설정
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/movieReviewApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB 연결 성공');
}).catch((error) => {
  console.error('MongoDB 연결 실패:', error);
});

// 영화 관련 API 라우팅
app.use('/api', movieRoutes);

// 사용자 관련 API 라우팅
app.use('/api', userRoutes);  // 회원가입 라우트
app.use('/api', authRoutes);  // 로그인 라우트

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});