const WebSocket = require("ws");

const MAX_MESSAGES_PER_MINUTE = 30;
const MAX_CONNECTIONS = 100; // 最大接続数
const BAN_TIME = 300000; // 5分間 BAN
const clients = new Map(); // IPごとのクライアント情報

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server, path: "/ws/", clientTracking: true });

    console.log("[WebSocket] サーバーが ws://localhost:5000/ws/ で起動しました");

    const handleConnection = (ws, req) => {
        const ip = req.socket.remoteAddress;
        console.log(`[WebSocket] 新規接続: ${ip}`);

        // IPごとの制限チェック
        if (clients.size >= MAX_CONNECTIONS) {
            console.warn(`[警告] 最大接続数を超過: ${ip} は拒否`);
            ws.close(1001, "サーバーが満員です");
            return;
        }

        // BANチェック
        if (clients.has(ip) && clients.get(ip).bannedUntil > Date.now()) {
            console.warn(`[拒否] BAN対象IP: ${ip}`);
            ws.close(1008, "このIPは一時的に接続禁止です");
            return;
        }

        // クライアント情報の初期化
        ws.isAlive = true;
        ws.messageCount = 0;
        ws.bannedUntil = 0;

        if (!clients.has(ip)) {
            clients.set(ip, { count: 0, bannedUntil: 0 });
        }

        ws.on("pong", () => (ws.isAlive = true));

        ws.on("message", (message) => {
            const text = message.toString().trim();
            if (!text) return;

            // メッセージ頻度制限
            const clientData = clients.get(ip);
            clientData.count++;

            if (clientData.count > MAX_MESSAGES_PER_MINUTE) {
                console.warn(`[警告] ${ip} がメッセージ送信制限を超過`);
                ws.send("メッセージ送信が制限されています。しばらくお待ちください。");

                if (clientData.count > MAX_MESSAGES_PER_MINUTE * 2) {
                    console.warn(`[BAN] ${ip} を5分間ブロック`);
                    clientData.bannedUntil = Date.now() + BAN_TIME;
                    ws.close(1008, "異常な送信が検出されたため、接続が制限されました");
                }
                return;
            }

            console.log(`[WebSocket] メッセージ受信 (${ip}): ${text}`);

            // すべてのクライアントに送信
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    try {
                        client.send(text);
                    } catch (error) {
                        console.error(`[WebSocket] メッセージ送信エラー (${ip}):`, error);
                    }
                }
            });
        });

        ws.on("close", () => {
            console.log(`[WebSocket] 切断: ${ip}`);
            clients.delete(ip);
        });

        ws.on("error", (error) => console.error(`[WebSocket] クライアントエラー (${ip}):`, error));
    };

    wss.on("connection", handleConnection);

    // ハートビート & メッセージ制限リセット
    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (!ws.isAlive) {
                console.log("[WebSocket] 応答なしクライアントを切断");
                return ws.terminate();
            }
            ws.isAlive = false;
            ws.ping();
        });

        // IPごとのメッセージカウントリセット
        clients.forEach((client) => (client.count = 0));
    }, 60000);

    wss.on("close", () => {
        console.log("[WebSocket] WebSocketサーバーシャットダウン");
        clearInterval(interval);
    });

    return wss;
};

module.exports = setupWebSocket;
