const express = require('express');
const { body, param, query } = require('express-validator');
const AttendanceController = require('../controllers/attendanceController');
const BaseRoute = require('./BaseRoute');
const { validateRequest } = require('../middleware/security');

class AttendanceRoutes extends BaseRoute {
  constructor() {
    super(); // BaseRouteのコンストラクタを呼び出す
    
    console.log(typeof AttendanceController)
    this.attendanceController = new AttendanceController();
    this.applyCommonMiddlewares(); // 共通ミドルウェアを適用
    this.initializeRoutes(); // サブクラスのルート設定
  }

  initializeRoutes() {
    // タイムカード一覧取得API
    this.router.get('/attendance_records', this.attendanceController.getAttendances.bind(this.attendanceController));

    // タイムカード詳細取得API（IDとDATEで取得）
    this.router.get('/attendance_records', [
      query('user_id').isInt().withMessage('USER_ID must be an integer'),
      query('date').isDate().withMessage('DATE must be a date format'),
      validateRequest
    ], this.attendanceController.getAttendanceByUserIdAndDate);

    // タイムカード作成API
    this.router.post('/attendance_records', [
      body('user_id').isInt().withMessage('USER_ID must be a date format'),
      body('date_work').isDate().withMessage('DATE must be a date format'),
      body('start_time').isTime().withMessage('CLOCK_IN_TIME must be a time format'),
      body('end_time').isTime().withMessage('CLOCK_OUT_TIME must be a time format'),
      body('status').isInt().withMessage('STATUS must be an integer'),
      validateRequest
    ], this.attendanceController.createAttendanceRecord);

    // タイムカード更新API（IDで更新）
    this.router.put('/attendance_records/:id', [
      param('id').isInt().withMessage('ID must be an integer'),
      body('start_time').isTime().withMessage('CLOCK_IN_TIME must be a time format'),
      body('end_time').isTime().withMessage('CLOCK_OUT_TIME must be a time format'),
      body('status').isInt().withMessage('STATUS must be an integer'),
      validateRequest
    ], this.attendanceController.updateAttendance);

    // タイムカード削除API（IDで削除）
    this.router.delete('/attendance_records/:id', [
      param('id').isInt().withMessage('ID must be an integer'),
      validateRequest
    ], this.attendanceController.deleteAttendance);
  }
}

module.exports = AttendanceRoutes;
