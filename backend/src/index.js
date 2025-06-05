require('dotenv').config();
const express = require("express");
const http = require('http');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // ルーティング
const AttendanceRoutes = require('./routes/attendanceRoutes'); // ルーティング
const attendanceRoutes = new AttendanceRoutes()
const setupWebSocket = require("./services/websocket"); // WebSocketサービスをインポート
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);

// WebSocket のセットアップ
setupWebSocket(server);

// CORS設定
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Errorrrr' });
});

// API ルート
app.get("/api/hello", (req, res) => res.json({ message: "Hello from Node.js API!" }));
app.use('/ws/api', userRoutes); // "/api" のパスを設定
app.use('/ws', attendanceRoutes.getRouter());

server.listen(5000, "0.0.0.0", () => {
    console.log("サーバーが http://localhost:5000/ws で起動しました");
});
