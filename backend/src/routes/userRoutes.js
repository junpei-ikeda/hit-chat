const express = require('express');
const { body, param } = require('express-validator');
const UserController = require('../controllers/userController');
const BaseRoute = require('./BaseRoute');

class UserRoute extends BaseRoute {
  constructor() {
    super(); // BaseRouteのコンストラクタを呼び出す
    this.userController = new UserController();
    this.applyCommonMiddlewares(); // 共通ミドルウェアを適用
    this.initializeRoutes(); // サブクラスのルート設定
  }

  initializeRoutes() {
    // ユーザー一覧取得API
    this.router.get('/user', this.userController.getUsers);

    // ユーザー詳細取得API（IDで取得）
    this.router.get('/user/:id', [
      param('id').isInt().withMessage('ID must be an integer'),
      validateRequest
    ], this.userController.getUserById);

    // ユーザー作成API
    this.router.post('/user', [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Invalid email address'),
      body('role_id').isInt().withMessage('Role ID must be an integer'),
      validateRequest
    ], this.userController.createUser);

    // ユーザー更新API（IDで更新）
    this.router.put('/user/:id', [
      param('id').isInt().withMessage('ID must be an integer'),
      body('name').optional().notEmpty().withMessage('Name cannot be empty'),
      body('email').optional().isEmail().withMessage('Invalid email address'),
      body('role_id').optional().isInt().withMessage('Role ID must be an integer'),
      validateRequest
    ], this.userController.updateUser);

    // ユーザー削除API（IDで削除）
    this.router.delete('/user/:id', [
      param('id').isInt().withMessage('ID must be an integer'),
      validateRequest
    ], this.userController.deleteUser);
  }
}

module.exports = UserRoute;
