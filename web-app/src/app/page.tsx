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

/* ==================== HAND-CRAFTED 3D GREEN SVGs MATCHING PDF ==================== */
const AcademyLogoSVG = () => (
  <svg width="78" height="68" viewBox="0 0 90 80" fill="none" className="drop-shadow-md">
    <path d="M42 10 L18 66 H29 L42 32 L54 62 H64 L42 10 Z" fill="#1e4b85" />
    <path d="M12 67 C32 54, 58 46, 80 42 C56 54, 34 62, 12 67 Z" fill="#1e4b85" />
    <path d="M22 52 C40 44, 60 39, 76 36 C58 44, 38 49, 22 52 Z" fill="#2563eb" />
    <path d="M62 12 V28 M54 20 H70" stroke="#c81e1e" strokeWidth="3.8" strokeLinecap="round" />
    <path d="M58 16 L66 24 M66 16 L58 24" stroke="#c81e1e" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconDashboard = () => (
  <svg width="92" height="76" viewBox="0 0 92 76" fill="none" className="drop-shadow-md">
    <rect x="8" y="10" width="76" height="56" rx="3" fill="#2d7a47" stroke="#143d22" strokeWidth="2.5" />
    <rect x="13" y="21" width="66" height="40" fill="#ffffff" stroke="#143d22" strokeWidth="2" />
    <circle cx="62" cy="15.5" r="2" fill="#ffffff" />
    <circle cx="68" cy="15.5" r="2" fill="#ffffff" />
    <circle cx="74" cy="15.5" r="2" fill="#ffffff" />
  </svg>
);

const IconStudents = () => (
  <svg width="96" height="76" viewBox="0 0 96 76" fill="none" className="drop-shadow-md">
    {[18, 38, 58, 78].map((cx, idx) => (
      <g key={idx}>
        <circle cx={cx} cy="20" r="6.5" fill="#2d7a47" stroke="#143d22" strokeWidth="2" />
        <path
          d={`M${cx - 9} 33 C${cx - 9} 29, ${cx + 9} 29, ${cx + 9} 33 L${cx + 10} 50 H${cx + 5} L${cx + 4} 65 H${cx - 4} L${cx - 5} 50 H${cx - 10} Z`}
          fill="#2d7a47"
          stroke="#143d22"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    ))}
  </svg>
);

const IconAttendance = () => (
  <svg width="88" height="76" viewBox="0 0 88 76" fill="none" className="drop-shadow-md">
    <rect x="14" y="15" width="60" height="50" rx="4" fill="#2d7a47" stroke="#143d22" strokeWidth="2.2" />
    <rect x="24" y="8" width="8" height="13" rx="3" fill="#2d7a47" stroke="#143d22" strokeWidth="2" />
    <rect x="56" y="8" width="8" height="13" rx="3" fill="#2d7a47" stroke="#143d22" strokeWidth="2" />
    <line x1="14" y1="27" x2="74" y2="27" stroke="#143d22" strokeWidth="2.2" />
    {[31, 41, 51].map((y, r) =>
      [19, 36, 53].map((x, c) => (
        <rect
          key={`${r}-${c}`}
          x={x}
          y={y}
          width="14"
          height="7"
          rx="1"
          fill="#ffffff"
          stroke="#143d22"
          strokeWidth="1.5"
        />
      ))
    )}
  </svg>
);

const IconFaculties = () => (
  <svg width="102" height="76" viewBox="0 0 102 76" fill="none" className="drop-shadow-md">
    <rect x="34" y="10" width="52" height="34" rx="2" fill="#ffffff" stroke="#2d7a47" strokeWidth="4" />
    <rect x="34" y="10" width="52" height="34" rx="2" stroke="#143d22" strokeWidth="1.5" />
    <circle cx="24" cy="22" r="6.5" fill="#2d7a47" stroke="#143d22" strokeWidth="1.8" />
    <path
      d="M14 35 C14 30, 34 30, 34 35 L39 46 L33 49 L29 41 V65 H19 V43 L15 51 L11 48 Z"
      fill="#2d7a47"
      stroke="#143d22"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <line x1="36" y1="45" x2="56" y2="24" stroke="#143d22" strokeWidth="2.8" strokeLinecap="round" />
    {[48, 64, 80].map((cx, i) => (
      <g key={i}>
        <circle cx={cx} cy="53" r="4" fill="#2d7a47" stroke="#143d22" strokeWidth="1.5" />
        <path
          d={`M${cx - 6} 63 C${cx - 6} 58, ${cx + 6} 58, ${cx + 6} 63 Z`}
          fill="#2d7a47"
          stroke="#143d22"
          strokeWidth="1.5"
        />
      </g>
    ))}
    <line x1="40" y1="65" x2="88" y2="65" stroke="#2d7a47" strokeWidth="3" />
  </svg>
);

const IconExam = () => (
  <svg width="96" height="76" viewBox="0 0 96 76" fill="none" className="drop-shadow-md">
    <rect x="12" y="14" width="72" height="50" rx="3" fill="#2d7a47" stroke="#143d22" strokeWidth="2" />
    <path d="M18 12 H46 V56 H18 Z" fill="#ffffff" stroke="#143d22" strokeWidth="2.2" />
    <path d="M46 12 H74 V56 H46 Z" fill="#ffffff" stroke="#143d22" strokeWidth="2.2" />
    <rect x="24" y="12" width="22" height="44" fill="#2d7a47" fillOpacity="0.85" stroke="#143d22" strokeWidth="1.8" />
    <line x1="53" y1="24" x2="67" y2="24" stroke="#2d7a47" strokeWidth="2.5" />
    <line x1="53" y1="31" x2="67" y2="31" stroke="#2d7a47" strokeWidth="2.5" />
    <line x1="53" y1="38" x2="63" y2="38" stroke="#2d7a47" strokeWidth="2.5" />
  </svg>
);

const IconExamReport = () => (
  <svg width="100" height="76" viewBox="0 0 100 76" fill="none" className="drop-shadow-md">
    {[24, 42, 60].map((cx, i) => (
      <g key={i}>
        <circle cx={cx} cy="18" r="5.5" fill="#2d7a47" stroke="#143d22" strokeWidth="1.8" />
        <path
          d={`M${cx - 8} 30 C${cx - 8} 25, ${cx + 8} 25, ${cx + 8} 30 V48 H${cx - 8} Z`}
          fill="#2d7a47"
          stroke="#143d22"
          strokeWidth="1.8"
        />
      </g>
    ))}
    <path d="M18 64 L40 42 L54 55 L82 27" stroke="#2d7a47" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 64 L40 42 L54 55 L82 27" stroke="#143d22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M69 26 H83 V40" stroke="#2d7a47" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLiveClasses = () => (
  <svg width="92" height="76" viewBox="0 0 92 76" fill="none" className="drop-shadow-md">
    <rect x="14" y="10" width="64" height="5" rx="2" fill="#2d7a47" stroke="#143d22" strokeWidth="1.8" />
    <line x1="46" y1="5" x2="46" y2="10" stroke="#143d22" strokeWidth="3" />
    <rect x="18" y="15" width="56" height="38" fill="#2d7a47" stroke="#143d22" strokeWidth="2" />
    <rect x="24" y="20" width="44" height="28" fill="#ffffff" stroke="#143d22" strokeWidth="1.6" />
    <polygon points="41,27 41,41 54,34" fill="#2d7a47" stroke="#143d22" strokeWidth="1.5" />
    <line x1="46" y1="53" x2="46" y2="68" stroke="#2d7a47" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="46" y1="56" x2="28" y2="68" stroke="#2d7a47" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="46" y1="56" x2="64" y2="68" stroke="#2d7a47" strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

const IconStudentFee = () => (
  <svg width="88" height="76" viewBox="0 0 88 76" fill="none" className="drop-shadow-md">
    <circle cx="44" cy="24" r="11" fill="#2d7a47" stroke="#143d22" strokeWidth="2" />
    <path d="M35 16 L44 10 L53 16" stroke="#143d22" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 64 C24 46, 64 46, 64 64 Z" fill="#2d7a47" stroke="#143d22" strokeWidth="2.2" />
    <path d="M32 50 L44 54 L56 50 V63 L44 67 L32 63 Z" fill="#ffffff" stroke="#143d22" strokeWidth="2" />
    <line x1="44" y1="54" x2="44" y2="67" stroke="#143d22" strokeWidth="2" />
  </svg>
);

const IconFeeReport = () => (
  <svg width="88" height="76" viewBox="0 0 88 76" fill="none" className="drop-shadow-md">
    <polyline points="18,12 18,64 74,64" stroke="#2d7a47" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="26" y="42" width="8" height="20" fill="#2d7a47" stroke="#143d22" strokeWidth="1.6" />
    <rect x="39" y="28" width="8" height="34" fill="#2d7a47" stroke="#143d22" strokeWidth="1.6" />
    <rect x="52" y="18" width="8" height="44" fill="#2d7a47" stroke="#143d22" strokeWidth="1.6" />
    <rect x="64" y="34" width="8" height="28" fill="#2d7a47" stroke="#143d22" strokeWidth="1.6" />
  </svg>
);

const IconCommunication = () => (
  <svg width="92" height="76" viewBox="0 0 92 76" fill="none" className="drop-shadow-md">
    <polygon points="14,38 76,14 54,64 42,46" fill="#2d7a47" stroke="#143d22" strokeWidth="2.2" strokeLinejoin="round" />
    <polygon points="42,46 76,14 34,42" fill="#ffffff" stroke="#143d22" strokeWidth="1.8" strokeLinejoin="round" />
    <polygon points="34,42 42,46 38,58" fill="#1b5230" stroke="#143d22" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const IconQuestionBank = () => (
  <svg width="96" height="76" viewBox="0 0 96 76" fill="none" className="drop-shadow-md">
    {[44, 31, 18].map((y, idx) => (
      <g key={idx}>
        <polygon
          points={`20,${y} 52,${y - 10} 76,${y} 44,${y + 10}`}
          fill="#2d7a47"
          stroke="#143d22"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points={`20,${y} 44,${y + 10} 76,${y} 76,${y + 8} 44,${y + 18} 20,${y + 8}`}
          fill="#ffffff"
          stroke="#143d22"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line x1="44" y1={y + 10} x2="44" y2={y + 18} stroke="#143d22" strokeWidth="2" />
      </g>
    ))}
  </svg>
);

const IconAccounts = () => (
  <svg width="96" height="76" viewBox="0 0 96 76" fill="none" className="drop-shadow-md">
    <path d="M22 28 L64 12 L70 28 Z" fill="#ffffff" stroke="#143d22" strokeWidth="2" />
    <path d="M26 28 L72 18 L74 28 Z" fill="#2d7a47" stroke="#143d22" strokeWidth="2" />
    <rect x="14" y="28" width="68" height="36" rx="3" fill="#2d7a47" stroke="#143d22" strokeWidth="2.2" />
    <rect x="19" y="33" width="58" height="26" rx="2" fill="#ffffff" stroke="#143d22" strokeWidth="1.8" />
    <circle cx="48" cy="46" r="7.5" fill="#2d7a47" stroke="#143d22" strokeWidth="1.8" />
    <circle cx="28" cy="46" r="3" fill="#2d7a47" />
    <circle cx="68" cy="46" r="3" fill="#2d7a47" />
  </svg>
);

export default function APlusAcademyPortal() {
  // "home" renders the exact A PLUS ACCADEMY PDF Landing Page
  const [activeView, setActiveView] = useState<string>("home");

  const [batches] = useState<Batch[]>(INITIAL_BATCHES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [facultyChapters] = useState<FacultyChapter[]>(INITIAL_FACULTY_CHAPTERS);
  const [exams] = useState<Exam[]>(INITIAL_EXAMS);
  const [attempts, setAttempts] = useState<ExamAttempt[]>(INITIAL_ATTEMPTS);
  const [liveClasses] = useState<LiveClass[]>(INITIAL_LIVE_CLASSES);
  const [questionBank] = useState<QuestionBankItem[]>(INITIAL_QUESTION_BANK);

  // Student Form
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
    { id: "faculties", label: "FACULTIES&CHAPTER", Component: IconFaculties },
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
    { id: "courses", label: "COURSES", rounded: "rounded-md", spacerBefore: false },
    { id: "schedule", label: "SCHEDULE", rounded: "rounded-md", spacerBefore: false },
    { id: "classes", label: "CLASSES", rounded: "rounded-full", spacerBefore: false },
    { id: "hours", label: "HOURS", rounded: "rounded-full", spacerBefore: true },
    { id: "materials", label: "MATERIALS", rounded: "rounded-none", spacerBefore: false },
  ];

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    const batchObj = batches.find((b) => b.id === newStudent.batchId) || batches[0];
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
      discount: 0,
      feeHistory: [],
    };
    setStudents([created, ...students]);
    setNewStudent({ ...newStudent, name: "", rollNo: "", parentName: "" });
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

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex justify-center items-start">
      {/* Outer Framed Canvas matching PDF border */}
      <div className="w-full max-w-[1360px] min-h-[760px] border border-slate-400 bg-white flex relative shadow-sm">
        {/* Left Sidebar Column (COURSES, SCHEDULE, CLASSES, HOURS, MATERIALS) */}
        <div className="w-40 md:w-48 border-r border-[#169bc2]/70 flex flex-col pt-36 px-3 space-y-4 flex-shrink-0">
          {leftSideButtons.map((btn) => (
            <React.Fragment key={btn.id}>
              {btn.spacerBefore && <div className="h-6" />}
              <button
                onClick={() => setActiveView(btn.id)}
                className={`border-[1.6px] border-[#169bc2] bg-white hover:bg-sky-50 text-slate-900 w-full py-2.5 px-3 text-xs md:text-sm font-medium tracking-wide text-center transition ${btn.rounded}`}
              >
                {btn.label}
              </button>
            </React.Fragment>
          ))}
          <div className="h-9 w-full border border-[#169bc2]/70 mt-2" />
        </div>

        {/* Right Main Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header with A+ Logo & A PLUS ACCADEMY */}
          <div className="h-32 px-6 md:px-14 flex items-center justify-between border-b border-[#169bc2]/70">
            <div
              onClick={() => setActiveView("home")}
              className="flex items-center gap-8 md:gap-16 cursor-pointer mx-auto"
            >
              <AcademyLogoSVG />
              <h1 className="text-2xl sm:text-4xl md:text-[42px] font-extrabold tracking-wider text-[#195685]">
                A PLUS ACCADEMY
              </h1>
            </div>

            {activeView !== "home" && (
              <button
                onClick={() => setActiveView("home")}
                className="border-[1.6px] border-[#169bc2] bg-white hover:bg-sky-50 px-4 py-2 rounded-lg text-xs font-bold"
              >
                🏠 LANDING PAGE
              </button>
            )}
          </div>

          {/* Landing Grid or Selected Module */}
          {activeView === "home" ? (
            <div className="flex-1 px-6 md:px-12 py-10 flex flex-col justify-around">
              {/* Row 1: 7 Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-8 gap-x-4 items-start justify-items-center">
                {topRowIcons.map((item) => {
                  const IconComp = item.Component;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className="flex flex-col items-center cursor-pointer group w-full max-w-[155px]"
                    >
                      <div className="h-24 flex items-center justify-center mb-2 transition-transform group-hover:-translate-y-1">
                        <IconComp />
                      </div>
                      <div className="border-[1.6px] border-[#169bc2] bg-white group-hover:bg-sky-50 w-full min-h-[38px] px-2 py-1.5 rounded-lg flex items-center justify-center text-center text-xs md:text-[13px] font-medium tracking-wide whitespace-pre-line leading-snug">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Row 2: 5 Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6 items-start justify-items-center max-w-5xl mx-auto w-full pt-6">
                {bottomRowIcons.map((item) => {
                  const IconComp = item.Component;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className="flex flex-col items-center cursor-pointer group w-full max-w-[175px]"
                    >
                      <div className="h-24 flex items-center justify-center mb-2 transition-transform group-hover:-translate-y-1">
                        <IconComp />
                      </div>
                      <div className="border-[1.6px] border-[#169bc2] bg-white group-hover:bg-sky-50 w-full min-h-[40px] px-3 py-1.5 rounded-lg flex items-center justify-center text-center text-xs md:text-[13px] font-medium tracking-wide whitespace-pre-line leading-snug">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex-1 p-6 md:p-8 bg-slate-50/60 overflow-y-auto space-y-5">
              <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-200">
                <button
                  onClick={() => setActiveView("home")}
                  className="px-3 py-1.5 rounded-lg bg-[#195685] text-white text-xs font-bold"
                >
                  ⬅ Back to Landing Page
                </button>
                {[...topRowIcons, ...bottomRowIcons].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`border border-[#169bc2] bg-white px-3 py-1 rounded-md text-xs font-semibold ${
                      activeView === item.id ? "bg-sky-50 font-bold" : ""
                    }`}
                  >
                    {item.label.replace("\n", " ")}
                  </button>
                ))}
              </div>

              {activeView === "dashboard" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-cyan-500/40 shadow-sm">
                    <p className="text-xs font-bold text-slate-500">ആകെ കുട്ടികൾ (TOTAL STUDENTS)</p>
                    <h3 className="text-3xl font-extrabold text-[#195685] mt-1">{metrics.totalStudents}</h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-cyan-500/40 shadow-sm">
                    <p className="text-xs font-bold text-slate-500">ശരാശരി ഹാജർ (ATTENDANCE)</p>
                    <h3 className="text-3xl font-extrabold text-[#2d7a47] mt-1">{metrics.avgAttendance}%</h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-cyan-500/40 shadow-sm">
                    <p className="text-xs font-bold text-slate-500">ലഭിച്ച ഫീസ് (COLLECTED FEE)</p>
                    <h3 className="text-3xl font-extrabold text-[#195685] mt-1">
                      ₹{metrics.totalFeeCollected.toLocaleString("en-IN")}
                    </h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-cyan-500/40 shadow-sm">
                    <p className="text-xs font-bold text-slate-500">ബാക്കി ഫീസ് (PENDING FEE)</p>
                    <h3 className="text-3xl font-extrabold text-rose-600 mt-1">
                      ₹{metrics.totalFeePending.toLocaleString("en-IN")}
                    </h3>
                  </div>
                </div>
              )}

              {activeView === "students" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-xl border space-y-3">
                    <h3 className="font-bold text-[#195685]">➕ പുതിയ കുട്ടിയെ ചേർക്കുക</h3>
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
                    <button type="submit" className="w-full bg-[#2d7a47] text-white font-bold py-2.5 rounded-lg text-sm">
                      Save Student
                    </button>
                  </form>
                  <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
                    <h3 className="font-bold text-[#195685] mb-3">STUDENTS DIRECTORY</h3>
                    {students.map((s) => (
                      <div key={s.id} className="py-2.5 border-b flex justify-between items-center text-sm">
                        <div>
                          <p className="font-bold">{s.name}</p>
                          <p className="text-xs text-slate-500">
                            {s.batchName} • Added by: {s.addedBy}
                          </p>
                        </div>
                        <button
                          onClick={() => setStudents(students.filter((x) => x.id !== s.id))}
                          className="text-xs text-rose-600 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
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
          )}
        </div>
      </div>
    </div>
  );
}
