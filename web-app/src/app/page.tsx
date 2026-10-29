"use client";

import React, { useState, useMemo } from "react";
import {
  INITIAL_BATCHES,
  INITIAL_STUDENTS,
  INITIAL_ATTENDANCE,
  INITIAL_FACULTY_CHAPTERS,
  INITIAL_EXAMS,
  INITIAL_ATTEMPTS,
  INITIAL_LIVE_CLASSES,
  INITIAL_QUESTION_BANK,
  Batch,
  Student,
  AttendanceRecord,
  FacultyChapter,
  Exam,
  ExamAttempt,
  LiveClass,
  QuestionBankItem,
} from "@/lib/store";

/* ==================== PROFESSIONAL MULTI-TONE VECTOR ICONS ==================== */
const AcademyLogoSVG = () => (
  <svg width="78" height="68" viewBox="0 0 90 80" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="logoBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1e40af" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    <path d="M42 10 L18 66 H29 L42 32 L54 62 H64 L42 10 Z" fill="url(#logoBlue)" />
    <path d="M12 67 C32 54, 58 46, 80 42 C56 54, 34 62, 12 67 Z" fill="#1e3a8a" />
    <path d="M22 52 C40 44, 60 39, 76 36 C58 44, 38 49, 22 52 Z" fill="#0284c7" />
    <path d="M62 12 V28 M54 20 H70" stroke="#dc2626" strokeWidth="3.8" strokeLinecap="round" />
    <path d="M58 16 L66 24 M66 16 L58 24" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconDashboard = () => (
  <svg width="92" height="76" viewBox="0 0 92 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="dashGrad" x1="8" y1="10" x2="84" y2="66" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e40af" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    <rect x="8" y="10" width="76" height="56" rx="8" fill="url(#dashGrad)" stroke="#1e3a8a" strokeWidth="2" />
    <rect x="13" y="22" width="66" height="39" rx="4" fill="#f8fafc" />
    <circle cx="17" cy="16" r="2.2" fill="#f87171" />
    <circle cx="24" cy="16" r="2.2" fill="#fbbf24" />
    <circle cx="31" cy="16" r="2.2" fill="#34d399" />
    <rect x="18" y="27" width="16" height="12" rx="2.5" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.2" />
    <rect x="38" y="27" width="16" height="12" rx="2.5" fill="#d1fae5" stroke="#10b981" strokeWidth="1.2" />
    <rect x="58" y="27" width="16" height="12" rx="2.5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
    <rect x="20" y="49" width="7" height="8" rx="1.5" fill="#3b82f6" />
    <rect x="31" y="45" width="7" height="12" rx="1.5" fill="#0284c7" />
    <rect x="42" y="42" width="7" height="15" rx="1.5" fill="#10b981" />
    <rect x="53" y="46" width="7" height="11" rx="1.5" fill="#6366f1" />
    <path d="M22 46 L34 42 L45 39 L68 35" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconStudents = () => (
  <svg width="96" height="76" viewBox="0 0 96 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="stuBlue" x1="0" y1="12" x2="0" y2="66" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
      <linearGradient id="stuTeal" x1="0" y1="12" x2="0" y2="66" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0d9488" />
        <stop offset="100%" stopColor="#115e59" />
      </linearGradient>
    </defs>
    {[
      { cx: 19, grad: "url(#stuBlue)", stroke: "#1e3a8a", tie: "#fbbf24" },
      { cx: 38, grad: "url(#stuTeal)", stroke: "#134e4a", tie: "#38bdf8" },
      { cx: 57, grad: "url(#stuBlue)", stroke: "#1e3a8a", tie: "#fbbf24" },
      { cx: 76, grad: "url(#stuTeal)", stroke: "#134e4a", tie: "#38bdf8" },
    ].map((item, idx) => (
      <g key={idx}>
        <circle cx={item.cx} cy="19" r="6.8" fill={item.grad} stroke={item.stroke} strokeWidth="1.6" />
        <path
          d={`M${item.cx - 8.5} 32 C${item.cx - 8.5} 27.5, ${item.cx + 8.5} 27.5, ${item.cx + 8.5} 32 L${item.cx + 9.5} 49 H${item.cx + 5} L${item.cx + 4} 65 H${item.cx - 4} L${item.cx - 5} 49 H${item.cx - 9.5} Z`}
          fill={item.grad}
          stroke={item.stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <polygon points={`${item.cx - 2.5},30 ${item.cx + 2.5},30 ${item.cx},37`} fill={item.tie} />
      </g>
    ))}
  </svg>
);

const IconAttendance = () => (
  <svg width="88" height="76" viewBox="0 0 88 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="calHeader" x1="14" y1="14" x2="74" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>
    <rect x="14" y="15" width="60" height="50" rx="7" fill="#ffffff" stroke="#0f766e" strokeWidth="2.2" />
    <path d="M14 22 C14 18, 17 15, 21 15 H67 C71 15, 74 18, 74 22 V28 H14 V22 Z" fill="url(#calHeader)" />
    <rect x="25" y="9" width="7" height="12" rx="3.5" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
    <rect x="56" y="9" width="7" height="12" rx="3.5" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
    {[33, 43, 53].map((y, r) =>
      [20, 37, 54].map((x, c) => {
        const isChecked = (r === 0 && c === 0) || (r === 1 && c === 1) || (r === 2 && c === 2);
        return (
          <rect
            key={`${r}-${c}`}
            x={x}
            y={y}
            width="13"
            height="7"
            rx="2"
            fill={isChecked ? "#10b981" : "#e2e8f0"}
            stroke={isChecked ? "#047857" : "#94a3b8"}
            strokeWidth="1.2"
          />
        );
      })
    )}
  </svg>
);

const IconFaculties = () => (
  <svg width="102" height="76" viewBox="0 0 102 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="profGrad" x1="12" y1="16" x2="38" y2="65" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <rect x="35" y="9" width="54" height="35" rx="4" fill="#f8fafc" stroke="#1e40af" strokeWidth="3.5" />
    <line x1="43" y1="18" x2="68" y2="18" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="43" y1="25" x2="78" y2="25" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="43" y1="32" x2="62" y2="32" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="21" r="6.5" fill="url(#profGrad)" stroke="#1e1b4b" strokeWidth="1.5" />
    <path
      d="M14 34 C14 29, 34 29, 34 34 L39 45 L33 48 L29 40 V65 H19 V42 L15 50 L11 47 Z"
      fill="url(#profGrad)"
      stroke="#1e1b4b"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <line x1="36" y1="44" x2="57" y2="22" stroke="#d97706" strokeWidth="2.8" strokeLinecap="round" />
    {[49, 65, 81].map((cx, i) => (
      <g key={i}>
        <circle cx={cx} cy="53" r="4.2" fill="#0284c7" />
        <path d={`M${cx - 6.5} 63 C${cx - 6.5} 57.5, ${cx + 6.5} 57.5, ${cx + 6.5} 63 Z`} fill="#0369a1" />
      </g>
    ))}
    <line x1="40" y1="65" x2="90" y2="65" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const IconExam = () => (
  <svg width="96" height="76" viewBox="0 0 96 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="examCover" x1="12" y1="14" x2="84" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="examBookmark" x1="24" y1="12" x2="46" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    <rect x="12" y="15" width="72" height="49" rx="5" fill="url(#examCover)" stroke="#1e3a8a" strokeWidth="2" />
    <path d="M18 12 H48 V56 H18 Z" fill="#ffffff" stroke="#1e3a8a" strokeWidth="1.8" />
    <path d="M48 12 H78 V56 H48 Z" fill="#f8fafc" stroke="#1e3a8a" strokeWidth="1.8" />
    <rect x="24" y="12" width="24" height="44" fill="url(#examBookmark)" stroke="#1e3a8a" strokeWidth="1.6" />
    <circle cx="36" cy="34" r="6.5" fill="#fef3c7" />
    <line x1="54" y1="23" x2="71" y2="23" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="54" y1="31" x2="71" y2="31" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="54" y1="39" x2="65" y2="39" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const IconExamReport = () => (
  <svg width="100" height="76" viewBox="0 0 100 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="repArrow" x1="18" y1="64" x2="84" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    {[24, 42, 60].map((cx, i) => (
      <g key={i}>
        <circle cx={cx} cy="18" r="5.8" fill={i === 1 ? "#0284c7" : "#1e40af"} stroke="#ffffff" strokeWidth="1.2" />
        <path
          d={`M${cx - 8} 30 C${cx - 8} 25, ${cx + 8} 25, ${cx + 8} 30 V48 H${cx - 8} Z`}
          fill={i === 1 ? "#0284c7" : "#1e40af"}
          stroke="#ffffff"
          strokeWidth="1.2"
        />
      </g>
    ))}
    <path d="M18 64 L40 42 L54 54 L82 26" stroke="url(#repArrow)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M68 25 H83 V40" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLiveClasses = () => (
  <svg width="92" height="76" viewBox="0 0 92 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="liveScreen" x1="18" y1="15" x2="74" y2="53" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="playRed" x1="38" y1="24" x2="56" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <rect x="14" y="10" width="64" height="5" rx="2.5" fill="#1e40af" />
    <line x1="46" y1="5" x2="46" y2="10" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" />
    <rect x="18" y="15" width="56" height="38" rx="4" fill="url(#liveScreen)" stroke="#1e40af" strokeWidth="2" />
    <rect x="23" y="20" width="46" height="28" rx="2.5" fill="#f8fafc" />
    <rect x="35" y="25" width="22" height="17" rx="4.5" fill="url(#playRed)" />
    <polygon points="43,29 43,38 51,33.5" fill="#ffffff" />
    <line x1="46" y1="53" x2="46" y2="68" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    <line x1="46" y1="56" x2="28" y2="68" stroke="#1e40af" strokeWidth="4" strokeLinecap="round" />
    <line x1="46" y1="56" x2="64" y2="68" stroke="#1e40af" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const IconStudentFee = () => (
  <svg width="88" height="76" viewBox="0 0 88 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="gradStuFee" x1="24" y1="12" x2="64" y2="66" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    <polygon points="44,8 27,15 44,21 61,15" fill="#1e293b" />
    <line x1="58" y1="16" x2="61" y2="24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    <circle cx="44" cy="25" r="10.5" fill="url(#gradStuFee)" stroke="#1e3a8a" strokeWidth="1.8" />
    <path d="M24 64 C24 46, 64 46, 64 64 Z" fill="url(#gradStuFee)" stroke="#1e3a8a" strokeWidth="2" />
    <path d="M32 50 L44 54 L56 50 V63 L44 67 L32 63 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
    <line x1="44" y1="54" x2="44" y2="67" stroke="#d97706" strokeWidth="1.8" />
  </svg>
);

const IconFeeReport = () => (
  <svg width="88" height="76" viewBox="0 0 88 76" fill="none" className="drop-shadow-md">
    <polyline points="18,12 18,64 74,64" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="25" y="42" width="9" height="20" rx="2" fill="#38bdf8" />
    <rect x="38" y="29" width="9" height="33" rx="2" fill="#0284c7" />
    <rect x="51" y="17" width="9" height="45" rx="2" fill="#10b981" />
    <rect x="64" y="33" width="9" height="29" rx="2" fill="#f59e0b" />
  </svg>
);

const IconCommunication = () => (
  <svg width="92" height="76" viewBox="0 0 92 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="planeGrad" x1="14" y1="14" x2="76" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <polygon points="14,38 76,14 54,64 42,46" fill="url(#planeGrad)" stroke="#1e3a8a" strokeWidth="2" strokeLinejoin="round" />
    <polygon points="42,46 76,14 34,42" fill="#e0f2fe" stroke="#1e3a8a" strokeWidth="1.6" strokeLinejoin="round" />
    <polygon points="34,42 42,46 38,58" fill="#0369a1" stroke="#1e3a8a" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const IconQuestionBank = () => (
  <svg width="96" height="76" viewBox="0 0 96 76" fill="none" className="drop-shadow-md">
    {[
      { y: 44, fill: "#059669", stroke: "#064e3b" },
      { y: 31, fill: "#0284c7", stroke: "#1e3a8a" },
      { y: 18, fill: "#d97706", stroke: "#78350f" },
    ].map((book, idx) => (
      <g key={idx}>
        <polygon
          points={`20,${book.y} 52,${book.y - 10} 76,${book.y} 44,${book.y + 10}`}
          fill={book.fill}
          stroke={book.stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <polygon
          points={`20,${book.y} 44,${book.y + 10} 76,${book.y} 76,${book.y + 8} 44,${book.y + 18} 20,${book.y + 8}`}
          fill="#ffffff"
          stroke={book.stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <line x1="44" y1={book.y + 10} x2="44" y2={book.y + 18} stroke={book.stroke} strokeWidth="1.8" />
      </g>
    ))}
  </svg>
);

const IconAccounts = () => (
  <svg width="96" height="76" viewBox="0 0 96 76" fill="none" className="drop-shadow-md">
    <defs>
      <linearGradient id="cashGrad" x1="14" y1="28" x2="82" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <path d="M22 28 L64 12 L70 28 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="1.8" />
    <path d="M26 28 L72 18 L74 28 Z" fill="#10b981" stroke="#065f46" strokeWidth="1.8" />
    <rect x="14" y="28" width="68" height="36" rx="5" fill="url(#cashGrad)" stroke="#064e3b" strokeWidth="2" />
    <rect x="19" y="33" width="58" height="26" rx="3" fill="#ecfdf5" stroke="#047857" strokeWidth="1.5" />
    <circle cx="48" cy="46" r="8" fill="#fbbf24" stroke="#b45309" strokeWidth="1.6" />
    <circle cx="28" cy="46" r="3" fill="#059669" />
    <circle cx="68" cy="46" r="3" fill="#059669" />
  </svg>
);

export default function APlusAcademyPortal() {
  // Default to "dashboard" in the School Management Software layout
  const [activeView, setActiveView] = useState<string>("dashboard");

  const [batches] = useState<Batch[]>(INITIAL_BATCHES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [facultyChapters] = useState<FacultyChapter[]>(INITIAL_FACULTY_CHAPTERS);
  const [exams] = useState<Exam[]>(INITIAL_EXAMS);
  const [attempts, setAttempts] = useState<ExamAttempt[]>(INITIAL_ATTEMPTS);
  const [liveClasses] = useState<LiveClass[]>(INITIAL_LIVE_CLASSES);
  const [questionBank] = useState<QuestionBankItem[]>(INITIAL_QUESTION_BANK);

  // Student Form & Edit State
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNo: "",
    batchId: "B10-A",
    schoolName: "Govt. HSS",
    parentName: "",
    parentPhone: "91",
    addedBy: "അനിൽ കുമാർ മാസ്റ്റർ (Teacher)",
    totalFee: 12000,
    paidFee: 2000,
    discount: 0,
  });

  // Attendance
  const [selectedAttBatchId, setSelectedAttBatchId] = useState("B10-A");
  const [selectedAttDate, setSelectedAttDate] = useState("2026-10-21");
  const [draftAttendance, setDraftAttendance] = useState<Record<string, "Present" | "Absent" | "Late">>({});

  // Exam & Reports
  const [selectedStudentForExam, setSelectedStudentForExam] = useState("STU-101");
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState<ExamAttempt | null>(null);
  const [reportStudentId, setReportStudentId] = useState("STU-101");

  // Fee
  const [selectedFeeStudentId, setSelectedFeeStudentId] = useState("STU-102");
  const [feePaymentAmount, setFeePaymentAmount] = useState(2000);

  const metrics = useMemo(() => {
    const totalStudents = students.length;
    const class8Count = students.filter((s) => s.grade === "8").length;
    const class9Count = students.filter((s) => s.grade === "9").length;
    const class10Count = students.filter((s) => s.grade === "10").length;
    const totalFeeExpected = students.reduce((acc, s) => acc + (s.totalFee - s.discount), 0);
    const totalFeeCollected = students.reduce((acc, s) => acc + s.paidFee, 0);
    const totalFeePending = totalFeeExpected - totalFeeCollected;
    const fullyPaidStudents = students.filter((s) => s.totalFee - s.discount - s.paidFee <= 0);
    const studentsWithBalance = students.filter((s) => s.totalFee - s.discount - s.paidFee > 0);
    return {
      totalStudents,
      class8Count,
      class9Count,
      class10Count,
      totalFeeExpected,
      totalFeeCollected,
      totalFeePending,
      fullyPaidStudents,
      studentsWithBalance,
      avgAttendance: 94,
    };
  }, [students]);

  const topRowIcons = [
    { id: "dashboard", label: "DASH BOARD", Component: IconDashboard },
    { id: "students", label: "STUDENTS", Component: IconStudents },
    { id: "attendance", label: "ATTENDENCE", Component: IconAttendance },
    { id: "faculties", label: "FACULTIES &\nCHAPTER", Component: IconFaculties },
    { id: "exam", label: "EXAM", Component: IconExam },
    { id: "exam_report", label: "EXAMINATION\nREPORT", Component: IconExamReport },
    { id: "live_class", label: "LIVE CLASSES", Component: IconLiveClasses },
  ];

  const bottomRowIcons = [
    { id: "student_fee", label: "STUDENT FEE", Component: IconStudentFee },
    { id: "fee_report", label: "FEE REPORT", Component: IconFeeReport },
    { id: "communication", label: "COMMUNICATION", Component: IconCommunication },
    { id: "question_bank", label: "NOTES & QUESTION\nBANK", Component: IconQuestionBank },
    { id: "accounts", label: "ACCOUNTS", Component: IconAccounts },
  ];

  const leftSideButtons = [
    {
      id: "courses",
      label: "COURSES",
      bgLight: "#dbeafe",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      id: "schedule",
      label: "SCHEDULE",
      bgLight: "#ccfbf1",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: "classes",
      label: "CLASSES",
      bgLight: "#e0f2fe",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "hours",
      label: "HOURS",
      bgLight: "#fef3c7",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "materials",
      label: "MATERIALS",
      bgLight: "#d1fae5",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
  ];

  const handleStartEditStudent = (stu: Student) => {
    setEditingStudentId(stu.id);
    setNewStudent({
      name: stu.name,
      rollNo: stu.rollNo,
      batchId: stu.batchId,
      schoolName: stu.schoolName,
      parentName: stu.parentName,
      parentPhone: stu.parentPhone,
      addedBy: stu.addedBy,
      totalFee: stu.totalFee,
      paidFee: stu.paidFee,
      discount: stu.discount || 0,
    });
    setActiveView("students");
  };

  const handleDownloadStudentPDF = (stu: Student) => {
    const bal = stu.totalFee - (stu.discount || 0) - stu.paidFee;
    const w = window.open("", "_blank", "width=850,height=950");
    if (!w) return;
    w.document.write(`
      <html>
        <head>
          <title>${stu.name} - Student Report PDF</title>
          <style>
            body { font-family: sans-serif; padding: 32px; color: #0f172a; }
            h1 { color: #195685; margin-bottom: 4px; }
            .card { border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px; margin-top: 16px; }
          </style>
        </head>
        <body>
          <h1>A PLUS ACCADEMY — STUDENT REPORT CARD & FEE STATEMENT</h1>
          <p><b>പേര് (Name):</b> ${stu.name} | <b>Roll No:</b> ${stu.rollNo} | <b>Batch:</b> ${stu.batchName}</p>
          <p><b>സ്കൂൾ:</b> ${stu.schoolName} | <b>രക്ഷിതാവ്:</b> ${stu.parentName} (${stu.parentPhone})</p>
          <p><b>ചേർത്തത് (Added By):</b> ${stu.addedBy}</p>
          <div class="card">
            <h3>ഫീസ് വിവരങ്ങൾ (Fee Summary)</h3>
            <p>ആകെ ഫീസ് (Total Fee): ₹${stu.totalFee} | അടച്ച ഫീസ് (Paid): ₹${stu.paidFee} | ബാക്കി (Balance): ₹${bal}</p>
          </div>
        </body>
      </html>
    `);
    w.document.close();
    setTimeout(() => {
      w.focus();
      w.print();
    }, 250);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    const batchObj = batches.find((b) => b.id === newStudent.batchId) || batches[0];
    if (editingStudentId) {
      setStudents(
        students.map((s) =>
          s.id === editingStudentId
            ? {
                ...s,
                name: newStudent.name,
                rollNo: newStudent.rollNo || s.rollNo,
                grade: batchObj.grade,
                batchId: batchObj.id,
                batchName: batchObj.name,
                schoolName: newStudent.schoolName,
                parentName: newStudent.parentName,
                parentPhone: newStudent.parentPhone,
                addedBy: newStudent.addedBy,
                totalFee: Number(newStudent.totalFee),
                paidFee: Number(newStudent.paidFee),
                discount: Number(newStudent.discount || 0),
              }
            : s
        )
      );
      setEditingStudentId(null);
    } else {
      const created: Student = {
        id: `STU-${100 + students.length + 1}`,
        rollNo: newStudent.rollNo || `${batchObj.grade}A-0${students.length + 1}`,
        name: newStudent.name,
        grade: batchObj.grade,
        batchId: batchObj.id,
        batchName: batchObj.name,
        schoolName: newStudent.schoolName,
        parentName: newStudent.parentName,
        parentPhone: newStudent.parentPhone,
        addedBy: newStudent.addedBy,
        joinedDate: "2026-10-21",
        totalFee: Number(newStudent.totalFee),
        paidFee: Number(newStudent.paidFee),
        discount: Number(newStudent.discount || 0),
        feeHistory: [],
      };
      setStudents([created, ...students]);
    }
    setNewStudent({
      name: "",
      rollNo: "",
      batchId: "B10-A",
      schoolName: "Govt. HSS",
      parentName: "",
      parentPhone: "91",
      addedBy: "അനിൽ കുമാർ മാസ്റ്റർ (Teacher)",
      totalFee: 12000,
      paidFee: 2000,
      discount: 0,
    });
  };

  const handleSaveAttendance = () => {
    const batchObj = batches.find((b) => b.id === selectedAttBatchId);
    if (!batchObj) return;
    const batchStudents = students.filter((s) => s.batchId === selectedAttBatchId);
    const records = batchStudents.map((stu) => ({
      studentId: stu.id,
      studentName: stu.name,
      rollNo: stu.rollNo,
      status: draftAttendance[stu.id] || "Present",
    }));
    setAttendanceList([
      {
        id: `ATT-${Date.now()}`,
        date: selectedAttDate,
        batchId: batchObj.id,
        batchName: batchObj.name,
        grade: batchObj.grade,
        markedBy: "അനിൽ കുമാർ മാസ്റ്റർ",
        records,
      },
      ...attendanceList,
    ]);
  };

  const handleSubmitExam = (exam: Exam) => {
    let score = 0;
    const ansList: number[] = [];
    exam.questions.forEach((q, idx) => {
      const ch = examAnswers[idx] ?? -1;
      ansList.push(ch);
      if (ch === q.correctAnswerIndex) score += q.marks;
    });
    const stu = students.find((s) => s.id === selectedStudentForExam) || students[0];
    const percentage = Math.round((score / exam.totalMarks) * 100);
    const att: ExamAttempt = {
      id: `AT-${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      subject: exam.subject,
      studentId: stu.id,
      studentName: stu.name,
      grade: stu.grade,
      date: "2026-10-21",
      score,
      totalMarks: exam.totalMarks,
      percentage,
      answers: ansList,
    };
    setAttempts([att, ...attempts]);
    setSubmittedAttempt(att);
  };

  const handleRecordFeePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStudents(
      students.map((stu) => {
        if (stu.id !== selectedFeeStudentId) return stu;
        return {
          ...stu,
          paidFee: stu.paidFee + Number(feePaymentAmount),
        };
      })
    );
  };

  const selectedReportStudent = students.find((s) => s.id === reportStudentId) || students[0];
  const studentAttempts = attempts.filter((a) => a.studentId === selectedReportStudent?.id);
  const overallAvgPercentage =
    studentAttempts.length > 0
      ? Math.round(studentAttempts.reduce((acc, a) => acc + a.percentage, 0) / studentAttempts.length)
      : 88;

  const sidebarMenuItems = [
    { id: "dashboard", label: "Dashboard", title: "Dashboard" },
    { id: "students", label: "Students", title: "Students Data & Fee Registration" },
    { id: "faculties", label: "Teachers & Chapters", title: "Teachers & Syllabus Chapters" },
    { id: "attendance", label: "Attendance", title: "Batch-wise Class Attendance" },
    { id: "student_fee", label: "Fees", title: "Student Fee & Balance Sheet" },
    { id: "exam", label: "Exams", title: "Online Exams & Instant Score" },
    { id: "schedule", label: "Timetable", title: "Class Batches & Timetable" },
    { id: "question_bank", label: "Library & Notes", title: "Notes & Question Bank" },
    { id: "exam_report", label: "Reports (AI Exam)", title: "AI Graphical Examination Report" },
    { id: "fee_report", label: "Fee Report", title: "Institution Fee Report" },
    { id: "live_class", label: "Live Classes", title: "YouTube Live Classes" },
    { id: "communication", label: "WhatsApp Groups", title: "WhatsApp Parent Communication" },
    { id: "accounts", label: "Accounts & Settings", title: "Institution Accounts" },
  ];

  const currentSectionTitle =
    sidebarMenuItems.find((m) => m.id === activeView)?.title || "Dashboard";

  const circumference = 339.29;
  const collectedRatio =
    metrics.totalFeeExpected > 0 ? metrics.totalFeeCollected / metrics.totalFeeExpected : 0.7;
  const pendingRatio =
    metrics.totalFeeExpected > 0 ? (metrics.totalFeePending * 0.75) / metrics.totalFeeExpected : 0.2;
  const overdueRatio = Math.max(0, 1 - collectedRatio - pendingRatio);
  const collectedStroke = collectedRatio * circumference;
  const pendingStroke = pendingRatio * circumference;
  const overdueStroke = overdueRatio * circumference;

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-6 px-4 md:px-8 flex flex-col items-center">
      {/* Top Title Banner with Stacked Books & Graduation Cap */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <svg width="64" height="58" viewBox="0 0 72 64" fill="none" className="drop-shadow-sm">
          <path d="M12 46 L36 56 L60 46 L36 36 Z" fill="#4db66b" stroke="#2e7d32" strokeWidth="1.5" />
          <path d="M12 46 L36 56 L60 46 L60 52 L36 62 L12 52 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" />
          <path d="M14 36 L36 46 L58 36 L36 26 Z" fill="#f5b041" stroke="#b7791f" strokeWidth="1.5" />
          <path d="M14 36 L36 46 L58 36 L58 42 L36 52 L14 42 Z" fill="#fef9e7" stroke="#b7791f" strokeWidth="1.5" />
          <polygon points="36,8 8,20 36,32 64,20" fill="#1e4b85" stroke="#0d2b52" strokeWidth="1.8" />
          <path d="M20 25 V33 C20 37, 52 37, 52 33 V25" fill="#2b5fa6" stroke="#0d2b52" strokeWidth="1.5" />
          <path d="M56 23 V36" stroke="#f5b041" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="56" cy="37" r="2.5" fill="#f5b041" />
        </svg>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1f3a] tracking-tight">
          A PLUS ACCADEMY — Tuition Management Software
        </h1>
      </div>

      {/* Main Rounded Software Window */}
      <div className="w-full max-w-[1320px] min-h-[760px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.08)] border border-slate-200/90 overflow-hidden flex">
        {/* Deep Navy Left Sidebar */}
        <aside className="w-60 md:w-64 bg-[#003366] text-white flex flex-col justify-between py-6 px-4 flex-shrink-0">
          <div>
            <div
              onClick={() => setActiveView("dashboard")}
              className="flex items-center gap-3 px-2 pb-6 border-b border-white/10 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center flex-shrink-0">
                <svg width="26" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-base leading-tight tracking-wide text-white">A PLUS ACCADEMY</h2>
                <p className="text-xs text-sky-200 font-medium">Tuition Centers</p>
              </div>
            </div>

            <nav className="space-y-1.5 mt-5">
              {sidebarMenuItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full px-3.5 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-all ${
                      isActive
                        ? "bg-[#1967d2] text-white font-bold shadow-sm"
                        : "text-slate-100/90 hover:bg-white/10 font-medium"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 px-2 text-xs text-sky-200/90 space-y-2.5">
            <div>
              <div className="font-extrabold text-white tracking-wide">A PLUS ACCADEMY</div>
              <div className="text-[11px] text-sky-200">Tuition Centers (Std 8, 9 & 10)</div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { g: "8", batchId: "B08-A" },
                { g: "9", batchId: "B09-A" },
                { g: "10", batchId: "B10-A" },
              ].map((cls) => (
                <button
                  key={cls.g}
                  onClick={() => {
                    setSelectedAttBatchId(cls.batchId);
                    setNewStudent({ ...newStudent, batchId: cls.batchId });
                    setActiveView("attendance");
                  }}
                  className="py-1.5 px-1 rounded-md bg-white/10 hover:bg-[#1967d2] text-white font-bold text-[11px] border border-white/20 transition text-center"
                >
                  Class {cls.g}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <header className="px-6 md:px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">{currentSectionTitle}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <span className="text-sm font-semibold text-slate-800">Admin</span>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-5">
              {activeView === "dashboard" && (
                <div className="space-y-6">
                  {/* 4 Pastel KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-[#eef6ff] border border-[#d6e8ff] rounded-2xl p-5">
                      <p className="text-xs font-semibold text-slate-600">Students</p>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{metrics.totalStudents}</h3>
                      <button onClick={() => setActiveView("students")} className="text-xs font-bold text-[#1967d2] mt-2">
                        View all
                      </button>
                    </div>
                    <div className="bg-[#eefbf3] border border-[#d3f4e0] rounded-2xl p-5">
                      <p className="text-xs font-semibold text-slate-600">Teachers</p>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{facultyChapters.length}</h3>
                      <button onClick={() => setActiveView("faculties")} className="text-xs font-bold text-[#1967d2] mt-2">
                        View all
                      </button>
                    </div>
                    <div className="bg-[#f5f0ff] border border-[#e4d7ff] rounded-2xl p-5">
                      <p className="text-xs font-semibold text-slate-600">Attendance</p>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{metrics.avgAttendance}%</h3>
                      <button onClick={() => setActiveView("attendance")} className="text-xs font-bold text-[#1967d2] mt-2">
                        View all
                      </button>
                    </div>
                    <div className="bg-[#fff8eb] border border-[#fde7c0] rounded-2xl p-5">
                      <p className="text-xs font-semibold text-slate-600">Fees Collection</p>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                        ₹ {metrics.totalFeeCollected.toLocaleString("en-IN")}
                      </h3>
                      <button onClick={() => setActiveView("fee_report")} className="text-xs font-bold text-[#1967d2] mt-2">
                        View all
                      </button>
                    </div>
                  </div>

                  {/* Middle Row: Attendance Overview + Recent Admissions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <h4 className="font-bold text-slate-900 text-base mb-4">Attendance Overview</h4>
                      <svg viewBox="0 0 460 190" className="w-full h-44">
                        <polyline
                          fill="none"
                          stroke="#1e5685"
                          strokeWidth="2.6"
                          points="65,88 135,64 205,46 275,74 345,50 420,34"
                        />
                      </svg>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900 text-base">Recent Admissions</h4>
                        <button onClick={() => setActiveView("students")} className="text-xs font-bold text-[#1967d2]">
                          View all
                        </button>
                      </div>
                      <div className="divide-y">
                        {students.slice(0, 4).map((stu) => (
                          <div key={stu.id} className="py-2.5 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{stu.name}</p>
                              <p className="text-slate-500">Added by: {stu.addedBy}</p>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => handleDownloadStudentPDF(stu)}
                                className="px-2 py-1 bg-sky-50 text-[#195685] border rounded font-bold"
                              >
                                📄 PDF
                              </button>
                              <button
                                onClick={() => handleStartEditStudent(stu)}
                                className="px-2 py-1 bg-amber-50 text-amber-800 border rounded font-bold"
                              >
                                ✏️ Edit
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Fee Collection Donut + Upcoming Exams */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center justify-around">
                      <svg viewBox="0 0 140 140" className="w-40 h-40 -rotate-90">
                        <circle cx="70" cy="70" r="54" fill="none" stroke="#f1f5f9" strokeWidth="18" />
                        <circle
                          cx="70"
                          cy="70"
                          r="54"
                          fill="none"
                          stroke="#4db66b"
                          strokeWidth="18"
                          strokeDasharray={`${collectedStroke} ${circumference}`}
                        />
                        <circle
                          cx="70"
                          cy="70"
                          r="54"
                          fill="none"
                          stroke="#f5a623"
                          strokeWidth="18"
                          strokeDasharray={`${pendingStroke} ${circumference}`}
                          strokeDashoffset={-collectedStroke}
                        />
                        <circle
                          cx="70"
                          cy="70"
                          r="54"
                          fill="none"
                          stroke="#d9534f"
                          strokeWidth="18"
                          strokeDasharray={`${overdueStroke} ${circumference}`}
                          strokeDashoffset={-(collectedStroke + pendingStroke)}
                        />
                      </svg>
                      <div className="text-xs space-y-2">
                        <p><b>Collected:</b> ₹{metrics.totalFeeCollected.toLocaleString("en-IN")}</p>
                        <p><b>Pending:</b> ₹{metrics.totalFeePending.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                      <h4 className="font-bold text-slate-900 text-base">Upcoming Exams</h4>
                      {exams.map((ex) => (
                        <div key={ex.id} className="p-3 border rounded-xl text-sm">
                          <b>{ex.title}</b> — {ex.date}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeView === "students" && (
                <div className="space-y-5">
                  <div className="bg-gradient-to-r from-[#0f2942] via-[#195685] to-[#169bc2] text-white p-4 rounded-xl shadow flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                        📄 STUDENT REPORT & FEE STATEMENT (PDF DOWNLOAD)
                      </span>
                      <h4 className="font-extrabold text-sm">
                        ഓരോ കുട്ടിയുടെയും അക്കാദമിക് & ഫീ റിപ്പോർട്ട് PDF ഫോർമാറ്റിൽ ഡൗൺലോഡ് ചെയ്യാം
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={reportStudentId}
                        onChange={(e) => setReportStudentId(e.target.value)}
                        className="bg-white text-slate-900 rounded-lg px-3 py-1.5 text-xs font-bold"
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.rollNo})
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const targetStu = students.find((x) => x.id === reportStudentId) || students[0];
                          if (targetStu) handleDownloadStudentPDF(targetStu);
                        }}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-lg text-xs"
                      >
                        📄 കുട്ടിയുടെ PDF റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-xl border space-y-3">
                      <h3 className="font-bold text-[#195685]">
                        {editingStudentId ? "✏️ കുട്ടിയുടെ വിവരങ്ങൾ എഡിറ്റ് ചെയ്യുക" : "➕ പുതിയ കുട്ടിയെ ചേർക്കുക"}
                      </h3>
                      <input
                        type="text"
                        required
                        placeholder="കുട്ടിയുടെ പേര് *"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                      <select
                        value={newStudent.batchId}
                        onChange={(e) => setNewStudent({ ...newStudent, batchId: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        {batches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        required
                        placeholder="ആരാണ് ചേർത്തത്? (Added By)"
                        value={newStudent.addedBy}
                        onChange={(e) => setNewStudent({ ...newStudent, addedBy: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      />
                      <div className="p-3 rounded-xl bg-sky-50 border border-[#169bc2]/40 space-y-2">
                        <h4 className="font-bold text-xs text-[#195685]">💳 കുട്ടിയുടെ ഫീ രജിസ്ട്രേഷൻ (Fee Registration)</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-[11px] font-bold block">ആകെ ഫീസ് (₹)</label>
                            <input
                              type="number"
                              value={newStudent.totalFee}
                              onChange={(e) => setNewStudent({ ...newStudent, totalFee: Number(e.target.value) })}
                              className="w-full border rounded px-2 py-1 text-xs bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-[#2d7a47] block">അടച്ചത് (₹)</label>
                            <input
                              type="number"
                              value={newStudent.paidFee}
                              onChange={(e) => setNewStudent({ ...newStudent, paidFee: Number(e.target.value) })}
                              className="w-full border rounded px-2 py-1 text-xs bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold block">ഡിസ്കൗണ്ട് (₹)</label>
                            <input
                              type="number"
                              value={newStudent.discount}
                              onChange={(e) => setNewStudent({ ...newStudent, discount: Number(e.target.value) })}
                              className="w-full border rounded px-2 py-1 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-[#2d7a47] text-white font-bold py-2.5 rounded-lg text-sm">
                        {editingStudentId ? "💾 മാറ്റങ്ങൾ സേവ് ചെയ്യുക" : "➕ കുട്ടിയെ ചേർക്കുക & ഫീ രജിസ്റ്റർ ചെയ്യുക"}
                      </button>
                    </form>
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
                      <h3 className="font-bold text-[#195685] mb-3">STUDENTS DIRECTORY</h3>
                      {students.map((s) => (
                        <div key={s.id} className="py-2.5 border-b flex justify-between items-center text-sm">
                          <div>
                            <p className="font-bold">{s.name}</p>
                            <p className="text-xs text-slate-500">
                              {s.batchName} • Added by: {s.addedBy} • Fee: ₹{s.paidFee}/₹{s.totalFee}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDownloadStudentPDF(s)}
                              className="px-2.5 py-1 bg-sky-50 text-[#195685] border border-sky-200 rounded text-xs font-bold"
                            >
                              📄 PDF
                            </button>
                            <button
                              onClick={() => handleStartEditStudent(s)}
                              className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded text-xs font-bold"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => setStudents(students.filter((x) => x.id !== s.id))}
                              className="text-xs text-rose-600 font-bold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeView === "attendance" && (
                <div className="bg-white p-6 rounded-xl border space-y-4">
                  <div className="flex justify-between items-center">
                    <select
                      value={selectedAttBatchId}
                      onChange={(e) => setSelectedAttBatchId(e.target.value)}
                      className="border-2 border-[#169bc2] rounded-lg px-4 py-2 text-sm font-bold"
                    >
                      {batches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSaveAttendance}
                      className="bg-[#2d7a47] text-white px-5 py-2 rounded-lg text-sm font-bold"
                    >
                      Save Attendance
                    </button>
                  </div>
                  {students
                    .filter((s) => s.batchId === selectedAttBatchId)
                    .map((stu) => {
                      const st = draftAttendance[stu.id] || "Present";
                      return (
                        <div key={stu.id} className="p-3 border rounded-lg flex justify-between items-center">
                          <span className="font-bold text-sm">{stu.name}</span>
                          <div className="flex gap-2">
                            {(["Present", "Absent", "Late"] as const).map((val) => (
                              <button
                                key={val}
                                onClick={() => setDraftAttendance({ ...draftAttendance, [stu.id]: val })}
                                className={`px-3 py-1 rounded text-xs font-bold ${
                                  st === val ? "bg-[#2d7a47] text-white" : "border"
                                }`}
                              >
                                {val}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              {activeView === "faculties" && (
                <div className="space-y-3">
                  {facultyChapters.map((fc) => (
                    <div key={fc.id} className="bg-white p-5 rounded-xl border space-y-2">
                      <h4 className="font-bold text-[#195685]">
                        {fc.subject} — Chapter {fc.chapterNo}: {fc.chapterTitle}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Faculty: {fc.facultyName} • Completed: {fc.completedPortions}/{fc.totalPortions}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "exam" && (
                <div className="bg-white p-6 rounded-xl border space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#195685]">ONLINE MCQ EXAM</h3>
                    <select
                      value={selectedStudentForExam}
                      onChange={(e) => setSelectedStudentForExam(e.target.value)}
                      className="border rounded px-3 py-1 text-xs font-bold"
                    >
                      {students.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {submittedAttempt && (
                    <div className="p-3 bg-emerald-50 border border-[#2d7a47] rounded-lg text-sm font-bold">
                      Score: {submittedAttempt.score}/{submittedAttempt.totalMarks} ({submittedAttempt.percentage}%)
                    </div>
                  )}
                  {exams[0].questions.map((q, qIdx) => (
                    <div key={q.id} className="p-3 border rounded-lg space-y-2">
                      <p className="font-bold text-sm">{q.question}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => setExamAnswers({ ...examAnswers, [qIdx]: oIdx })}
                            className={`p-2 border rounded text-xs text-left ${
                              examAnswers[qIdx] === oIdx ? "bg-[#2d7a47] text-white" : "bg-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => handleSubmitExam(exams[0])}
                    className="w-full bg-[#195685] text-white py-2.5 rounded-lg text-sm font-bold"
                  >
                    Submit Exam & View Score
                  </button>
                </div>
              )}

              {activeView === "exam_report" && (
                <div className="bg-white p-6 rounded-xl border space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#195685]">AI GRAPHICAL EXAMINATION REPORT</h3>
                    <select
                      value={reportStudentId}
                      onChange={(e) => setReportStudentId(e.target.value)}
                      className="border rounded px-3 py-1 text-xs font-bold"
                    >
                      {students.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-slate-600">
                    Overall Average for {selectedReportStudent?.name}: <b>{overallAvgPercentage}%</b>
                  </p>
                  {studentAttempts.map((att) => (
                    <div key={att.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{att.examTitle}</span>
                        <span>{att.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                        <div className="bg-[#2d7a47] h-full" style={{ width: `${att.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "live_class" && (
                <div className="bg-white p-6 rounded-xl border space-y-3">
                  <h3 className="font-bold text-[#195685]">YOUTUBE LIVE CLASSES</h3>
                  {liveClasses.map((lc) => (
                    <div key={lc.id} className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-bold">{lc.title}</p>
                        <p className="text-xs text-slate-500">
                          {lc.batchName} • {lc.facultyName}
                        </p>
                      </div>
                      <a
                        href={lc.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#2d7a47] text-white px-4 py-2 rounded text-xs font-bold"
                      >
                        Watch Live
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "student_fee" && (
                <div className="bg-white p-6 rounded-xl border space-y-4">
                  <h3 className="font-bold text-[#195685]">STUDENT FEE LEDGER</h3>
                  <form onSubmit={handleRecordFeePayment} className="flex gap-3">
                    <select
                      value={selectedFeeStudentId}
                      onChange={(e) => setSelectedFeeStudentId(e.target.value)}
                      className="border rounded px-3 py-2 text-sm"
                    >
                      {students.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={feePaymentAmount}
                      onChange={(e) => setFeePaymentAmount(Number(e.target.value))}
                      className="border rounded px-3 py-2 text-sm"
                    />
                    <button type="submit" className="bg-[#2d7a47] text-white px-4 py-2 rounded text-sm font-bold">
                      Record Payment
                    </button>
                  </form>
                </div>
              )}

              {activeView === "fee_report" && (
                <div className="bg-white p-6 rounded-xl border space-y-3">
                  <h3 className="font-bold text-[#195685]">
                    INSTITUTION FEE REPORT (Pending Balance: ₹{metrics.totalFeePending})
                  </h3>
                  {students.map((s) => {
                    const bal = s.totalFee - s.discount - s.paidFee;
                    return (
                      <div key={s.id} className="py-2 border-b flex justify-between text-sm">
                        <span className="font-bold">{s.name}</span>
                        <span>
                          Paid: ₹{s.paidFee} | Balance: <b className="text-rose-600">₹{bal}</b>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeView === "communication" && (
                <div className="bg-white p-6 rounded-xl border space-y-3">
                  <h3 className="font-bold text-[#195685]">WHATSAPP PARENT GROUPS</h3>
                  {batches.map((b) => (
                    <div key={b.id} className="p-3 border rounded-lg flex justify-between items-center">
                      <span className="font-bold text-sm">{b.name}</span>
                      <a
                        href={b.whatsappGroupLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#2d7a47] text-white px-3 py-1.5 rounded text-xs font-bold"
                      >
                        Open WhatsApp Group
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {(activeView === "question_bank" || activeView === "materials") && (
                <div className="bg-white p-6 rounded-xl border space-y-3">
                  <h3 className="font-bold text-[#195685]">NOTES & QUESTION BANK</h3>
                  {questionBank.map((qb) => (
                    <div key={qb.id} className="p-4 border rounded-lg space-y-2">
                      <h4 className="font-bold">{qb.title}</h4>
                      {qb.questionsList.map((q, i) => (
                        <p key={i} className="text-xs text-slate-700">
                          <b>{q.q}</b> — {q.a}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {(activeView === "accounts" ||
                activeView === "courses" ||
                activeView === "schedule" ||
                activeView === "classes" ||
                activeView === "hours") && (
                <div className="bg-white p-6 rounded-xl border space-y-3">
                  <h3 className="font-bold text-[#195685] uppercase">{activeView}</h3>
                  {batches.map((b) => (
                    <div key={b.id} className="p-3 border rounded-lg text-sm">
                      <b>{b.name}</b> — {b.timing} ({b.classTeacher})
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
