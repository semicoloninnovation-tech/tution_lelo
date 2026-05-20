CREATE DATABASE IF NOT EXISTS tuitionlelo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tuitionlelo;

CREATE TABLE IF NOT EXISTS members (
  id VARCHAR(32) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  role ENUM('student','teacher') NOT NULL,
  class_name VARCHAR(64) DEFAULT '',
  subject VARCHAR(120) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teacher_auth (
  teacher_id VARCHAR(32) PRIMARY KEY,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_teacher_auth_member FOREIGN KEY (teacher_id) REFERENCES members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attendance (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  attendance_date DATE NOT NULL,
  student_id VARCHAR(32) NOT NULL,
  teacher_id VARCHAR(32) NOT NULL,
  status ENUM('Present','Absent') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_student_id (student_id),
  INDEX idx_teacher_id (teacher_id),
  INDEX idx_attendance_date (attendance_date)
);

CREATE TABLE IF NOT EXISTS tests (
  id VARCHAR(32) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  class_name VARCHAR(64) NOT NULL,
  subject VARCHAR(120) NOT NULL,
  test_date DATE NOT NULL,
  created_by VARCHAR(32) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_by (created_by),
  INDEX idx_test_date (test_date)
);

INSERT IGNORE INTO members (id, name, role, class_name, subject) VALUES
('S-1001', 'Aarav Sharma', 'student', 'Class 8', ''),
('S-1002', 'Sara Khan', 'student', 'Class 10', ''),
('S-1003', 'Vihaan Patel', 'student', 'Class 12', ''),
('T-2001', 'Neha Verma', 'teacher', '', 'Mathematics'),
('T-2002', 'Imran Ali', 'teacher', '', 'Science');

INSERT IGNORE INTO teacher_auth (teacher_id, email, password_hash) VALUES
('T-2001', 'neha@tuitionlelo.com', '$2y$10$2zby2hp3jvcqhfHdvpU6kOm9aiWd1RwnsbyVo9q526UC.XXZcvXKG'),
('T-2002', 'imran@tuitionlelo.com', '$2y$10$2zby2hp3jvcqhfHdvpU6kOm9aiWd1RwnsbyVo9q526UC.XXZcvXKG');

INSERT IGNORE INTO tests (id, title, class_name, subject, test_date, created_by) VALUES
('TS-1', 'Math Revision Test', 'Class 8', 'Mathematics', '2026-05-20', 'T-2001');
