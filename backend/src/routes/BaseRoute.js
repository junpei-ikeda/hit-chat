const express = require('express');
const { csrfProtection, xss, limiter, validateRequest } = require('../middleware/security');
const cookieParser = require('cookie-parser');

class BaseRoute {
  constructor() {
    this.router = express.Router();
  }

  initializeRoutes() {
    throw new Error('initializeRoutes() should be implemented in the subclass');
  }

  // 共通ミドルウェア設定
  applyCommonMiddlewares() {
    this.router.use(xss()); // XSS対策
    this.router.use(limiter); // レート制限
    if (process.env.ENABLE_CSRF === 'true') {
      this.router.use(csrfProtection); // CSRF対策
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = BaseRoute;
