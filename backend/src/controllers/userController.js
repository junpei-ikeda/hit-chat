const BaseController = require('./BaseController');
const {
  getUserByIdFromDB,
  getUsersFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserFromDB
} = require('../services/user');

class UserController extends BaseController {
  constructor() {
    super(); // 基底クラスのコンストラクタを呼び出す
  }

  // ユーザー一覧取得API
  async getUsers(req, res) {
    try {
      const users = await getUsersFromDB();
      this.sendSuccess(res, users);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  // 特定のユーザー詳細情報取得API
  async getUserById(req, res) {
    const { id } = req.params; // URLパラメータからidを取得
    try {
      const user = await getUserByIdFromDB(id);
      if (!user) {
        return this.sendError(res, new Error('User not found'), 404); // ユーザーが見つからない場合
      }
      this.sendSuccess(res, user);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  // ユーザー作成API
  async createUser(req, res) {
    const { name, email, role_id } = req.body; // リクエストボディから必要な情報を取得
    try {
      const newUser = await createUserInDB(name, email, role_id); // DBに新しいユーザーを作成
      this.sendSuccess(res, newUser);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  // ユーザー更新API
  async updateUser(req, res) {
    const { id } = req.params; // URLパラメータからidを取得
    const { name, email, role_id } = req.body; // リクエストボディから必要な情報を取得
    try {
      const updatedUser = await updateUserInDB(id, name, email, role_id); // DBでユーザー情報を更新
      this.sendSuccess(res, updatedUser);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  // ユーザー削除API
  async deleteUser(req, res) {
    const { id } = req.params; // URLパラメータからidを取得
    try {
      const result = await deleteUserFromDB(id); // DBからユーザーを削除
      this.sendSuccess(res, result);
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

module.exports = UserController;
