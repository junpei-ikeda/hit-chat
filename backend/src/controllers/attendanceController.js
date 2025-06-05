const BaseController = require('./BaseController');
const {
  getrecordsFromDB,
  getAttendanceByUserIdAndDateFromDB,
  createAttendanceInDB,
  updateAttendanceInDB,
  deleteAttendanceFromDB,
} = require('../services/attendance');

class AttendanceController extends BaseController {
  constructor() {
    super(); // 基底クラスのコンストラクタを呼び出す
  }

  // タイムカード一覧取得API
  async getAttendances(req, res) {
    try {
      const records = await getrecordsFromDB();
      console.log(records);
      this.sendSuccess(res, records);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  // 特定のタイムカード詳細情報取得API
  async getAttendanceByUserIdAndDate(req, res) {
    const { user_id, date_work } = req.params; // URLパラメータからidを取得
    try {
      const records = await getAttendanceByUserIdAndDateFromDB(id);
      if (!records) {
        return this.sendError(res, new Error('Attendance records not found'), 404); // タイムカードが見つからない場合
      }
      this.sendSuccess(res, records);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  // タイムカード作成API
  async createAttendanceRecord(req, res) {
    const { user_id, work_date, start_time, end_time, status=1 } = req.body; // リクエストボディから必要な情報を取得
    try {
      const newAttendance = await createAttendanceInDB(user_id, work_date, start_time, end_time, status); // DBに新しいタイムカードを作成
      
      this.sendSuccess(res, newAttendance);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  // タイムカード更新API
  async updateAttendance(req, res) {
    const { id } = req.params; // URLパラメータからidを取得
    const { start_time, end_time, status} = req.body; // リクエストボディから必要な情報を取得
    try {
      const updatedAttendance = await updateAttendanceInDB(id, start_time, end_time, status); // DBでタイムカード情報を更新
      this.sendSuccess(res, updatedAttendance);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  // タイムカード削除API
  async deleteAttendance(req, res) {
    const { id } = req.params; // URLパラメータからidを取得
    try {
      const result = await deleteAttendanceFromDB(id); // DBからタイムカードを削除
      this.sendSuccess(res, result);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

module.exports = AttendanceController;