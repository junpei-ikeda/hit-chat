const pool = require('../config/db');

/**
 * DB クエリを実行する共通関数
 * @param {string} query SQL クエリ
 * @param {Array} [params=[]] クエリのパラメータ
 * @returns {Promise<Array>} クエリ結果
 */
const executeQuery = async (query, params = []) => {
  let connection = null;
  try {
    connection = await pool.getConnection(); // DB接続を取得
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (error) {
    console.error('Database query failed:', error);
    throw new Error('Database query failed');
  } finally {
    if (connection) connection.release(); // 接続を確実に解放
  }
};

module.exports = { executeQuery };
