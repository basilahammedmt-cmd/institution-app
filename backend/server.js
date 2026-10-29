const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "database.json");

app.use(cors());
app.use(express.json());

// Helper functions to read and write persistent JSON database
function readDB() {
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ==================== 1. DASHBOARD & FULL DATA SYNC ====================
app.get("/api/dashboard", (req, res) => {
  const db = readDB();
  const totalStudents = db.students.length;
  const totalFeeExpected = db.students.reduce((sum, s) => sum + (s.totalFee - (s.discount || 0)), 0);
  const totalFeeCollected = db.students.reduce((sum, s) => sum + s.paidFee, 0);
  const totalFeePending = totalFeeExpected - totalFeeCollected;
  const pendingStudentsCount = db.students.filter((s) => s.totalFee - (s.discount || 0) - s.paidFee > 0).length;

  res.json({
    academyName: "A PLUS ACCADEMY",
    metrics: {
      totalStudents,
      totalBatches: db.batches.length,
      totalFeeExpected,
      totalFeeCollected,
      totalFeePending,
      pendingStudentsCount,
    },
    ...db,
  });
});

// ==================== 2. STUDENTS & BATCHES ====================
app.get("/api/batches", (req, res) => {
  const db = readDB();
  res.json(db.batches);
});

app.post("/api/batches", (req, res) => {
  const db = readDB();
  const newBatch = {
    id: `B${req.body.grade || "10"}-${Date.now()}`,
    ...req.body,
  };
  db.batches.push(newBatch);
  writeDB(db);
  res.status(201).json(newBatch);
});

app.get("/api/students", (req, res) => {
  const db = readDB();
  res.json(db.students);
});

app.post("/api/students", (req, res) => {
  const db = readDB();
  const batch = db.batches.find((b) => b.id === req.body.batchId) || db.batches[0];
  const newStudent = {
    id: `STU-${100 + db.students.length + 1}`,
    rollNo: req.body.rollNo || `${batch.grade}A-0${db.students.length + 1}`,
    name: req.body.name,
    grade: batch.grade,
    batchId: batch.id,
    batchName: batch.name,
    schoolName: req.body.schoolName || "Govt. HSS Kerala",
    parentName: req.body.parentName || "",
    parentPhone: req.body.parentPhone || "",
    addedBy: req.body.addedBy || "Admin",
    joinedDate: new Date().toISOString().split("T")[0],
    totalFee: Number(req.body.totalFee || 12000),
    paidFee: Number(req.body.paidFee || 0),
    discount: Number(req.body.discount || 0),
    feeHistory: [],
  };
  db.students.unshift(newStudent);
  writeDB(db);
  res.status(201).json(newStudent);
});

app.delete("/api/students/:id", (req, res) => {
  const db = readDB();
  db.students = db.students.filter((s) => s.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ==================== 3. BATCH-WISE ATTENDANCE ====================
app.get("/api/attendance", (req, res) => {
  const db = readDB();
  res.json(db.attendance);
});

app.post("/api/attendance", (req, res) => {
  const db = readDB();
  const record = {
    id: `ATT-${Date.now()}`,
    date: req.body.date || new Date().toISOString().split("T")[0],
    batchId: req.body.batchId,
    batchName: req.body.batchName,
    grade: req.body.grade,
    markedBy: req.body.markedBy,
    records: req.body.records || [],
  };
  db.attendance.unshift(record);
  writeDB(db);
  res.status(201).json(record);
});

// ==================== 4. FACULTIES & CHAPTERS ====================
app.get("/api/faculties", (req, res) => {
  const db = readDB();
  res.json(db.facultyChapters);
});

app.post("/api/faculties", (req, res) => {
  const db = readDB();
  const item = {
    id: `FC-${Date.now()}`,
    lastUpdated: new Date().toISOString().split("T")[0],
    ...req.body,
  };
  db.facultyChapters.unshift(item);
  writeDB(db);
  res.status(201).json(item);
});

// ==================== 5 & 6. EXAMS & AI EXAMINATION REPORTS ====================
app.get("/api/exams", (req, res) => {
  const db = readDB();
  res.json({ exams: db.exams, attempts: db.attempts });
});

app.post("/api/exams", (req, res) => {
  const db = readDB();
  const exam = { id: `EX-${Date.now()}`, ...req.body };
  db.exams.unshift(exam);
  writeDB(db);
  res.status(201).json(exam);
});

app.post("/api/exams/submit", (req, res) => {
  const db = readDB();
  const { examId, studentId, answers } = req.body;
  const exam = db.exams.find((e) => e.id === examId) || db.exams[0];
  const student = db.students.find((s) => s.id === studentId) || db.students[0];

  let score = 0;
  exam.questions.forEach((q, idx) => {
    if (answers && answers[idx] === q.correctAnswerIndex) {
      score += q.marks;
    }
  });

  const percentage = Math.round((score / exam.totalMarks) * 100);
  const attempt = {
    id: `AT-${Date.now()}`,
    examId: exam.id,
    examTitle: exam.title,
    subject: exam.subject,
    studentId: student.id,
    studentName: student.name,
    grade: student.grade,
    date: new Date().toISOString().split("T")[0],
    score,
    totalMarks: exam.totalMarks,
    percentage,
    aiInsight:
      percentage >= 85
        ? "A+ നിലവാരം: മികച്ച പഠന പുരോഗതി!"
        : "കൂടുതൽ റിവിഷനും മോഡൽ പരീക്ഷകളും നൽകുക.",
  };

  db.attempts.unshift(attempt);
  writeDB(db);
  res.status(201).json(attempt);
});

// ==================== 7. YOUTUBE LIVE CLASSES ====================
app.get("/api/live-classes", (req, res) => {
  const db = readDB();
  res.json(db.liveClasses);
});

app.post("/api/live-classes", (req, res) => {
  const db = readDB();
  const live = { id: `LC-${Date.now()}`, isLive: true, ...req.body };
  db.liveClasses.unshift(live);
  writeDB(db);
  res.status(201).json(live);
});

// ==================== 8 & 9. STUDENT FEE & INSTITUTION FEE REPORT ====================
app.post("/api/fees/pay", (req, res) => {
  const db = readDB();
  const { studentId, amount, mode } = req.body;
  const student = db.students.find((s) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const paidAmount = Number(amount || 0);
  student.paidFee += paidAmount;
  const receipt = {
    id: `FH-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    amount: paidAmount,
    mode: mode || "UPI",
    receiptNo: `RCP-${Math.floor(1000 + Math.random() * 9000)}`,
  };
  student.feeHistory = [receipt, ...(student.feeHistory || [])];

  writeDB(db);
  res.json({ student, receipt });
});

app.get("/api/fees/report", (req, res) => {
  const db = readDB();
  const fullyPaid = db.students.filter((s) => s.totalFee - (s.discount || 0) - s.paidFee <= 0);
  const pendingStudents = db.students.filter((s) => s.totalFee - (s.discount || 0) - s.paidFee > 0);
  const totalCollected = db.students.reduce((sum, s) => sum + s.paidFee, 0);
  const totalPending = db.students.reduce(
    (sum, s) => sum + Math.max(0, s.totalFee - (s.discount || 0) - s.paidFee),
    0
  );

  res.json({
    totalStudents: db.students.length,
    fullyPaidCount: fullyPaid.length,
    pendingStudentsCount: pendingStudents.length,
    totalCollected,
    totalPending,
    students: db.students,
  });
});

// ==================== 10 & 11. QUESTION BANK & ACCOUNTS ====================
app.get("/api/question-bank", (req, res) => {
  const db = readDB();
  res.json(db.questionBank);
});

app.post("/api/question-bank", (req, res) => {
  const db = readDB();
  const qb = {
    id: `QB-${Date.now()}`,
    uploadedDate: new Date().toISOString().split("T")[0],
    ...req.body,
  };
  db.questionBank.unshift(qb);
  writeDB(db);
  res.status(201).json(qb);
});

app.get("/api/accounts", (req, res) => {
  const db = readDB();
  res.json(db.accounts || []);
});

app.post("/api/accounts", (req, res) => {
  const db = readDB();
  const entry = {
    id: `ACC-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    ...req.body,
  };
  db.accounts = [entry, ...(db.accounts || [])];
  writeDB(db);
  res.status(201).json(entry);
});

app.listen(PORT, () => {
  console.log(`A PLUS ACCADEMY Backend Server running at http://localhost:${PORT}`);
});
