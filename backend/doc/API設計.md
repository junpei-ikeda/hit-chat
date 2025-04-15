# API設計書

このドキュメントは、システムのAPI設計について説明します。使用されるデータベースのテーブル設計に基づき、エンドポイントの仕様を定義します。

## 目次

1. [ユーザー情報 API](#ユーザー情報-api)
2. [勤怠記録 API](#勤怠記録-api)
3. [チャットグループ API](#チャットグループ-api)
4. [チャットメッセージ API](#チャットメッセージ-api)
5. [ワークフロー申請 API](#ワークフロー申請-api)
6. [通知 API](#通知-api)
7. [月次経理データ API](#月次経理データ-api)
8. [月次社労士データ API](#月次社労士データ-api)

---

## ユーザー情報 API

### 1.1 GET /users

- 説明: ユーザー情報のリストを取得します。
- レスポンス: json
  [
    {
      "id": 1,
      "name": "山田太郎",
      "email": "taro@example.com",
      "role": 0,
      "created_at": "2025-04-06T12:00:00Z",
      "updated_at": "2025-04-06T12:00:00Z"
    }
  ]

  1.2 GET /users/{id}
  説明: 特定のユーザーの詳細情報を取得します。

  パラメータ:
  id: ユーザーID（整数）

  レスポンス: json
  {
    "id": 1,
    "name": "山田太郎",
    "email": "taro@example.com",
    "role": 0,
    "created_at": "2025-04-06T12:00:00Z",
    "updated_at": "2025-04-06T12:00:00Z"
  }

  1.3 POST /users
  説明: 新しいユーザーを作成します。

  リクエストボディ:
  {
    "name": "鈴木一郎",
    "email": "ichiro@example.com",
    "role": 0
  }
  レスポンス: json
  {
    "id": 3,
    "name": "鈴木一郎",
    "email": "ichiro@example.com",
    "role": 0,
    "created_at": "2025-04-06T13:00:00Z",
    "updated_at": "2025-04-06T13:00:00Z"
  }

勤怠記録 API
2.1 GET /attendance_records
説明: 勤怠記録のリストを取得します。

クエリパラメータ:
user_id: ユーザーID（整数）
date: 日付（YYYY-MM-DD形式）

レスポンス: json
[
  {
    "id": 1,
    "user_id": 1,
    "date": "2025-04-06",
    "clock_in_time": "09:00:00",
    "clock_out_time": "18:00:00",
    "status": 1,
    "created_at": "2025-04-06T12:00:00Z",
    "updated_at": "2025-04-06T12:00:00Z"
  }
]

2.2 POST /attendance_records
説明: 新しい勤怠記録を作成します。

リクエストボディ: json
{
  "user_id": 1,
  "date": "2025-04-06",
  "clock_in_time": "09:00:00",
  "clock_out_time": "18:00:00",
  "status": 1
}
レスポンス: json
{
  "id": 2,
  "user_id": 1,
  "date": "2025-04-06",
  "clock_in_time": "09:00:00",
  "clock_out_time": "18:00:00",
  "status": 1,
  "created_at": "2025-04-06T13:00:00Z",
  "updated_at": "2025-04-06T13:00:00Z"
}

2.3 PUT /attendance_records/{id}
説明: 特定の勤怠記録を更新します。

パラメータ:
id: 勤怠記録ID（整数）

リクエストボディ:
{
  "clock_in_time": "08:30:00",
  "clock_out_time": "17:30:00",
  "status": 2
}

レスポンス: json
{
  "id": 1,
  "user_id": 1,
  "date": "2025-04-06",
  "clock_in_time": "08:30:00",
  "clock_out_time": "17:30:00",
  "status": 2,
  "created_at": "2025-04-06T12:00:00Z",
  "updated_at": "2025-04-06T13:00:00Z"
}

チャットグループ API
3.1 GET /chat_groups
説明: チャットグループのリストを取得します。

レスポンス: json
[
  {
    "id": 1,
    "name": "開発チーム",
    "created_at": "2025-04-06T12:00:00Z"
  }
]

3.2 POST /chat_groups
説明: 新しいチャットグループを作成します。

リクエストボディ: json
{
  "name": "マーケティングチーム"
}

レスポンス: json
{
  "id": 2,
  "name": "マーケティングチーム",
  "created_at": "2025-04-06T13:00:00Z"
}

チャットメッセージ API
4.1 GET /chat_messages
説明: チャットメッセージを取得します。

クエリパラメータ:
group_id: チャットグループID（整数）

レスポンス: json
[
  {
    "id": 1,
    "user_id": 1,
    "group_id": 1,
    "message": "お疲れ様です。",
    "created_at": "2025-04-06T12:00:00Z"
  }
]

4.2 POST /chat_messages
説明: 新しいチャットメッセージを送信します。

リクエストボディ: json
{
  "user_id": 1,
  "group_id": 1,
  "message": "お疲れ様です。"
}
レスポンス: json
{
  "id": 2,
  "user_id": 1,
  "group_id": 1,
  "message": "お疲れ様です。",
  "created_at": "2025-04-06T13:00:00Z"
}

ワークフロー申請 API
5.1 GET /workflow_requests
説明: ワークフロー申請のリストを取得します。

クエリパラメータ:
user_id: ユーザーID（整数）

レスポンス: json
[
  {
    "id": 1,
    "user_id": 1,
    "type": 0,
    "status": 1,
    "created_at": "2025-04-06T12:00:00Z"
  }
]

5.2 POST /workflow_requests
説明: 新しいワークフロー申請を作成します。

リクエストボディ: json
{
  "user_id": 1,
  "type": 1,
  "status": 0
}
レスポンス: json
{
  "id": 2,
  "user_id": 1,
  "type": 1,
  "status": 0,
  "created_at": "2025-04-06T13:00:00Z"
}

通知 API
6.1 GET /notifications
説明: 通知のリストを取得します。

クエリパラメータ:
user_id: ユーザーID（整数）

レスポンス: json
[
  {
    "id": 1,
    "user_id": 1,
    "message": "勤怠記録が提出されました。",
    "sent_at": "2025-04-06T12:00:00Z"
  }
]

6.2 POST /notifications
説明: 新しい通知を作成します。

リクエストボディ: json
{
  "user_id": 1,
  "message": "勤怠記録が提出されました。"
}

レスポンス: json
{
  "id": 2,
  "user_id": 1,
  "message": "勤怠記録が提出されました。",
  "sent_at": "2025-04-06T13:00:00Z"
}

月次経理データ API
7.1 GET /accounting_reports
説明: 月次経理データのリストを取得します。

レスポンス: json
[
  {
    "id": 1,
    "year_month": "2025-04",
    "total_salary": 500000,
    "total_expense": 200000,
    "created_at": "2025-04-06T12:00:00Z"
  }
]

月次経理データ API
7.1 GET /accounting_reports
説明: 月次経理データのリストを取得します。

レスポンス: json
[
  {
    "id": 1,
    "year_month": "2025-04",
    "total_salary": 500000,
    "total_expense": 200000,
    "created_at": "2025-04-06T12:00:00Z"
  }
]

月次社労士データ API
8.1 GET /labor_reports
説明: 月次社労士データのリストを取得します。

レスポンス: json
[
  {
    "id": 1,
    "year_month": "2025-04",
    "total_work_hours": 160,
    "overtime_hours": 20,
    "created_at": "2025-04-06T12:00:00Z"
  }
]

8.2 POST /labor_reports
説明: 新しい月次社労士データを作成します。

リクエストボディ: json
{
  "year_month": "2025-04",
  "total_work_hours": 160,
  "overtime_hours": 20
}

レスポンス: json
{
  "id": 2,
  "year_month": "2025-04",
  "total_work_hours": 160,
  "overtime_hours": 20,
  "created_at": "2025-04-06T13:00:00Z"
}
