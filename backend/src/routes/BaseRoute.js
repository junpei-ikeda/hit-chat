const express = require('express');
const { authenticateToken, validateRequest, csrfProtection, xss, limiter } = require('../middleware/security');

class BaseRoute {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes(); // サブクラスでルートの設定を行う
  }

  initializeRoutes() {
    throw new Error('initializeRoutes() should be implemented in the subclass');
  }

  // 共通ミドルウェア設定
  applyCommonMiddlewares() {
    this.router.use(xss()); // XSS対策
    this.router.use(limiter); // レート制限
    this.router.use(csrfProtection); // CSRF対策
  }

  getRouter() {
    return this.router;
  }
}

module.exports = BaseRoute;
