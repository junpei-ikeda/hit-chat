const { createPool } = require('mysql2/promise');
const dotenv = require('dotenv');

// .env ファイルを読み込む
dotenv.config();

// 環境変数からDB設定を取得
const pool = createPool({
  host: process.env.DB_HOST || 'host.docker.internal',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'mydatabase',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 0,
});

module.exports = pool;
