const express = require("express");
const http = require('http');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // ルーティング
const setupWebSocket = require("./services/websocket"); // WebSocketサービスをインポート

const app = express();
const server = http.createServer(app);

// WebSocket のセットアップ
setupWebSocket(server);

// CORS設定
app.use(cors());
app.use(express.json());

// API ルート
app.get('/', (req, res) => res.send('Welcome to the API'));
app.get("/api/hello", (req, res) => res.json({ message: "Hello from Node.js API!" }));
app.use('/api', userRoutes); // "/api" のパスを設定

server.listen(5000, "0.0.0.0", () => {
    console.log("サーバーが http://localhost:5000 で起動しました");
});
