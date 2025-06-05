CREATE DATABASE IF NOT EXISTS hit_chat;
USE hit_chat;

-- ロール情報
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- ロールID
  name VARCHAR(50) NOT NULL UNIQUE,  -- ロール名（ユニーク）
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deleted_at TIMESTAMP NULL DEFAULT NULL  -- 論理削除用
);

-- ユーザー情報
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- ユーザーID
  name VARCHAR(100) NOT NULL,  -- ユーザー名
  email VARCHAR(255) NOT NULL UNIQUE,  -- メールアドレス（ユニーク）
  role_id INT NOT NULL,  -- 役職ID（rolesテーブルの参照）
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deleted_at TIMESTAMP NULL DEFAULT NULL,  -- 論理削除用
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE  -- 外部キー制約（rolesテーブル参照）
);

-- 勤怠記録
CREATE TABLE attendance_records (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- 勤怠ID
  user_id INT NOT NULL,  -- ユーザーID（usersテーブルの参照）
  date DATE NOT NULL,  -- 日付
  clock_in_time TIME,  -- 出勤時間
  clock_out_time TIME,  -- 退勤時間
  break_start_time TIME,  -- 休憩開始時間
  break_end_time TIME,  -- 休憩終了時間
  status ENUM('1', '2', '3', '4') DEFAULT '1',  -- 勤怠ステータス（1: 未出勤, 2: 出勤, 3: 休暇, 4: 欠勤）
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deleted_at TIMESTAMP NULL DEFAULT NULL,  -- 論理削除用
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- 外部キー制約（usersテーブル参照）
  INDEX idx_attendance_records (user_id, date)  -- 勤怠データの検索を効率化
);

-- チャットグループ
CREATE TABLE chat_groups (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- チャットグループID
  name VARCHAR(100) NOT NULL,  -- チャットグループ名
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  deleted_at TIMESTAMP NULL DEFAULT NULL,  -- 論理削除用
  INDEX idx_groups (name)  -- 名前で検索しやすくする
);

-- チャットメッセージ
CREATE TABLE chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- メッセージID
  user_id INT NOT NULL,  -- ユーザーID（usersテーブルの参照）
  group_id INT,  -- チャットグループID（chat_groupsテーブルの参照）
  message TEXT NOT NULL,  -- メッセージ内容
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  deleted_at TIMESTAMP NULL DEFAULT NULL,  -- 論理削除用
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- 外部キー制約（usersテーブル参照）
  FOREIGN KEY (group_id) REFERENCES chat_groups(id) ON DELETE SET NULL,  -- 外部キー制約（chat_groupsテーブル参照）
  INDEX idx_chat_messages (user_id, group_id)  -- 検索の効率化
);

-- ワークフロー申請
CREATE TABLE workflow_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- ワークフロー申請ID
  user_id INT NOT NULL,  -- ユーザーID（usersテーブルの参照）
  type ENUM('1', '2', '3') NOT NULL,  -- 申請タイプ（1: 休暇申請, 2: 経費申請, 3: その他）
  status ENUM('1', '2', '3') DEFAULT '1',  -- 申請ステータス（1: 未処理, 2: 承認済み, 3: 却下）
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  deleted_at TIMESTAMP NULL DEFAULT NULL,  -- 論理削除用
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- 外部キー制約（usersテーブル参照）
  INDEX idx_user_id (user_id)  -- ワークフロー申請の検索効率化
);

-- 通知
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- 通知ID
  user_id INT NOT NULL,  -- ユーザーID（usersテーブルの参照）
  message TEXT NOT NULL,  -- 通知メッセージ
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 送信日時
  deleted_at TIMESTAMP NULL DEFAULT NULL,  -- 論理削除用
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- 外部キー制約（usersテーブル参照）
  INDEX idx_user_id (user_id)  -- 通知の検索効率化
);

CREATE TABLE accounting_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year_month VARCHAR(7) NOT NULL,
  total_salary DECIMAL(12,2) DEFAULT 0,
  total_expense DECIMAL(12,2) DEFAULT 0,
  net_income DECIMAL(12,2) AS (total_salary - total_expense) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_year_month (year_month)
);

-- 月次社労士データ
CREATE TABLE labor_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,  -- 社労士データID
  year_month VARCHAR(7) NOT NULL,  -- 年月（YYYY-MM）
  total_work_hours NUMERIC(10,2) DEFAULT 0,  -- 合計労働時間
  overtime_hours NUMERIC(10,2) DEFAULT 0,  -- 残業時間
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  deleted_at TIMESTAMP NULL DEFAULT NULL,  -- 論理削除用
  INDEX idx_year_month (year_month)  -- 月次データの検索効率化
);

INSERT INTO roles (name) VALUES 
('Admin'),
('Editor'),
('Viewer');

-- Insert dummy users
INSERT INTO users (name, email, role_id) VALUES 
('山田太郎', 'yamadatarou@test.com', 1),
('Bob Johnson', 'bob@example.com', 2),
('Charlie Brown', 'charlie@example.com', 3);