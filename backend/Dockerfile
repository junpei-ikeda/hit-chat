# Node.js ベースのイメージを使用
FROM node:20

WORKDIR /app

# 必要な依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nodemon

# アプリケーションコードをコピー
COPY . .

# 3000 番ポートを開放
EXPOSE 5000

# サーバを起動 (API と WebSocket)
CMD ["nodemon", "-L", "src/index.js"]  # ポーリングモードで起動
