# Stage 1: React アプリのビルド
FROM node:20

WORKDIR /app

# React の依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションコードをコピー
COPY . .

# React アプリをビルド
RUN npm run build
