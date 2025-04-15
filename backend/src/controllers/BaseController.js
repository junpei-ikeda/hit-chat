const winston = require('winston');
const uuid = require('uuid');
const sanitize = require('sanitize-html'); // サニタイズ用ライブラリ
const jwt = require('jsonwebtoken'); // JWTトークン管理
const { check, validationResult } = require('express-validator'); // 入力バリデーション

// Logger 設定
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

// エラーコード定義
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  FORBIDDEN: 'FORBIDDEN',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  CONFLICT_ERROR: 'CONFLICT_ERROR',
};

// HTTPステータスコードに対応するメッセージ
const STATUS_MESSAGES = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error',
};

class BaseController {
  constructor() {
    this.requestId = uuid.v4(); // リクエストIDを生成（トランザクション追跡用）
  }

  // 成功レスポンス
  sendSuccess(res, data, statusCode = 200, metadata = {}) {
    const response = {
      success: true,
      data,
      statusCode,
      message: STATUS_MESSAGES[statusCode] || 'Success',
      timestamp: new Date().toISOString(),
      requestId: this.requestId,
      ...metadata,
    };

    logger.info(`Response sent: [${statusCode}] ${this.requestId}`);
    return res.status(statusCode).json(response);
  }

  // エラーレスポンス
  sendError(res, error, statusCode = 500, customMessage = 'Something went wrong', code = ERROR_CODES.INTERNAL_SERVER_ERROR) {
    // セキュリティ強化: エラーの詳細を公開しない
    if (process.env.NODE_ENV !== 'development') {
      customMessage = 'An error occurred, please try again later.';
    }

    // エラー詳細なログ記録
    logger.error(`Error [${statusCode}] [${code}]: [${this.requestId}] ${error.message || customMessage}`);

    const response = {
      success: false,
      message: customMessage,
      error: this.formatError(error),
      statusCode,
      code,
      timestamp: new Date().toISOString(),
      requestId: this.requestId,
    };

    return res.status(statusCode).json(response);
  }

  // エラーの整形
  formatError(error) {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
    }

    return {
      message: String(error),
    };
  }

  // バリデーションエラーハンドリング
  handleValidationError(res, validationErrors) {
    const errorDetails = validationErrors.array().map(err => ({
      param: err.param,
      message: err.msg,
    }));

    this.sendError(res, new Error('Validation Failed'), 400, 'Validation failed', ERROR_CODES.VALIDATION_ERROR);
  }

  // サニタイズ入力
  sanitizeInput(input) {
    return sanitize(input); // HTMLタグや不正な文字列を除去
  }

  // 認証チェック (JWT)
  authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return this.sendError(res, new Error('Access Denied'), 401, 'Unauthorized Access', ERROR_CODES.UNAUTHORIZED_ACCESS);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return this.sendError(res, new Error('Invalid Token'), 401, 'Invalid or expired token', ERROR_CODES.UNAUTHORIZED_ACCESS);
      }

      req.user = user;
      next();
    });
  }

  // 一時的なリトライ処理（オプション）
  async retryOperation(fn, retries = 3, delay = 1000, backoff = false) {
    let attempts = 0;
    let currentDelay = delay;

    while (attempts < retries) {
      try {
        return await fn();
      } catch (error) {
        attempts++;
        if (attempts < retries) {
          logger.warn(`Retrying operation (attempt ${attempts} of ${retries})`);
          await this.sleep(currentDelay);
          if (backoff) {
            currentDelay *= 2;
          }
        } else {
          logger.error(`Operation failed after ${retries} attempts`);
          throw error;
        }
      }
    }
  }

  // リトライの間の遅延（ミリ秒）
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // メトリクス記録
  logMetrics(metrics) {
    logger.info(`Metrics: ${JSON.stringify(metrics)}`);
  }
}

module.exports = BaseController;
module.exports.ERROR_CODES = ERROR_CODES;
module.exports.STATUS_MESSAGES = STATUS_MESSAGES;
