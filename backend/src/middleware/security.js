const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const csrf = require('csurf');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

// CSRFトークン設定
const csrfProtection = csrf({ cookie: true });

// レート制限設定
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 100, // 15分間に100リクエストまで
  message: 'Too many requests, please try again later.',
});

// 認証ミドルウェア
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).send('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

// バリデーションミドルウェア
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { authenticateToken, validateRequest, csrfProtection, xss, limiter };
