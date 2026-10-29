-- A PLUS ACCADEMY (Classes 8, 9 & 10) Database Schema (SQLite / PostgreSQL)

CREATE TABLE IF NOT EXISTS batches (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  grade VARCHAR(10) NOT NULL,
  timing VARCHAR(100),
  hours_per_week VARCHAR(50),
  course_title VARCHAR(255),
  class_teacher VARCHAR(255),
  whatsapp_group_link TEXT
);

CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(50) PRIMARY KEY,
  roll_no VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  grade VARCHAR(10) NOT NULL,
  batch_id VARCHAR(50) REFERENCES batches(id),
  batch_name VARCHAR(255),
  school_name VARCHAR(255),
  parent_name VARCHAR(255),
  parent_phone VARCHAR(30),
  added_by VARCHAR(255) NOT NULL,
  joined_date DATE,
  total_fee DECIMAL(10,2) DEFAULT 0,
  paid_fee DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS fee_payments (
  id VARCHAR(50) PRIMARY KEY,
  student_id VARCHAR(50) REFERENCES students(id) ON DELETE CASCADE,
  payment_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  mode VARCHAR(30) DEFAULT 'UPI',
  receipt_no VARCHAR(50),
  collected_by VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS attendance_records (
  id VARCHAR(50) PRIMARY KEY,
  attendance_date DATE NOT NULL,
  batch_id VARCHAR(50) REFERENCES batches(id),
  batch_name VARCHAR(255),
  grade VARCHAR(10),
  marked_by VARCHAR(255),
  records_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS faculty_chapters (
  id VARCHAR(50) PRIMARY KEY,
  faculty_name VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  grade VARCHAR(10) NOT NULL,
  batch_id VARCHAR(50) REFERENCES batches(id),
  batch_name VARCHAR(255),
  subject VARCHAR(100) NOT NULL,
  chapter_no INT NOT NULL,
  chapter_title VARCHAR(255) NOT NULL,
  total_portions INT DEFAULT 1,
  completed_portions INT DEFAULT 0,
  topics_covered_json TEXT,
  status VARCHAR(50) DEFAULT 'In Progress',
  last_updated DATE
);

CREATE TABLE IF NOT EXISTS exams (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  grade VARCHAR(10) NOT NULL,
  batch_id VARCHAR(50),
  exam_date DATE,
  duration_minutes INT DEFAULT 15,
  total_marks INT DEFAULT 20,
  created_by VARCHAR(255),
  questions_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS exam_attempts (
  id VARCHAR(50) PRIMARY KEY,
  exam_id VARCHAR(50) REFERENCES exams(id),
  exam_title VARCHAR(255),
  subject VARCHAR(100),
  student_id VARCHAR(50) REFERENCES students(id),
  student_name VARCHAR(255),
  grade VARCHAR(10),
  attempt_date DATE,
  score INT NOT NULL,
  total_marks INT NOT NULL,
  percentage INT NOT NULL,
  ai_evaluation TEXT
);

CREATE TABLE IF NOT EXISTS live_classes (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(100),
  grade VARCHAR(10),
  batch_id VARCHAR(50),
  batch_name VARCHAR(255),
  faculty_name VARCHAR(255),
  youtube_url TEXT NOT NULL,
  scheduled_date DATE,
  scheduled_time VARCHAR(50),
  is_live BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS question_bank (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  grade VARCHAR(10) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  chapter VARCHAR(255),
  material_type VARCHAR(100),
  uploaded_by VARCHAR(255),
  uploaded_date DATE,
  questions_list_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts_ledger (
  id VARCHAR(50) PRIMARY KEY,
  entry_date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  entry_type VARCHAR(20) NOT NULL, -- 'Income' or 'Expense'
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(100)
);
