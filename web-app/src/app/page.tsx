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
  ClassGrade,
  UserRole,
} from "@/lib/store";

export default function KeralaTuitionApp() {
  // Active Role & Navigation
  const [role, setRole] = useState<UserRole>("admin");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>("ALL");

  // Core State (with LocalStorage persistence support)
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [facultyChapters, setFacultyChapters] = useState<FacultyChapter[]>(INITIAL_FACULTY_CHAPTERS);
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [attempts, setAttempts] = useState<ExamAttempt[]>(INITIAL_ATTEMPTS);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_LIVE_CLASSES);
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>(INITIAL_QUESTION_BANK);

  // Student Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNo: "",
    grade: "10" as ClassGrade,
    batchId: "B10-A",
    schoolName: "Govt. HSS",
    parentName: "",
    parentPhone: "91",
    addedBy: "അനിൽ കുമാർ മാസ്റ്റർ (Teacher)",
    totalFee: 12000,
    paidFee: 2000,
  });

  // Batch Form State
  const [newBatch, setNewBatch] = useState({
    name: "",
    grade: "10" as ClassGrade,
    timing: "04:30 PM - 06:30 PM",
    classTeacher: "",
    whatsappGroupLink: "https://chat.whatsapp.com/",
  });

  // Attendance State
  const [selectedAttBatchId, setSelectedAttBatchId] = useState<string>("B10-A");
  const [selectedAttDate, setSelectedAttDate] = useState<string>("2026-10-21");
  const [attMarkedBy, setAttMarkedBy] = useState<string>("അനിൽ കുമാർ മാസ്റ്റർ");
  const [draftAttendance, setDraftAttendance] = useState<Record<string, "Present" | "Absent" | "Late">>({});

  // Faculty & Chapter Form State
  const [newChapter, setNewChapter] = useState({
    facultyName: "അനിൽ കുമാർ മാസ്റ്റർ",
    phone: "919447100200",
    grade: "10" as ClassGrade,
    batchId: "B10-A",
    subject: "ഗണിതം (Mathematics)",
    chapterNo: 3,
    chapterTitle: "",
    totalPortions: 5,
    completedPortions: 2,
    topicsText: "",
  });

  // Online Exam Taking & Creation State
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [selectedStudentForExam, setSelectedStudentForExam] = useState<string>("STU-101");
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState<ExamAttempt | null>(null);

  const [newExamForm, setNewExamForm] = useState({
    title: "",
    subject: "ഗണിതം (Mathematics)",
    grade: "10" as ClassGrade,
    batchId: "B10-A",
    durationMinutes: 15,
    createdBy: "അനിൽ കുമാർ മാസ്റ്റർ",
    questionText: "",
    optA: "",
    optB: "",
    optC: "",
    optD: "",
    correctIdx: 0,
    marks: 5,
  });

  // AI Report Selected Student
  const [reportStudentId, setReportStudentId] = useState<string>("STU-101");

  // Live Class State
  const [activeLiveClass, setActiveLiveClass] = useState<LiveClass | null>(INITIAL_LIVE_CLASSES[0]);
  const [newLiveForm, setNewLiveForm] = useState({
    title: "",
    subject: "ഗണിതം (Mathematics)",
    grade: "10" as ClassGrade,
    batchId: "B10-A",
    facultyName: "അനിൽ കുമാർ മാസ്റ്റർ",
    youtubeUrl: "",
    scheduledDate: "2026-10-22",
    scheduledTime: "07:00 PM",
  });

  // Fee Payment State
  const [selectedFeeStudentId, setSelectedFeeStudentId] = useState<string>("STU-102");
  const [feePaymentAmount, setFeePaymentAmount] = useState<number>(2000);
  const [feePaymentMode, setFeePaymentMode] = useState<"Cash" | "UPI" | "Bank">("UPI");

  // Question Bank Form State
  const [newQB, setNewQB] = useState({
    title: "",
    grade: "10" as ClassGrade,
    subject: "ഗണിതം (Mathematics)",
    chapter: "",
    type: "Chapter Notes & Q&A" as QuestionBankItem["type"],
    uploadedBy: "അനിൽ കുമാർ മാസ്റ്റർ",
    qText: "",
    aText: "",
    marks: 4,
  });

  // Derived Metrics for Dashboard & Fee Report
  const metrics = useMemo(() => {
    const totalStudents = students.length;
    const class8Count = students.filter((s) => s.grade === "8").length;
    const class9Count = students.filter((s) => s.grade === "9").length;
    const class10Count = students.filter((s) => s.grade === "10").length;

    const totalFeeExpected = students.reduce((acc, s) => acc + (s.totalFee - s.discount), 0);
    const totalFeeCollected = students.reduce((acc, s) => acc + s.paidFee, 0);
    const totalFeePending = totalFeeExpected - totalFeeCollected;

    const fullyPaidStudents = students.filter((s) => s.totalFee - s.discount - s.paidFee <= 0);
    const partiallyPaidStudents = students.filter(
      (s) => s.paidFee > 0 && s.totalFee - s.discount - s.paidFee > 0
    );
    const zeroPaidStudents = students.filter((s) => s.paidFee === 0 && s.totalFee - s.discount > 0);
    const studentsWithBalance = students.filter((s) => s.totalFee - s.discount - s.paidFee > 0);

    // Attendance Average
    let totalChecks = 0;
    let totalPresents = 0;
    attendanceList.forEach((att) => {
      att.records.forEach((r) => {
        totalChecks++;
        if (r.status === "Present" || r.status === "Late") totalPresents++;
      });
    });
    const avgAttendance = totalChecks > 0 ? Math.round((totalPresents / totalChecks) * 100) : 92;

    return {
      totalStudents,
      class8Count,
      class9Count,
      class10Count,
      totalFeeExpected,
      totalFeeCollected,
      totalFeePending,
      fullyPaidStudents,
      partiallyPaidStudents,
      zeroPaidStudents,
      studentsWithBalance,
      avgAttendance,
    };
  }, [students, attendanceList]);

  // Handlers
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    const batchObj = batches.find((b) => b.id === newStudent.batchId) || batches[0];
    const id = `STU-${100 + students.length + 1}`;
    const created: Student = {
      id,
      rollNo: newStudent.rollNo || `${batchObj.grade}A-0${students.length + 1}`,
      name: newStudent.name,
      grade: batchObj.grade,
      batchId: batchObj.id,
      batchName: batchObj.name,
      schoolName: newStudent.schoolName,
      parentName: newStudent.parentName,
      parentPhone: newStudent.parentPhone,
      addedBy: newStudent.addedBy,
      joinedDate: new Date().toISOString().split("T")[0],
      totalFee: Number(newStudent.totalFee),
      paidFee: Number(newStudent.paidFee),
      discount: 0,
      feeHistory:
        Number(newStudent.paidFee) > 0
          ? [
              {
                id: `FH-${Date.now()}`,
                date: new Date().toISOString().split("T")[0],
                amount: Number(newStudent.paidFee),
                mode: "Cash",
                receiptNo: `RCP-${1100 + students.length}`,
                collectedBy: newStudent.addedBy,
              },
            ]
          : [],
    };
    setStudents([created, ...students]);
    setNewStudent({ ...newStudent, name: "", rollNo: "", parentName: "" });
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatch.name.trim()) return;
    const id = `B${newBatch.grade}-${batches.length + 1}`;
    setBatches([
      ...batches,
      {
        id,
        name: newBatch.name,
        grade: newBatch.grade,
        timing: newBatch.timing,
        classTeacher: newBatch.classTeacher || "അനിൽ കുമാർ മാസ്റ്റർ",
        whatsappGroupLink: newBatch.whatsappGroupLink,
      },
    ]);
    setNewBatch({ ...newBatch, name: "", classTeacher: "" });
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

    const newRecord: AttendanceRecord = {
      id: `ATT-${Date.now()}`,
      date: selectedAttDate,
      batchId: batchObj.id,
      batchName: batchObj.name,
      grade: batchObj.grade,
      markedBy: attMarkedBy,
      records,
    };

    const filtered = attendanceList.filter(
      (a) => !(a.batchId === selectedAttBatchId && a.date === selectedAttDate)
    );
    setAttendanceList([newRecord, ...filtered]);
  };

  const handleAddFacultyChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapter.chapterTitle.trim()) return;
    const batchObj = batches.find((b) => b.id === newChapter.batchId) || batches[0];
    const item: FacultyChapter = {
      id: `FC-${Date.now()}`,
      facultyName: newChapter.facultyName,
      phone: newChapter.phone,
      grade: batchObj.grade,
      batchId: batchObj.id,
      batchName: batchObj.name,
      subject: newChapter.subject,
      chapterNo: Number(newChapter.chapterNo),
      chapterTitle: newChapter.chapterTitle,
      totalPortions: Number(newChapter.totalPortions),
      completedPortions: Number(newChapter.completedPortions),
      topicsCovered: newChapter.topicsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status:
        Number(newChapter.completedPortions) >= Number(newChapter.totalPortions)
          ? "Completed"
          : "In Progress",
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setFacultyChapters([item, ...facultyChapters]);
    setNewChapter({ ...newChapter, chapterTitle: "", topicsText: "" });
  };

  const handleUpdatePortion = (id: string, delta: number) => {
    setFacultyChapters(
      facultyChapters.map((fc) => {
        if (fc.id !== id) return fc;
        const nextVal = Math.max(0, Math.min(fc.totalPortions, fc.completedPortions + delta));
        return {
          ...fc,
          completedPortions: nextVal,
          status: nextVal === fc.totalPortions ? "Completed" : nextVal === 0 ? "Not Started" : "In Progress",
          lastUpdated: new Date().toISOString().split("T")[0],
        };
      })
    );
  };

  const handleSubmitExam = (exam: Exam) => {
    let score = 0;
    const ansArray: number[] = [];
    exam.questions.forEach((q, idx) => {
      const chosen = examAnswers[idx] ?? -1;
      ansArray.push(chosen);
      if (chosen === q.correctAnswerIndex) {
        score += q.marks;
      }
    });
    const stu = students.find((s) => s.id === selectedStudentForExam) || students[0];
    const percentage = Math.round((score / exam.totalMarks) * 100);
    const attempt: ExamAttempt = {
      id: `AT-${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      subject: exam.subject,
      studentId: stu.id,
      studentName: stu.name,
      grade: stu.grade,
      date: new Date().toISOString().split("T")[0],
      score,
      totalMarks: exam.totalMarks,
      percentage,
      answers: ansArray,
    };
    setAttempts([attempt, ...attempts]);
    setSubmittedAttempt(attempt);
  };

  const handleAddQuestionToExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamForm.title.trim() || !newExamForm.questionText.trim()) return;
    const newExam: Exam = {
      id: `EX-${Date.now()}`,
      title: newExamForm.title,
      subject: newExamForm.subject,
      grade: newExamForm.grade,
      batchId: newExamForm.batchId,
      date: new Date().toISOString().split("T")[0],
      durationMinutes: Number(newExamForm.durationMinutes),
      totalMarks: Number(newExamForm.marks),
      createdBy: newExamForm.createdBy,
      questions: [
        {
          id: `Q-${Date.now()}`,
          question: newExamForm.questionText,
          options: [newExamForm.optA, newExamForm.optB, newExamForm.optC, newExamForm.optD],
          correctAnswerIndex: Number(newExamForm.correctIdx),
          marks: Number(newExamForm.marks),
        },
      ],
    };
    setExams([newExam, ...exams]);
    setNewExamForm({
      ...newExamForm,
      title: "",
      questionText: "",
      optA: "",
      optB: "",
      optC: "",
      optD: "",
    });
  };

  const handleAddLiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLiveForm.title.trim() || !newLiveForm.youtubeUrl.trim()) return;
    const batchObj = batches.find((b) => b.id === newLiveForm.batchId) || batches[0];
    const created: LiveClass = {
      id: `LC-${Date.now()}`,
      title: newLiveForm.title,
      subject: newLiveForm.subject,
      grade: batchObj.grade,
      batchId: batchObj.id,
      batchName: batchObj.name,
      facultyName: newLiveForm.facultyName,
      youtubeUrl: newLiveForm.youtubeUrl,
      scheduledDate: newLiveForm.scheduledDate,
      scheduledTime: newLiveForm.scheduledTime,
      isLive: true,
    };
    setLiveClasses([created, ...liveClasses]);
    setActiveLiveClass(created);
    setNewLiveForm({ ...newLiveForm, title: "", youtubeUrl: "" });
  };

  const handleRecordFeePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (feePaymentAmount <= 0) return;
    setStudents(
      students.map((stu) => {
        if (stu.id !== selectedFeeStudentId) return stu;
        const newPaid = stu.paidFee + Number(feePaymentAmount);
        return {
          ...stu,
          paidFee: newPaid,
          feeHistory: [
            {
              id: `FH-${Date.now()}`,
              date: new Date().toISOString().split("T")[0],
              amount: Number(feePaymentAmount),
              mode: feePaymentMode,
              receiptNo: `RCP-${Math.floor(1000 + Math.random() * 9000)}`,
              collectedBy: role === "admin" ? "Admin Office" : "Class Teacher",
            },
            ...stu.feeHistory,
          ],
        };
      })
    );
  };

  const handleAddQuestionBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQB.title.trim() || !newQB.qText.trim()) return;
    const item: QuestionBankItem = {
      id: `QB-${Date.now()}`,
      title: newQB.title,
      grade: newQB.grade,
      subject: newQB.subject,
      chapter: newQB.chapter || "Chapter 1",
      type: newQB.type,
      uploadedBy: newQB.uploadedBy,
      uploadedDate: new Date().toISOString().split("T")[0],
      questionsList: [
        {
          q: newQB.qText,
          a: newQB.aText,
          marks: Number(newQB.marks),
        },
      ],
    };
    setQuestionBank([item, ...questionBank]);
    setNewQB({ ...newQB, title: "", qText: "", aText: "" });
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : "JfVOs4VSpmA";
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const navItems = [
    { id: "dashboard", label: "1. ഡാഷ്‌ബോർഡ് (Dashboard)", icon: "📊" },
    { id: "students", label: "2. സ്റ്റുഡന്റ്സ് & ബാച്ച് (Students Data)", icon: "👨‍🎓" },
    { id: "attendance", label: "3. അറ്റൻഡൻസ് (Batch Attendance)", icon: "✅" },
    { id: "faculties", label: "4. ഫാക്കൽറ്റീസ് & ചാപ്റ്റർ (Syllabus)", icon: "👩‍🏫" },
    { id: "exam", label: "5. എക്സാം (Online MCQ Exam)", icon: "📝" },
    { id: "exam_report", label: "6. എക്സാം റിപ്പോർട്ട് (AI Graph Report)", icon: "🤖" },
    { id: "live_class", label: "7. ലൈവ് ക്ലാസ് (YouTube Live)", icon: "🎥" },
    { id: "student_fee", label: "8. സ്റ്റുഡന്റ് ഫീ (Student Fee Ledger)", icon: "💳" },
    { id: "fee_report", label: "9. ഫീ റിപ്പോർട്ട് (Institution Fee Report)", icon: "📈" },
    { id: "communication", label: "10. കമ്മ്യൂണിക്കേഷൻ (WhatsApp)", icon: "💬" },
    { id: "question_bank", label: "11. ക്വസ്റ്റ്യൻ ബാങ്ക് (Question Bank)", icon: "📚" },
  ];

  // AI Analysis Generator for Exam Report
  const selectedReportStudent = students.find((s) => s.id === reportStudentId) || students[0];
  const studentAttempts = attempts.filter((a) => a.studentId === selectedReportStudent?.id);
  const overallAvgPercentage =
    studentAttempts.length > 0
      ? Math.round(studentAttempts.reduce((acc, a) => acc + a.percentage, 0) / studentAttempts.length)
      : 0;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-indigo-950 text-white flex-shrink-0 flex flex-col justify-between shadow-xl">
        <div>
          <div className="p-5 border-b border-indigo-800/80">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-indigo-950 shadow">
                🎓
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight text-white">കേരള ട്യൂഷൻ ഹബ്ബ്</h1>
                <p className="text-xs text-indigo-300">Govt. School Classes 8, 9 & 10</p>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="mt-4 bg-indigo-900/90 p-1.5 rounded-lg grid grid-cols-3 gap-1 text-xs">
              {(["admin", "teacher", "student"] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-1.5 px-2 rounded-md font-semibold capitalize transition ${
                    role === r
                      ? "bg-amber-400 text-indigo-950 shadow"
                      : "text-indigo-200 hover:bg-indigo-800"
                  }`}
                >
                  {r === "admin" ? "Admin" : r === "teacher" ? "Teacher" : "Student"}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Links */}
          <nav className="p-3 space-y-1 max-h-[70vh] lg:max-h-none overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition ${
                  activeTab === item.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-indigo-100 hover:bg-indigo-900/70"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-indigo-800/80 text-xs text-indigo-300 space-y-1">
          <div className="font-semibold text-white">📱 Android & iOS Ready</div>
          <p>Web + Native Mobile Sync Active</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-slate-500">
              കേരള സ്റ്റേറ്റ് സിലബസ് (8, 9, 10 ക്ലാസുകൾ) • നിലവിലെ ലോഗിൻ:{" "}
              <span className="font-semibold uppercase text-indigo-600">{role}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs font-medium">
              {["ALL", "8", "9", "10"].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGradeFilter(g)}
                  className={`px-3 py-1.5 rounded-md transition ${
                    selectedGradeFilter === g
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {g === "ALL" ? "എല്ലാ ക്ലാസും" : `Class ${g}`}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          {/* ==================== 1. DASHBOARD ==================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">ആകെ കുട്ടികൾ (Total Students)</p>
                      <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{metrics.totalStudents}</h3>
                    </div>
                    <span className="p-3 bg-indigo-50 text-indigo-600 rounded-xl text-xl">👨‍🎓</span>
                  </div>
                  <div className="mt-3 flex gap-2 text-xs text-slate-600">
                    <span className="px-2 py-0.5 bg-slate-100 rounded">10th: {metrics.class10Count}</span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded">9th: {metrics.class9Count}</span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded">8th: {metrics.class8Count}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">സജീവ ബാച്ചുകൾ & ഹാജർ</p>
                      <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{metrics.avgAttendance}%</h3>
                    </div>
                    <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-xl">✅</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    ആകെ {batches.length} ബാച്ചുകൾ • ഇന്നത്തെ ഹാജർ രേഖപ്പെടുത്തി
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">പിരിഞ്ഞുകിട്ടിയ ഫീസ് (Paid)</p>
                      <h3 className="text-3xl font-extrabold text-indigo-600 mt-1">
                        ₹{metrics.totalFeeCollected.toLocaleString("en-IN")}
                      </h3>
                    </div>
                    <span className="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl">💰</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    ആകെ ഫീസ്: ₹{metrics.totalFeeExpected.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase">ബാക്കി കിട്ടാനുള്ള ഫീസ് (Pending)</p>
                      <h3 className="text-3xl font-extrabold text-rose-600 mt-1">
                        ₹{metrics.totalFeePending.toLocaleString("en-IN")}
                      </h3>
                    </div>
                    <span className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xl">⏳</span>
                  </div>
                  <p className="mt-3 text-xs text-rose-600 font-medium">
                    {metrics.studentsWithBalance.length} കുട്ടികൾ ഫീസ് അടയ്ക്കാൻ ബാക്കിയുണ്ട്
                  </p>
                </div>
              </div>

              {/* Quick Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Batches Overview */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800">📚 ക്ലാസ് ബാച്ചുകളും അധ്യാപകരും (Batches Overview)</h3>
                    <button
                      onClick={() => setActiveTab("attendance")}
                      className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      അറ്റൻഡൻസ് എടുക്കുക →
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                        <tr>
                          <th className="p-3">ബാച്ച് (Batch)</th>
                          <th className="p-3">ക്ലാസ്</th>
                          <th className="p-3">സമയം</th>
                          <th className="p-3">ചുമതലയുള്ള അധ്യാപകൻ</th>
                          <th className="p-3">കുട്ടികൾ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {batches.map((b) => {
                          const count = students.filter((s) => s.batchId === b.id).length;
                          return (
                            <tr key={b.id} className="hover:bg-slate-50">
                              <td className="p-3 font-semibold text-slate-800">{b.name}</td>
                              <td className="p-3">
                                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
                                  Class {b.grade}
                                </span>
                              </td>
                              <td className="p-3 text-slate-600 text-xs">{b.timing}</td>
                              <td className="p-3 text-slate-700">{b.classTeacher}</td>
                              <td className="p-3 font-bold text-slate-900">{count} പേർ</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Live Classes & Shortcuts */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800">🎥 ഇന്നത്തെ ലൈവ് ക്ലാസുകൾ & പരീക്ഷകൾ</h3>
                  <div className="space-y-3">
                    {liveClasses.slice(0, 3).map((lc) => (
                      <div
                        key={lc.id}
                        className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                            {lc.isLive ? "🔴 LIVE NOW" : lc.scheduledTime}
                          </span>
                          <span className="text-xs font-semibold text-indigo-600">Class {lc.grade}</span>
                        </div>
                        <p className="font-semibold text-sm text-slate-800">{lc.title}</p>
                        <p className="text-xs text-slate-500">{lc.facultyName}</p>
                        <button
                          onClick={() => {
                            setActiveLiveClass(lc);
                            setActiveTab("live_class");
                          }}
                          className="mt-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-1.5 px-3 rounded-lg text-center"
                        >
                          ക്ലാസ് കാണുക (Open Live Class)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 2. STUDENTS DATA & BATCHES ==================== */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Add Student Form */}
                <form
                  onSubmit={handleAddStudent}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
                >
                  <h3 className="font-bold text-slate-800 text-base">
                    ➕ പുതിയ കുട്ടിയെ ചേർക്കുക (Add Student to Batch)
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      കുട്ടിയുടെ പേര് (Student Name) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ഉദാ: അർജുൻ കെ. (Arjun K)"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        ഏത് ബാച്ചിലേക്കാണ് ചേരുന്നത്? *
                      </label>
                      <select
                        value={newStudent.batchId}
                        onChange={(e) => {
                          const b = batches.find((x) => x.id === e.target.value);
                          setNewStudent({
                            ...newStudent,
                            batchId: e.target.value,
                            grade: b ? b.grade : "10",
                          });
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      >
                        {batches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">റോൾ നമ്പർ (Roll No)</label>
                      <input
                        type="text"
                        placeholder="10A-05"
                        value={newStudent.rollNo}
                        onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      പഠിക്കുന്ന ഗവൺമെന്റ് സ്കൂൾ (School Name)
                    </label>
                    <input
                      type="text"
                      value={newStudent.schoolName}
                      onChange={(e) => setNewStudent({ ...newStudent, schoolName: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        രക്ഷിതാവിന്റെ പേര് (Parent)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="രമേശൻ"
                        value={newStudent.parentName}
                        onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        വാട്സാപ്പ് നമ്പർ (WhatsApp)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="919847000000"
                        value={newStudent.parentPhone}
                        onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      ആരാണ് കുട്ടിയെ ചേർത്തത്? (Added By Staff/Admin) *
                    </label>
                    <input
                      type="text"
                      required
                      value={newStudent.addedBy}
                      onChange={(e) => setNewStudent({ ...newStudent, addedBy: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-indigo-50/40"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">ആകെ ഫീസ് (₹)</label>
                      <input
                        type="number"
                        value={newStudent.totalFee}
                        onChange={(e) => setNewStudent({ ...newStudent, totalFee: Number(e.target.value) })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">അടച്ച ഫീസ് (₹)</label>
                      <input
                        type="number"
                        value={newStudent.paidFee}
                        onChange={(e) => setNewStudent({ ...newStudent, paidFee: Number(e.target.value) })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow"
                  >
                    കുട്ടിയെ ബാച്ചിലേക്ക് ചേർക്കുക (Save Student)
                  </button>
                </form>

                {/* Students List Table */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h3 className="font-bold text-slate-800">
                      👨‍🎓 കുട്ടികളുടെ വിവരങ്ങൾ (Students Directory - {students.length})
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                        <tr>
                          <th className="p-3">Roll & പേര്</th>
                          <th className="p-3">ക്ലാസ് & ബാച്ച് (Batch)</th>
                          <th className="p-3">സ്കൂൾ & രക്ഷിതാവ്</th>
                          <th className="p-3">ആരാണ് ചേർത്തത് (Added By)</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {students
                          .filter((s) => selectedGradeFilter === "ALL" || s.grade === selectedGradeFilter)
                          .map((stu) => (
                            <tr key={stu.id} className="hover:bg-slate-50">
                              <td className="p-3">
                                <div className="font-bold text-slate-900">{stu.name}</div>
                                <div className="text-xs text-slate-500">Roll: {stu.rollNo}</div>
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs font-bold">
                                  Class {stu.grade}
                                </span>
                                <div className="text-xs font-medium text-slate-700 mt-1">{stu.batchName}</div>
                              </td>
                              <td className="p-3 text-xs">
                                <div className="font-medium text-slate-800">{stu.schoolName}</div>
                                <div className="text-slate-500">
                                  Parent: {stu.parentName} ({stu.parentPhone})
                                </div>
                              </td>
                              <td className="p-3">
                                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold">
                                  👤 {stu.addedBy}
                                </span>
                                <div className="text-[11px] text-slate-400 mt-0.5">Joined: {stu.joinedDate}</div>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleRemoveStudent(stu.id)}
                                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-semibold"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Create New Batch Sub-form */}
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-500 mb-3">
                      പുതിയ ബാച്ച് നിർമ്മിക്കുക (Create New Class Batch)
                    </h4>
                    <form onSubmit={handleAddBatch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <input
                        type="text"
                        placeholder="ബാച്ചിന്റെ പേര് (e.g. Class 10 Batch C)"
                        value={newBatch.name}
                        onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                        className="border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      />
                      <select
                        value={newBatch.grade}
                        onChange={(e) => setNewBatch({ ...newBatch, grade: e.target.value as ClassGrade })}
                        className="border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      >
                        <option value="10">Class 10 (SSLC)</option>
                        <option value="9">Class 9</option>
                        <option value="8">Class 8</option>
                      </select>
                      <input
                        type="text"
                        placeholder="ക്ലാസ് ടീച്ചറുടെ പേര്"
                        value={newBatch.classTeacher}
                        onChange={(e) => setNewBatch({ ...newBatch, classTeacher: e.target.value })}
                        className="border border-slate-300 rounded-lg px-3 py-2 text-xs"
                      />
                      <button
                        type="submit"
                        className="bg-slate-800 hover:bg-slate-900 text-white rounded-lg px-4 py-2 text-xs font-semibold"
                      >
                        + ബാച്ച് ചേർക്കുക
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 3. BATCH-WISE ATTENDANCE ==================== */}
          {activeTab === "attendance" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        1. ബാച്ച് / ക്ലാസ് തിരഞ്ഞെടുക്കുക (Select Batch)
                      </label>
                      <select
                        value={selectedAttBatchId}
                        onChange={(e) => setSelectedAttBatchId(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold bg-indigo-50/50"
                      >
                        {batches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} (Class {b.grade})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">2. തീയതി (Date)</label>
                      <input
                        type="date"
                        value={selectedAttDate}
                        onChange={(e) => setSelectedAttDate(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        3. അറ്റൻഡൻസ് എടുക്കുന്ന അധ്യാപകൻ
                      </label>
                      <input
                        type="text"
                        value={attMarkedBy}
                        onChange={(e) => setAttMarkedBy(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveAttendance}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow"
                  >
                    ✅ അറ്റൻഡൻസ് സേവ് ചെയ്യുക (Save Attendance)
                  </button>
                </div>

                {/* Students in Selected Batch */}
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-3">
                    ബാച്ചിലെ കുട്ടികൾ ({students.filter((s) => s.batchId === selectedAttBatchId).length} പേർ)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {students
                      .filter((s) => s.batchId === selectedAttBatchId)
                      .map((stu) => {
                        const currentStatus = draftAttendance[stu.id] || "Present";
                        return (
                          <div
                            key={stu.id}
                            className="p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-slate-50/60"
                          >
                            <div>
                              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                {stu.rollNo}
                              </span>
                              <p className="font-bold text-slate-900 mt-1">{stu.name}</p>
                              <p className="text-xs text-slate-500">Parent: {stu.parentName}</p>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {(["Present", "Absent", "Late"] as const).map((st) => (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() =>
                                    setDraftAttendance({
                                      ...draftAttendance,
                                      [stu.id]: st,
                                    })
                                  }
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                    currentStatus === st
                                      ? st === "Present"
                                        ? "bg-emerald-600 text-white shadow"
                                        : st === "Absent"
                                        ? "bg-rose-600 text-white shadow"
                                        : "bg-amber-500 text-white shadow"
                                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                                  }`}
                                >
                                  {st === "Present" ? "Present" : st === "Absent" ? "Absent" : "Late"}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Attendance History */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800">📜 അറ്റൻഡൻസ് ഹിസ്റ്ററി (Batch Attendance History)</h3>
                <div className="space-y-4">
                  {attendanceList.map((att) => {
                    const presentCount = att.records.filter((r) => r.status === "Present").length;
                    const absentRecords = att.records.filter((r) => r.status === "Absent");
                    return (
                      <div key={att.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div>
                            <span className="font-bold text-slate-900">{att.batchName}</span>
                            <span className="ml-2 text-xs text-slate-500">• തീയതി: {att.date}</span>
                            <span className="ml-2 text-xs text-indigo-600 font-medium">
                              (Marked by: {att.markedBy})
                            </span>
                          </div>
                          <div className="flex gap-2 text-xs font-bold">
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                              Present: {presentCount}/{att.records.length}
                            </span>
                            <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg">
                              Absent: {absentRecords.length}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {att.records.map((r) => (
                            <span
                              key={r.studentId}
                              className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                                r.status === "Present"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : r.status === "Absent"
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {r.rollNo} - {r.studentName}: <b>{r.status}</b>
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 4. FACULTIES & CHAPTERS ==================== */}
          {activeTab === "faculties" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Faculty & Chapter Progress Form */}
              <form
                onSubmit={handleAddFacultyChapter}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800">
                  👩‍🏫 അധ്യാപകരും ചാപ്റ്റർ പുരോഗതിയും ചേർക്കുക
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">അധ്യാപകന്റെ പേര് *</label>
                  <input
                    type="text"
                    required
                    value={newChapter.facultyName}
                    onChange={(e) => setNewChapter({ ...newChapter, facultyName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ബാച്ച് (Batch)</label>
                  <select
                    value={newChapter.batchId}
                    onChange={(e) => setNewChapter({ ...newChapter, batchId: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">വിഷയം (Subject)</label>
                    <input
                      type="text"
                      required
                      value={newChapter.subject}
                      onChange={(e) => setNewChapter({ ...newChapter, subject: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Chapter No.</label>
                    <input
                      type="number"
                      value={newChapter.chapterNo}
                      onChange={(e) => setNewChapter({ ...newChapter, chapterNo: Number(e.target.value) })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    ചാപ്റ്ററിന്റെ പേര് (Chapter Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ഉദാ: ബഹുപദങ്ങൾ (Polynomials)"
                    value={newChapter.chapterTitle}
                    onChange={(e) => setNewChapter({ ...newChapter, chapterTitle: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">ആകെ ഭാഗങ്ങൾ (Total Topics)</label>
                    <input
                      type="number"
                      value={newChapter.totalPortions}
                      onChange={(e) => setNewChapter({ ...newChapter, totalPortions: Number(e.target.value) })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      എടുത്ത ഭാഗങ്ങൾ (Completed)
                    </label>
                    <input
                      type="number"
                      value={newChapter.completedPortions}
                      onChange={(e) => setNewChapter({ ...newChapter, completedPortions: Number(e.target.value) })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    പഠിപ്പിച്ച ഭാഗങ്ങൾ (Topics Covered - കോമയിട്ട് എഴുതുക)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ഉദാ: ആമുഖം, സമവാക്യങ്ങൾ, പ്രോബ്ലംസ്"
                    value={newChapter.topicsText}
                    onChange={(e) => setNewChapter({ ...newChapter, topicsText: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow"
                >
                  ചാപ്റ്റർ വിവരങ്ങൾ ചേർക്കുക
                </button>
              </form>

              {/* Syllabus Progress List */}
              <div className="lg:col-span-2 space-y-4">
                {facultyChapters
                  .filter((f) => selectedGradeFilter === "ALL" || f.grade === selectedGradeFilter)
                  .map((fc) => {
                    const pct = Math.round((fc.completedPortions / fc.totalPortions) * 100);
                    return (
                      <div key={fc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">
                                Class {fc.grade}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">{fc.batchName}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-base mt-1">
                              {fc.subject} — Chapter {fc.chapterNo}: {fc.chapterTitle}
                            </h4>
                            <p className="text-xs text-slate-600">
                              👩‍🏫 അധ്യാപകൻ: <b>{fc.facultyName}</b> • അവസാനമായി പുതുക്കിയത്: {fc.lastUpdated}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdatePortion(fc.id, -1)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold"
                            >
                              -1
                            </button>
                            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                              {fc.completedPortions} / {fc.totalPortions} ഭാഗങ്ങൾ ({pct}%)
                            </span>
                            <button
                              onClick={() => handleUpdatePortion(fc.id, 1)}
                              className="px-2.5 py-1 bg-indigo-600 text-white hover:bg-indigo-700 rounded text-xs font-bold"
                            >
                              +1 Portion
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              pct === 100 ? "bg-emerald-500" : "bg-indigo-600"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        {/* Topics Covered */}
                        <div className="pt-1">
                          <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                            എടുത്ത ഭാഗങ്ങൾ (Topics Covered):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {fc.topicsCovered.map((topic, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                              >
                                ✓ {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ==================== 5. ONLINE EXAM (MCQ + INSTANT SCORE) ==================== */}
          {activeTab === "exam" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Create Exam Question (Teacher/Admin) */}
              <form
                onSubmit={handleAddQuestionToExam}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3"
              >
                <h3 className="font-bold text-slate-800">📝 പുതിയ പരീക്ഷ / ചോദ്യം അപ്‌ലോഡ് ചെയ്യുക</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">പരീക്ഷയുടെ പേര് *</label>
                  <input
                    type="text"
                    required
                    placeholder="ഉദാ: SSLC Maths Chapter 2 Test"
                    value={newExamForm.title}
                    onChange={(e) => setNewExamForm({ ...newExamForm, title: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">ക്ലാസ്</label>
                    <select
                      value={newExamForm.grade}
                      onChange={(e) => setNewExamForm({ ...newExamForm, grade: e.target.value as ClassGrade })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="10">Class 10</option>
                      <option value="9">Class 9</option>
                      <option value="8">Class 8</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">വിഷയം</label>
                    <input
                      type="text"
                      value={newExamForm.subject}
                      onChange={(e) => setNewExamForm({ ...newExamForm, subject: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ചോദ്യം (Question) *</label>
                  <textarea
                    rows={2}
                    required
                    value={newExamForm.questionText}
                    onChange={(e) => setNewExamForm({ ...newExamForm, questionText: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Option A"
                    value={newExamForm.optA}
                    onChange={(e) => setNewExamForm({ ...newExamForm, optA: e.target.value })}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Option B"
                    value={newExamForm.optB}
                    onChange={(e) => setNewExamForm({ ...newExamForm, optB: e.target.value })}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Option C"
                    value={newExamForm.optC}
                    onChange={(e) => setNewExamForm({ ...newExamForm, optC: e.target.value })}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Option D"
                    value={newExamForm.optD}
                    onChange={(e) => setNewExamForm({ ...newExamForm, optD: e.target.value })}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">ശരിയുത്തരം</label>
                    <select
                      value={newExamForm.correctIdx}
                      onChange={(e) => setNewExamForm({ ...newExamForm, correctIdx: Number(e.target.value) })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    >
                      <option value={0}>Option A</option>
                      <option value={1}>Option B</option>
                      <option value={2}>Option C</option>
                      <option value={3}>Option D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">മാർക്ക്</label>
                    <input
                      type="number"
                      value={newExamForm.marks}
                      onChange={(e) => setNewExamForm({ ...newExamForm, marks: Number(e.target.value) })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow"
                >
                  പരീക്ഷ അപ്‌ലോഡ് ചെയ്യുക
                </button>
              </form>

              {/* Right: Live Student Exam Portal & Instant Score */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <h3 className="font-bold text-slate-800">
                      🎯 ഓൺലൈൻ പരീക്ഷ എഴുതുക (Student Live Exam & Instant Marks)
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">പരീക്ഷ എഴുതുന്ന കുട്ടി:</span>
                      <select
                        value={selectedStudentForExam}
                        onChange={(e) => setSelectedStudentForExam(e.target.value)}
                        className="border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-bold"
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} (Class {s.grade})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Exam List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exams.map((ex) => (
                      <div
                        key={ex.id}
                        className={`p-4 rounded-xl border transition cursor-pointer ${
                          activeExamId === ex.id
                            ? "border-indigo-600 bg-indigo-50/40"
                            : "border-slate-200 hover:border-indigo-300"
                        }`}
                        onClick={() => {
                          setActiveExamId(ex.id);
                          setExamAnswers({});
                          setSubmittedAttempt(null);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs font-bold">
                            Class {ex.grade} • {ex.subject}
                          </span>
                          <span className="text-xs font-bold text-slate-600">{ex.totalMarks} Marks</span>
                        </div>
                        <h4 className="font-bold text-slate-900 mt-1.5 text-sm">{ex.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                          ചോദ്യങ്ങൾ: {ex.questions.length} • സമയം: {ex.durationMinutes} മിനിറ്റ്
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Active Exam Questions */}
                  {activeExamId &&
                    (() => {
                      const currentExam = exams.find((e) => e.id === activeExamId);
                      if (!currentExam) return null;
                      return (
                        <div className="mt-6 pt-6 border-t border-slate-200 space-y-5">
                          <div className="bg-indigo-900 text-white p-4 rounded-xl flex justify-between items-center">
                            <div>
                              <h4 className="font-bold">{currentExam.title}</h4>
                              <p className="text-xs text-indigo-200">
                                ഓരോ ചോദ്യത്തിനും ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കുക. സബ്മിറ്റ് ചെയ്യുമ്പോൾ തന്നെ മാർക്ക് കാണാം.
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-amber-400 text-indigo-950 rounded-lg text-xs font-extrabold">
                              Max: {currentExam.totalMarks} Marks
                            </span>
                          </div>

                          {submittedAttempt && (
                            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 flex flex-wrap justify-between items-center gap-4">
                              <div>
                                <span className="text-xs font-bold uppercase bg-emerald-200 px-2.5 py-0.5 rounded-full">
                                  🎉 Instant Exam Result
                                </span>
                                <h4 className="text-xl font-extrabold mt-1">
                                  {submittedAttempt.studentName} നേടിയ മാർക്ക്: {submittedAttempt.score} /{" "}
                                  {submittedAttempt.totalMarks} ({submittedAttempt.percentage}%)
                                </h4>
                                <p className="text-xs text-emerald-800 mt-0.5">
                                  ഈ മാർക്ക് എക്സാമിനേഷൻ റിപ്പോർട്ടിലേക്ക് (AI Report) ഓട്ടോമാറ്റിക് ആയി ചേർക്കപ്പെട്ടിട്ടുണ്ട്!
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  setReportStudentId(submittedAttempt.studentId);
                                  setActiveTab("exam_report");
                                }}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold"
                              >
                                AI ഗ്രാഫിക്കൽ റിപ്പോർട്ട് കാണുക →
                              </button>
                            </div>
                          )}

                          <div className="space-y-4">
                            {currentExam.questions.map((q, qIdx) => (
                              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                                <div className="flex justify-between">
                                  <p className="font-bold text-sm text-slate-900">
                                    {qIdx + 1}. {q.question}
                                  </p>
                                  <span className="text-xs font-semibold text-indigo-600">{q.marks} Marks</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {q.options.map((opt, oIdx) => {
                                    const isSelected = examAnswers[qIdx] === oIdx;
                                    const showCorrect = submittedAttempt && q.correctAnswerIndex === oIdx;
                                    const showWrong =
                                      submittedAttempt && isSelected && q.correctAnswerIndex !== oIdx;
                                    return (
                                      <button
                                        key={oIdx}
                                        type="button"
                                        onClick={() =>
                                          !submittedAttempt &&
                                          setExamAnswers({ ...examAnswers, [qIdx]: oIdx })
                                        }
                                        className={`p-2.5 rounded-lg border text-left text-xs font-medium transition ${
                                          showCorrect
                                            ? "bg-emerald-100 border-emerald-600 text-emerald-950 font-bold"
                                            : showWrong
                                            ? "bg-rose-100 border-rose-600 text-rose-950"
                                            : isSelected
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white border-slate-200 hover:bg-slate-100"
                                        }`}
                                      >
                                        {String.fromCharCode(65 + oIdx)}. {opt}
                                      </button>
                                    );
                                  })}
                                </div>
                                {submittedAttempt && q.explanation && (
                                  <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded">
                                    💡 വിശദീകരണം: {q.explanation}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>

                          {!submittedAttempt && (
                            <button
                              type="button"
                              onClick={() => handleSubmitExam(currentExam)}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm shadow-lg"
                            >
                              ✅ പരീക്ഷ സബ്മിറ്റ് ചെയ്ത് ഇപ്പോൾ തന്നെ മാർക്ക് കാണുക (Submit & View Score)
                            </button>
                          )}
                        </div>
                      );
                    })()}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 6. AI EXAM GRAPHICAL REPORT ==================== */}
          {activeTab === "exam_report" && (
            <div className="space-y-6">
              {/* Student Selector */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    🤖 AI എക്സാമിനേഷൻ ഗ്രാഫിക്കൽ റിപ്പോർട്ട് (AI Student Performance Analytics)
                  </h3>
                  <p className="text-xs text-slate-500">
                    കുട്ടിയുടെ മുൻ പരീക്ഷകളിലെ മാർക്കുകൾ ക്രോഡീകരിച്ച് AI തയ്യാറാക്കുന്ന ഗ്രാഫും നിലവാര പരിശോധനയും
                  </p>
                </div>
                <select
                  value={reportStudentId}
                  onChange={(e) => setReportStudentId(e.target.value)}
                  className="border-2 border-indigo-600 rounded-xl px-4 py-2 text-sm font-bold bg-indigo-50/40"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Class {s.grade} - {s.rollNo})
                    </option>
                  ))}
                </select>
              </div>

              {/* AI Summary & Graphical Bars */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Graphical Representation */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-800">
                      📊 ഓരോ പരീക്ഷയിലെയും മാർക്ക് ഗ്രാഫ് (Exam-wise Score Graph)
                    </h4>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-extrabold">
                      ശരാശരി (Average): {overallAvgPercentage}%
                    </span>
                  </div>

                  {studentAttempts.length === 0 ? (
                    <p className="text-sm text-slate-500 py-8 text-center">
                      ഈ കുട്ടി ഇതുവരെ പരീക്ഷകൾ എഴുതിയിട്ടില്ല. Exam ടാബിൽ പോയി ഒരു പരീക്ഷ സബ്മിറ്റ് ചെയ്യുക.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {studentAttempts.map((att) => (
                        <div key={att.id} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-800">
                              {att.examTitle} ({att.date})
                            </span>
                            <span className="text-indigo-700 font-bold">
                              {att.score}/{att.totalMarks} ({att.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-6 rounded-xl overflow-hidden flex items-center p-0.5">
                            <div
                              className={`h-full rounded-lg transition-all flex items-center justify-end pr-2 text-[10px] font-bold text-white ${
                                att.percentage >= 85
                                  ? "bg-emerald-500"
                                  : att.percentage >= 65
                                  ? "bg-indigo-500"
                                  : "bg-amber-500"
                              }`}
                              style={{ width: `${Math.max(att.percentage, 10)}%` }}
                            >
                              {att.percentage}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Evaluation Box */}
                <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <h4 className="font-bold text-amber-400">AI പഠന നിലവാര അവലോകനം</h4>
                      <p className="text-[11px] text-indigo-200">Smart AI Academic Evaluator</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/10 space-y-2 text-xs leading-relaxed">
                    <p>
                      <b className="text-amber-300">കുട്ടിയുടെ പേര്:</b> {selectedReportStudent?.name}
                    </p>
                    <p>
                      <b className="text-amber-300">നിലവിലെ ഗ്രേഡ് നിലവാരം:</b>{" "}
                      {overallAvgPercentage >= 85
                        ? "🌟 A+ Grade (വളരെ മികച്ച നിലവാരം)"
                        : overallAvgPercentage >= 70
                        ? "✅ A Grade (നല്ല നിലവാരം)"
                        : "⚠️ B Grade (കൂടുതൽ ശ്രദ്ധ ആവശ്യമാണ്)"}
                    </p>
                    <p className="text-indigo-100">
                      {overallAvgPercentage >= 85
                        ? "കഴിഞ്ഞ പരീക്ഷകളിലെ മാർക്കുകൾ പരിശോധിക്കുമ്പോൾ ഗണിതത്തിലും സയൻസ് വിഷയങ്ങളിലും കുട്ടി സ്ഥിരതയാർന്ന ഉയർന്ന വിജയം കൈവരിക്കുന്നുണ്ട്. SSLC/വാർഷിക പരീക്ഷയിൽ മുഴുവൻ വിഷയങ്ങളിലും A+ നേടാൻ സാധിക്കും."
                        : "അടിസ്ഥാന ആശയങ്ങളിൽ കുട്ടിക്ക് നല്ല അറിവുണ്ട്. എന്നാൽ ചില വിഷയങ്ങളിൽ (പ്രത്യേകിച്ച് സമവാക്യങ്ങളും പ്രോബ്ലംസും) കൂടുതൽ റിവിഷനും മോഡൽ പരീക്ഷകളും നൽകുന്നത് മാർക്ക് 90%-ത്തിന് മുകളിലെത്തിക്കാൻ സഹായിക്കും."}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${selectedReportStudent?.parentPhone}?text=${encodeURIComponent(
                      `നമസ്കാരം ${selectedReportStudent?.parentName}, കേരള ട്യൂഷൻ സെന്ററിൽ നിന്നുള്ള ${selectedReportStudent?.name}-ന്റെ AI പരീക്ഷാ പ്രോഗ്രസ് റിപ്പോർട്ട്: ശരാശരി മാർക്ക് ${overallAvgPercentage}%. ആകെ എഴുതിയ പരീക്ഷകൾ: ${studentAttempts.length}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow"
                  >
                    📲 രക്ഷിതാവിന് വാട്സാപ്പിൽ AI റിപ്പോർട്ട് അയക്കുക
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 7. YOUTUBE LIVE CLASS ==================== */}
          {activeTab === "live_class" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Upload YouTube Live Link */}
              <form
                onSubmit={handleAddLiveClass}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800">🎥 YouTube ലൈവ് ക്ലാസ് ലിങ്ക് ചേർക്കുക</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ക്ലാസിന്റെ പേര് (Topic) *</label>
                  <input
                    type="text"
                    required
                    placeholder="ഉദാ: SSLC Maths Chapter 3 Live"
                    value={newLiveForm.title}
                    onChange={(e) => setNewLiveForm({ ...newLiveForm, title: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ഏത് ബാച്ചിനുള്ള ക്ലാസാണ്?</label>
                  <select
                    value={newLiveForm.batchId}
                    onChange={(e) => setNewLiveForm({ ...newLiveForm, batchId: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">YouTube Live / Video Link *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={newLiveForm.youtubeUrl}
                    onChange={(e) => setNewLiveForm({ ...newLiveForm, youtubeUrl: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="അധ്യാപകൻ"
                    value={newLiveForm.facultyName}
                    onChange={(e) => setNewLiveForm({ ...newLiveForm, facultyName: e.target.value })}
                    className="border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="സമയം (07:00 PM)"
                    value={newLiveForm.scheduledTime}
                    onChange={(e) => setNewLiveForm({ ...newLiveForm, scheduledTime: e.target.value })}
                    className="border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow"
                >
                  🔴 ലൈവ് ക്ലാസ് ലിങ്ക് പ്രസിദ്ധീകരിക്കുക
                </button>
              </form>

              {/* Right: Embedded Classroom Player & Class Cards */}
              <div className="lg:col-span-2 space-y-4">
                {activeLiveClass && (
                  <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 bg-red-600 text-white rounded text-xs font-bold">
                        🔴 LIVE CLASSROOM — Class {activeLiveClass.grade} ({activeLiveClass.batchName})
                      </span>
                      <a
                        href={activeLiveClass.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-amber-300 hover:underline"
                      >
                        YouTube ആപ്പിൽ തുറക്കുക ↗
                      </a>
                    </div>
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                      <iframe
                        src={getYoutubeEmbedUrl(activeLiveClass.youtubeUrl)}
                        title={activeLiveClass.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{activeLiveClass.title}</h4>
                      <p className="text-xs text-slate-300">
                        അധ്യാപകൻ: {activeLiveClass.facultyName} • സമയം: {activeLiveClass.scheduledDate} (
                        {activeLiveClass.scheduledTime})
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {liveClasses
                    .filter((lc) => selectedGradeFilter === "ALL" || lc.grade === selectedGradeFilter)
                    .map((lc) => (
                      <div
                        key={lc.id}
                        onClick={() => setActiveLiveClass(lc)}
                        className="bg-white p-4 rounded-xl border border-slate-200 hover:border-red-400 cursor-pointer shadow-sm space-y-1.5"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-indigo-600">Class {lc.grade}</span>
                          <span className="text-xs px-2 py-0.5 bg-red-50 text-red-600 rounded font-semibold">
                            ▶ Watch Class
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm">{lc.title}</h5>
                        <p className="text-xs text-slate-500">
                          {lc.batchName} • {lc.facultyName}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 8. STUDENT FEE (INDIVIDUAL BALANCE SHEET) ==================== */}
          {activeTab === "student_fee" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Record Fee Payment */}
              <form
                onSubmit={handleRecordFeePayment}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800">💳 കുട്ടിയുടെ ഫീസ് രേഖപ്പെടുത്തുക</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">കുട്ടിയെ തിരഞ്ഞെടുക്കുക</label>
                  <select
                    value={selectedFeeStudentId}
                    onChange={(e) => setSelectedFeeStudentId(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (Class {s.grade})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">അടയ്ക്കുന്ന തുക (₹)</label>
                  <input
                    type="number"
                    required
                    value={feePaymentAmount}
                    onChange={(e) => setFeePaymentAmount(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Payment Mode</label>
                  <select
                    value={feePaymentMode}
                    onChange={(e) => setFeePaymentMode(e.target.value as "Cash" | "UPI" | "Bank")}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="UPI">Google Pay / PhonePe (UPI)</option>
                    <option value="Cash">Cash (നേരിട്ട്)</option>
                    <option value="Bank">Bank Transfer</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow"
                >
                  ഫീസ് അടച്ചതായി രേഖപ്പെടുത്തുക
                </button>
              </form>

              {/* Individual Student Balance Sheet */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                {(() => {
                  const stu = students.find((s) => s.id === selectedFeeStudentId) || students[0];
                  const netPayable = stu.totalFee - stu.discount;
                  const balance = netPayable - stu.paidFee;
                  return (
                    <>
                      <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-xs font-bold text-indigo-600 uppercase">
                            വ്യക്തിഗത ഫീസ് ബാലൻസ് ഷീറ്റ് (Student Fee Balance Sheet)
                          </span>
                          <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{stu.name}</h3>
                          <p className="text-xs text-slate-500">
                            {stu.batchName} • Roll: {stu.rollNo} • രക്ഷിതാവ്: {stu.parentName}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                            balance <= 0
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {balance <= 0 ? "✅ FULLY PAID" : `⏳ ബാക്കി തരാനുള്ളത്: ₹${balance}`}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-xs text-slate-500">ആകെ ഫീസ് (Total Fee)</span>
                          <p className="text-xl font-extrabold text-slate-900 mt-1">
                            ₹{netPayable.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                          <span className="text-xs text-emerald-700">നൽകിയ തുക (Paid Amount)</span>
                          <p className="text-xl font-extrabold text-emerald-700 mt-1">
                            ₹{stu.paidFee.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                          <span className="text-xs text-rose-700">ഇനി തരാനുള്ള തുക (Balance)</span>
                          <p className="text-xl font-extrabold text-rose-700 mt-1">
                            ₹{balance.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">
                          ഫീസ് അടച്ചതിന്റെ വിവരങ്ങൾ (Payment History)
                        </h4>
                        {stu.feeHistory.length === 0 ? (
                          <p className="text-xs text-slate-500">ഇതുവരെ ഫീസ് ഒന്നും അടച്ചിട്ടില്ല.</p>
                        ) : (
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-50 text-slate-600">
                              <tr>
                                <th className="p-2.5">Receipt No</th>
                                <th className="p-2.5">തീയതി</th>
                                <th className="p-2.5">Mode</th>
                                <th className="p-2.5">തുക (Amount)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {stu.feeHistory.map((fh) => (
                                <tr key={fh.id}>
                                  <td className="p-2.5 font-semibold">{fh.receiptNo}</td>
                                  <td className="p-2.5">{fh.date}</td>
                                  <td className="p-2.5">{fh.mode}</td>
                                  <td className="p-2.5 font-bold text-emerald-700">₹{fh.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ==================== 9. INSTITUTION FEE REPORT ==================== */}
          {activeTab === "fee_report" && (
            <div className="space-y-6">
              {/* Overall Institution Fee Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">മൊത്തം ഫീസ് (Total Expected)</span>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    ₹{metrics.totalFeeExpected.toLocaleString("en-IN")}
                  </p>
                  <span className="text-xs text-slate-500">ആകെ {metrics.totalStudents} കുട്ടികൾ</span>
                </div>

                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm">
                  <span className="text-xs font-semibold text-emerald-800">മുഴുവൻ അടച്ചവർ (Fully Paid)</span>
                  <p className="text-2xl font-extrabold text-emerald-700 mt-1">
                    {metrics.fullyPaidStudents.length} കുട്ടികൾ
                  </p>
                  <span className="text-xs text-emerald-700">
                    ആകെ പിരിഞ്ഞുകിട്ടിയത്: ₹{metrics.totalFeeCollected.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm">
                  <span className="text-xs font-semibold text-amber-800">ബാലൻസ് ഉള്ളവർ (Partial Balance)</span>
                  <p className="text-2xl font-extrabold text-amber-700 mt-1">
                    {metrics.partiallyPaidStudents.length} കുട്ടികൾ
                  </p>
                  <span className="text-xs text-amber-700">ഭാഗികമായി ഫീസ് അടച്ചവർ</span>
                </div>

                <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-sm">
                  <span className="text-xs font-semibold text-rose-800">ഇനി തരാനുള്ള ആകെ തുക (Pending)</span>
                  <p className="text-2xl font-extrabold text-rose-700 mt-1">
                    ₹{metrics.totalFeePending.toLocaleString("en-IN")}
                  </p>
                  <span className="text-xs text-rose-700 font-semibold">
                    ആകെ {metrics.studentsWithBalance.length} കുട്ടികൾ ഫീസ് തരാനുണ്ട്
                  </span>
                </div>
              </div>

              {/* Complete Student-wise Fee Report Table */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800">
                  📈 സ്ഥാപനത്തിലെ മുഴുവൻ കുട്ടികളുടെയും ഫീ റിപ്പോർട്ട് (Complete Institution Fee Report)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                      <tr>
                        <th className="p-3">കുട്ടിയുടെ പേര്</th>
                        <th className="p-3">ബാച്ച്</th>
                        <th className="p-3">ആകെ ഫീസ്</th>
                        <th className="p-3">അടച്ച തുക (Paid)</th>
                        <th className="p-3">ബാക്കി (Balance)</th>
                        <th className="p-3">സ്റ്റാറ്റസ് (Status)</th>
                        <th className="p-3">WhatsApp Reminder</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((s) => {
                        const net = s.totalFee - s.discount;
                        const bal = net - s.paidFee;
                        const status =
                          bal <= 0 ? "Fully Paid" : s.paidFee > 0 ? "Balance Pending" : "Unpaid (Pending)";
                        return (
                          <tr key={s.id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-900">{s.name}</td>
                            <td className="p-3 text-xs text-slate-600">{s.batchName}</td>
                            <td className="p-3 font-semibold">₹{net}</td>
                            <td className="p-3 font-bold text-emerald-700">₹{s.paidFee}</td>
                            <td className="p-3 font-extrabold text-rose-600">₹{bal}</td>
                            <td className="p-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                  bal <= 0
                                    ? "bg-emerald-100 text-emerald-800"
                                    : s.paidFee > 0
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {status}
                              </span>
                            </td>
                            <td className="p-3">
                              {bal > 0 && (
                                <a
                                  href={`https://wa.me/${s.parentPhone}?text=${encodeURIComponent(
                                    `നമസ്കാരം ${s.parentName}, ട്യൂഷൻ സെന്ററിലെ ${s.name}-ന്റെ ആകെ ഫീസ് ₹${net}-ൽ ₹${s.paidFee} അടച്ചിട്ടുണ്ട്. ബാക്കി തുകയായ ₹${bal} ദയവായി ഉടൻ അടയ്ക്കണമെന്ന് അഭ്യർത്ഥിക്കുന്നു.`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold inline-block"
                                >
                                  💬 വാട്സാപ്പ് ഓർമ്മപ്പെടുത്തൽ
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 10. WHATSAPP COMMUNICATION HUB ==================== */}
          {activeTab === "communication" && (
            <div className="space-y-6">
              {/* Batch WhatsApp Groups */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800">
                  💬 വാട്സാപ്പ് ഗ്രൂപ്പ് കമ്മ്യൂണിക്കേഷൻ (Batch-wise Parent WhatsApp Groups)
                </h3>
                <p className="text-xs text-slate-500">
                  അധ്യാപകർക്ക് ഓരോ ബാച്ചിന്റെയും രക്ഷിതാക്കളുടെ വാട്സാപ്പ് ഗ്രൂപ്പിലേക്ക് നേരിട്ട് അറിയിപ്പുകൾ അയക്കാം.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {batches.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-xs font-bold">
                          Class {b.grade} Official WhatsApp Group
                        </span>
                        <h4 className="font-bold text-slate-900 mt-1">{b.name}</h4>
                        <p className="text-xs text-slate-600">ക്ലാസ് ടീച്ചർ: {b.classTeacher}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={b.whatsappGroupLink}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold"
                        >
                          👥 വാട്സാപ്പ് ഗ്രൂപ്പ് തുറക്കുക
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            `📢 അറിയിപ്പ് (${b.name}): പ്രിയ രക്ഷിതാക്കളെ, ഇന്നത്തെ ക്ലാസും പരീക്ഷാ വിവരങ്ങളും ആപ്പിൽ അപ്ഡേറ്റ് ചെയ്തിട്ടുണ്ട്. ക്ലാസ് ടീച്ചർ: ${b.classTeacher}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-3.5 py-2 rounded-lg text-xs font-bold"
                        >
                          📢 ഗ്രൂപ്പിലേക്ക് അറിയിപ്പ് ഷെയർ ചെയ്യുക
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Parent WhatsApp Interaction */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800">
                  👨‍👩‍👧 രക്ഷിതാക്കളുമായി നേരിട്ട് സംസാരിക്കാം (1-Click Parent WhatsApp Messaging)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {students.map((s) => {
                    const bal = s.totalFee - s.discount - s.paidFee;
                    return (
                      <div key={s.id} className="p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                          <p className="text-xs text-slate-500">
                            രക്ഷിതാവ്: {s.parentName} • +{s.parentPhone}
                          </p>
                        </div>
                        <div className="flex gap-1.5">
                          <a
                            href={`https://wa.me/${s.parentPhone}?text=${encodeURIComponent(
                              `നമസ്കാരം ${s.parentName}, ട്യൂഷൻ സെന്ററിൽ നിന്ന് ${s.name}-ന്റെ പഠന വിവരങ്ങൾ അറിയിക്കാൻ ബന്ധപ്പെട്ടതാണ്.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                          >
                            💬 Chat
                          </a>
                          {bal > 0 && (
                            <a
                              href={`https://wa.me/${s.parentPhone}?text=${encodeURIComponent(
                                `നമസ്കാരം ${s.parentName}, ${s.name}-ന്റെ ട്യൂഷൻ ഫീസ് ബാക്കി ₹${bal} അടയ്ക്കാൻ ഓർമ്മിപ്പിക്കുന്നു.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1.5 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold"
                            >
                              Fee Alert
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 11. QUESTION BANK ==================== */}
          {activeTab === "question_bank" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload Question Bank Item */}
              <form
                onSubmit={handleAddQuestionBank}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3"
              >
                <h3 className="font-bold text-slate-800">📚 ക്വസ്റ്റ്യൻ ബാങ്കിലേക്ക് ചോദ്യങ്ങൾ ചേർക്കുക</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">തലക്കെട്ട് (Title) *</label>
                  <input
                    type="text"
                    required
                    placeholder="ഉദാ: SSLC Physics Chapter 2 Sure Questions"
                    value={newQB.title}
                    onChange={(e) => setNewQB({ ...newQB, title: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newQB.grade}
                    onChange={(e) => setNewQB({ ...newQB, grade: e.target.value as ClassGrade })}
                    className="border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  >
                    <option value="10">Class 10 (SSLC)</option>
                    <option value="9">Class 9</option>
                    <option value="8">Class 8</option>
                  </select>
                  <input
                    type="text"
                    placeholder="വിഷയം (Subject)"
                    value={newQB.subject}
                    onChange={(e) => setNewQB({ ...newQB, subject: e.target.value })}
                    className="border border-slate-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <input
                  type="text"
                  placeholder="ചാപ്റ്റർ (e.g. Chapter 2)"
                  value={newQB.chapter}
                  onChange={(e) => setNewQB({ ...newQB, chapter: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="ചോദ്യം (Question) *"
                  value={newQB.qText}
                  onChange={(e) => setNewQB({ ...newQB, qText: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="ഉത്തരം / സൂചന (Answer Key) *"
                  value={newQB.aText}
                  onChange={(e) => setNewQB({ ...newQB, aText: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm shadow"
                >
                  ക്വസ്റ്റ്യൻ ബാങ്കിൽ അപ്‌ലോഡ് ചെയ്യുക
                </button>
              </form>

              {/* View Question Bank */}
              <div className="lg:col-span-2 space-y-4">
                {questionBank
                  .filter((qb) => selectedGradeFilter === "ALL" || qb.grade === selectedGradeFilter)
                  .map((qb) => (
                    <div key={qb.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">
                            Class {qb.grade} • {qb.subject}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-800 rounded font-medium">
                            {qb.type}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          Uploaded by {qb.uploadedBy} ({qb.uploadedDate})
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{qb.title}</h4>
                      <div className="space-y-2.5 pt-2">
                        {qb.questionsList.map((item, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                            <div className="flex justify-between">
                              <p className="font-bold text-xs text-slate-900">{item.q}</p>
                              <span className="text-[11px] font-bold text-indigo-600">{item.marks} Marks</span>
                            </div>
                            <p className="text-xs text-emerald-800 bg-emerald-50/80 p-2 rounded-lg">
                              <b>ഉത്തരം:</b> {item.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
