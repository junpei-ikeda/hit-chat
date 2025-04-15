const { executeQuery } = require('../utils/dbhelper'); // dbhelperをインポート

// ユーザー一覧取得
const getUsersFromDB = async () => {
  try {
    const users = await executeQuery('SELECT * FROM users');
    return users;
  } catch (error) {
    console.error('Error fetching users from database:', error);
    throw new Error(`Error fetching users from database: ${error.message || 'Unknown error'}`);
  }
};

// ユーザーIDによる詳細取得
const getUserByIdFromDB = async (id) => {
  try {
    const user = await executeQuery('SELECT * FROM users WHERE id = ?', [id]);
    if (!user || user.length === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    return user[0]; // 結果が1件のはずなので、最初の要素を返す
  } catch (error) {
    console.error('Error fetching user by id from database:', error);
    throw new Error(`Error fetching user by id from database: ${error.message || 'Unknown error'}`);
  }
};

// 新しいユーザーの作成
const createUserInDB = async (name, email, role_id) => {
  try {
    const result = await executeQuery(
      'INSERT INTO users (name, email, role_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [name, email, role_id]
    );
    const newUser = {
      id: result.insertId, // 新しく作成されたユーザーのID
      name,
      email,
      role_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return newUser;
  } catch (error) {
    console.error('Error creating user in database:', error);
    throw new Error(`Error creating user in database: ${error.message || 'Unknown error'}`);
  }
};

// ユーザー情報の更新
const updateUserInDB = async (id, name, email, role_id) => {
  try {
    const result = await executeQuery(
      'UPDATE users SET name = ?, email = ?, role_id = ?, updated_at = NOW() WHERE id = ?',
      [name, email, role_id, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    // 更新後のユーザー情報を取得して返す
    const updatedUser = await getUserByIdFromDB(id);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user in database:', error);
    throw new Error(`Error updating user in database: ${error.message || 'Unknown error'}`);
  }
};

// ユーザーの削除
const deleteUserFromDB = async (id) => {
  try {
    const result = await executeQuery('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    return { status: 1, message: `User with id ${id} successfully deleted` };
  } catch (error) {
    console.error('Error deleting user from database:', error);
    throw new Error(`Error deleting user from database: ${error.message || 'Unknown error'}`);
  }
};

module.exports = {
  getUsersFromDB,
  getUserByIdFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserFromDB,
};
