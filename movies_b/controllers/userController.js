const User = require("../models/userModel");

// 로그인 로직
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ success: true, userId: user._id });
    } else {
      res.json({ success: false, message: "아이디 또는 비밀번호가 일치하지 않습니다." });
    }
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({ success: false, message: "서버 오류" });
  }
};

module.exports = { loginUser };