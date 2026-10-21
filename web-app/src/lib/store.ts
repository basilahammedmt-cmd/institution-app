export type ClassGrade = "8" | "9" | "10";

export type UserRole = "admin" | "teacher" | "student";

export interface Batch {
  id: string;
  name: string;
  grade: ClassGrade;
  timing: string;
  classTeacher: string;
  whatsappGroupLink: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  grade: ClassGrade;
  batchId: string;
  batchName: string;
  schoolName: string;
  parentName: string;
  parentPhone: string; // WhatsApp enabled
  addedBy: string;
  joinedDate: string;
  totalFee: number;
  paidFee: number;
  discount: number;
  feeHistory: {
    id: string;
    date: string;
    amount: number;
    mode: "Cash" | "UPI" | "Bank";
    receiptNo: string;
    collectedBy: string;
  }[];
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  batchId: string;
  batchName: string;
  grade: ClassGrade;
  markedBy: string;
  records: {
    studentId: string;
    studentName: string;
    rollNo: string;
    status: "Present" | "Absent" | "Late";
  }[];
}

export interface FacultyChapter {
  id: string;
  facultyName: string;
  phone: string;
  grade: ClassGrade;
  batchId: string;
  batchName: string;
  subject: string;
  chapterNo: number;
  chapterTitle: string;
  totalPortions: number;
  completedPortions: number;
  topicsCovered: string[];
  status: "Completed" | "In Progress" | "Not Started";
  lastUpdated: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswerIndex: number; // 0-3
  marks: number;
  explanation?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  grade: ClassGrade;
  batchId: string;
  date: string;
  durationMinutes: number;
  totalMarks: number;
  createdBy: string;
  questions: ExamQuestion[];
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  subject: string;
  studentId: string;
  studentName: string;
  grade: ClassGrade;
  date: string;
  score: number;
  totalMarks: number;
  percentage: number;
  answers: number[]; // index selected for each question
}

export interface LiveClass {
  id: string;
  title: string;
  subject: string;
  grade: ClassGrade;
  batchId: string;
  batchName: string;
  facultyName: string;
  youtubeUrl: string;
  scheduledDate: string;
  scheduledTime: string;
  isLive: boolean;
}

export interface QuestionBankItem {
  id: string;
  title: string;
  grade: ClassGrade;
  subject: string;
  chapter: string;
  type: "Previous Year Paper" | "Chapter Notes & Q&A" | "Model Exam Paper";
  uploadedBy: string;
  uploadedDate: string;
  questionsList: {
    q: string;
    a: string;
    marks: number;
  }[];
}

export const INITIAL_BATCHES: Batch[] = [
  {
    id: "B10-A",
    name: "SSLC (Class 10) - Batch A (Morning)",
    grade: "10",
    timing: "06:30 AM - 08:30 AM",
    classTeacher: "അനിൽ കുമാർ മാസ്റ്റർ (Maths)",
    whatsappGroupLink: "https://chat.whatsapp.com/sslc-batch-a-kerala",
  },
  {
    id: "B10-B",
    name: "SSLC (Class 10) - Batch B (Evening)",
    grade: "10",
    timing: "04:30 PM - 06:30 PM",
    classTeacher: "ദീപ ടീച്ചർ (Physics)",
    whatsappGroupLink: "https://chat.whatsapp.com/sslc-batch-b-kerala",
  },
  {
    id: "B09-A",
    name: "Class 9 - State Batch A",
    grade: "9",
    timing: "04:30 PM - 06:30 PM",
    classTeacher: "ഷാജി മാസ്റ്റർ (Chemistry)",
    whatsappGroupLink: "https://chat.whatsapp.com/class9-batch-a-kerala",
  },
  {
    id: "B08-A",
    name: "Class 8 - Foundation Batch A",
    grade: "8",
    timing: "05:00 PM - 06:45 PM",
    classTeacher: "രമ്യ ടീച്ചർ (Biology)",
    whatsappGroupLink: "https://chat.whatsapp.com/class8-batch-a-kerala",
  },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "STU-101",
    rollNo: "10A-01",
    name: "ആദിത്യൻ കെ. ആർ. (Adithyan K R)",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    schoolName: "Govt. Model Boys HSS, Kozhikode",
    parentName: "രാജേഷ് കെ.",
    parentPhone: "919847011223",
    addedBy: "അനിൽ കുമാർ മാസ്റ്റർ (Teacher)",
    joinedDate: "2026-06-01",
    totalFee: 12000,
    paidFee: 12000,
    discount: 0,
    feeHistory: [
      { id: "FH1", date: "2026-06-05", amount: 6000, mode: "UPI", receiptNo: "RCP-1001", collectedBy: "Admin" },
      { id: "FH2", date: "2026-08-10", amount: 6000, mode: "Cash", receiptNo: "RCP-1042", collectedBy: "Admin" },
    ],
  },
  {
    id: "STU-102",
    rollNo: "10A-02",
    name: "ഫാത്തിമ സഹ്‌റ (Fathima Zahra)",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    schoolName: "GVHSS Nadakkavu",
    parentName: "അബ്ദുൾ സലാം",
    parentPhone: "919847022334",
    addedBy: "Admin (Office)",
    joinedDate: "2026-06-02",
    totalFee: 12000,
    paidFee: 8000,
    discount: 0,
    feeHistory: [
      { id: "FH3", date: "2026-06-02", amount: 5000, mode: "UPI", receiptNo: "RCP-1003", collectedBy: "Admin" },
      { id: "FH4", date: "2026-09-01", amount: 3000, mode: "Cash", receiptNo: "RCP-1088", collectedBy: "Admin" },
    ],
  },
  {
    id: "STU-103",
    rollNo: "10B-01",
    name: "ശ്രീലക്ഷ്മി എം. (Sreelakshmi M)",
    grade: "10",
    batchId: "B10-B",
    batchName: "SSLC (Class 10) - Batch B (Evening)",
    schoolName: "GHSS Medical College",
    parentName: "മോഹനൻ പി.",
    parentPhone: "919847033445",
    addedBy: "ദീപ ടീച്ചർ (Teacher)",
    joinedDate: "2026-06-05",
    totalFee: 12000,
    paidFee: 4500,
    discount: 500,
    feeHistory: [
      { id: "FH5", date: "2026-06-05", amount: 4500, mode: "UPI", receiptNo: "RCP-1010", collectedBy: "ദീപ ടീച്ചർ" },
    ],
  },
  {
    id: "STU-104",
    rollNo: "09A-01",
    name: "മുഹമ്മദ് നിഹാൽ (Muhammed Nihal)",
    grade: "9",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    schoolName: "Govt. Ganapath HSS",
    parentName: "ഹംസ കെ.",
    parentPhone: "919847044556",
    addedBy: "ഷാജി മാസ്റ്റർ (Teacher)",
    joinedDate: "2026-06-10",
    totalFee: 10000,
    paidFee: 10000,
    discount: 0,
    feeHistory: [
      { id: "FH6", date: "2026-06-10", amount: 10000, mode: "Bank", receiptNo: "RCP-1015", collectedBy: "Admin" },
    ],
  },
  {
    id: "STU-105",
    rollNo: "09A-02",
    name: "ഗൗരി നന്ദന (Gouri Nandana)",
    grade: "9",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    schoolName: "GVHSS Meenchanda",
    parentName: "സുരേഷ് ബാബു",
    parentPhone: "919847055667",
    addedBy: "Admin (Office)",
    joinedDate: "2026-06-12",
    totalFee: 10000,
    paidFee: 3000,
    discount: 0,
    feeHistory: [
      { id: "FH7", date: "2026-06-12", amount: 3000, mode: "Cash", receiptNo: "RCP-1020", collectedBy: "Admin" },
    ],
  },
  {
    id: "STU-106",
    rollNo: "08A-01",
    name: "അഭിനവ് കൃഷ്ണ (Abhinav Krishna)",
    grade: "8",
    batchId: "B08-A",
    batchName: "Class 8 - Foundation Batch A",
    schoolName: "Govt. Achuthan Girls & Boys HS",
    parentName: "കൃഷ്ണകുമാർ",
    parentPhone: "919847066778",
    addedBy: "രമ്യ ടീച്ചർ (Teacher)",
    joinedDate: "2026-06-15",
    totalFee: 8500,
    paidFee: 0,
    discount: 0,
    feeHistory: [],
  },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "ATT-1",
    date: "2026-10-21",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    grade: "10",
    markedBy: "അനിൽ കുമാർ മാസ്റ്റർ",
    records: [
      { studentId: "STU-101", studentName: "ആദിത്യൻ കെ. ആർ. (Adithyan K R)", rollNo: "10A-01", status: "Present" },
      { studentId: "STU-102", studentName: "ഫാത്തിമ സഹ്‌റ (Fathima Zahra)", rollNo: "10A-02", status: "Present" },
    ],
  },
  {
    id: "ATT-2",
    date: "2026-10-20",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    grade: "10",
    markedBy: "ദീപ ടീച്ചർ",
    records: [
      { studentId: "STU-101", studentName: "ആദിത്യൻ കെ. ആർ. (Adithyan K R)", rollNo: "10A-01", status: "Present" },
      { studentId: "STU-102", studentName: "ഫാത്തിമ സഹ്‌റ (Fathima Zahra)", rollNo: "10A-02", status: "Absent" },
    ],
  },
  {
    id: "ATT-3",
    date: "2026-10-21",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    grade: "9",
    markedBy: "ഷാജി മാസ്റ്റർ",
    records: [
      { studentId: "STU-104", studentName: "മുഹമ്മദ് നിഹാൽ (Muhammed Nihal)", rollNo: "09A-01", status: "Present" },
      { studentId: "STU-105", studentName: "ഗൗരി നന്ദന (Gouri Nandana)", rollNo: "09A-02", status: "Absent" },
    ],
  },
];

export const INITIAL_FACULTY_CHAPTERS: FacultyChapter[] = [
  {
    id: "FC-1",
    facultyName: "അനിൽ കുമാർ മാസ്റ്റർ",
    phone: "919447100200",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    subject: "ഗണിതം (Mathematics)",
    chapterNo: 1,
    chapterTitle: "സമാന്തരശ്രേണികൾ (Arithmetic Sequences)",
    totalPortions: 6,
    completedPortions: 6,
    topicsCovered: [
      "സംഖ്യാ ശ്രേണികൾ (Number Sequences)",
      "ബീജഗണിത രൂപം (Algebraic Form of AP)",
      "പദങ്ങളുടെ തുക (Sum of Terms)",
    ],
    status: "Completed",
    lastUpdated: "2026-10-15",
  },
  {
    id: "FC-2",
    facultyName: "അനിൽ കുമാർ മാസ്റ്റർ",
    phone: "919447100200",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    subject: "ഗണിതം (Mathematics)",
    chapterNo: 2,
    chapterTitle: "വൃത്തങ്ങൾ (Circles) & തൊടുവരകൾ (Tangents)",
    totalPortions: 8,
    completedPortions: 5,
    topicsCovered: [
      "വൃത്തവും കോണുകളും (Angles in a Circle)",
      "ചക്രീയ ചതുർഭുജം (Cyclic Quadrilateral)",
      "തൊടുവരകളുടെ നിർമ്മിതി (Tangent Construction)",
    ],
    status: "In Progress",
    lastUpdated: "2026-10-20",
  },
  {
    id: "FC-3",
    facultyName: "ദീപ ടീച്ചർ",
    phone: "919447100201",
    grade: "10",
    batchId: "B10-B",
    batchName: "SSLC (Class 10) - Batch B (Evening)",
    subject: "ഊർജ്ജതന്ത്രം (Physics)",
    chapterNo: 1,
    chapterTitle: "വൈദ്യുതപ്രവാഹത്തിന്റെ ഫലങ്ങൾ (Effects of Electric Current)",
    totalPortions: 5,
    completedPortions: 5,
    topicsCovered: ["ജൂൾ നിയമം (Joule's Law)", "വൈദ്യുത പവർ (Electric Power)", "താപന ഉപകരണങ്ങൾ"],
    status: "Completed",
    lastUpdated: "2026-10-12",
  },
  {
    id: "FC-4",
    facultyName: "ഷാജി മാസ്റ്റർ",
    phone: "919447100202",
    grade: "9",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    subject: "രസതന്ത്രം (Chemistry)",
    chapterNo: 2,
    chapterTitle: "രാസബന്ധനം (Chemical Bonding)",
    totalPortions: 6,
    completedPortions: 4,
    topicsCovered: ["അയോണിക് ബന്ധനം (Ionic Bonding)", "സഹസംയോജക ബന്ധനം (Covalent Bonding)", "ഇലക്ട്രോൺ ഡോട്ട് ഡയഗ്രം"],
    status: "In Progress",
    lastUpdated: "2026-10-19",
  },
  {
    id: "FC-5",
    facultyName: "രമ്യ ടീച്ചർ",
    phone: "919447100203",
    grade: "8",
    batchId: "B08-A",
    batchName: "Class 8 - Foundation Batch A",
    subject: "ജീവശാസ്ത്രം (Biology)",
    chapterNo: 1,
    chapterTitle: "കോശജാലങ്ങൾ (Life's Mysteries in Little Chambers)",
    totalPortions: 4,
    completedPortions: 4,
    topicsCovered: ["മൈക്രോസ്കോപ്പ്", "സസ്യകോശവും ജന്തുകോശവും", "കോശാംഗങ്ങൾ (Cell Organelles)"],
    status: "Completed",
    lastUpdated: "2026-10-18",
  },
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: "EX-101",
    title: "SSLC ഗണിതം - സമാന്തരശ്രേണികൾ (Chapter 1 Model Exam)",
    subject: "ഗണിതം (Mathematics)",
    grade: "10",
    batchId: "B10-A",
    date: "2026-10-21",
    durationMinutes: 15,
    totalMarks: 20,
    createdBy: "അനിൽ കുമാർ മാസ്റ്റർ",
    questions: [
      {
        id: "Q1",
        question: "5, 8, 11, 14... എന്ന സമാന്തരശ്രേണിയുടെ പൊതുവ്യത്യാസം (Common Difference) എത്ര?",
        options: ["2", "3", "4", "5"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "രണ്ടാം പദത്തിൽ നിന്ന് ആദ്യ പദം കുറയ്ക്കുക: 8 - 5 = 3.",
      },
      {
        id: "Q2",
        question: "ഒരു സമാന്തരശ്രേണിയുടെ ബീജഗണിത രൂപം 3n + 2 ആയാൽ അതിന്റെ ആദ്യ പദം (First Term) എത്ര?",
        options: ["3", "2", "5", "6"],
        correctAnswerIndex: 2,
        marks: 5,
        explanation: "n = 1 നൽകുമ്പോൾ: 3(1) + 2 = 5.",
      },
      {
        id: "Q3",
        question: "1 + 2 + 3 + ... + 20 വരെ തുടർച്ചയായ എണ്ണൽ സംഖ്യകളുടെ തുക എത്ര?",
        options: ["200", "210", "190", "220"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "n(n+1)/2 = 20 × 21 / 2 = 210.",
      },
      {
        id: "Q4",
        question: "10, 15, 20... എന്ന ശ്രേണിയുടെ 10-ാം പദം ഏതാണ്?",
        options: ["50", "55", "60", "45"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "x_n = a + (n-1)d = 10 + 9 × 5 = 55.",
      },
    ],
  },
  {
    id: "EX-102",
    title: "SSLC ഫിസിക്സ് - വൈദ്യുതപ്രവാഹത്തിന്റെ ഫലങ്ങൾ (Unit Test)",
    subject: "ഊർജ്ജതന്ത്രം (Physics)",
    grade: "10",
    batchId: "B10-A",
    date: "2026-10-20",
    durationMinutes: 10,
    totalMarks: 15,
    createdBy: "ദീപ ടീച്ചർ",
    questions: [
      {
        id: "QP1",
        question: "വൈദ്യുത പവറിന്റെ (Electric Power) SI യൂണിറ്റ് എന്താണ്?",
        options: ["ജൂൾ (Joule)", "വാട്ട് (Watt)", "വോൾട്ട് (Volt)", "ആമ്പിയർ (Ampere)"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "വൈദ്യുത പവറിന്റെ യൂണിറ്റ് വാട്ട് (W) ആണ്.",
      },
      {
        id: "QP2",
        question: "ജൂൾ നിയമപ്രകാരം താപം (H) കണ്ടുപിടിക്കാനുള്ള സമവാക്യം ഏതാണ്?",
        options: ["H = IRt", "H = I²Rt", "H = VIt²", "H = I/Rt"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "Joule's Law: H = I²Rt.",
      },
      {
        id: "QP3",
        question: "സുരക്ഷാ ഫ്യൂസ് വയർ നിർമ്മിക്കാൻ ഉപയോഗിക്കുന്ന ലോഹസങ്കരം (Alloy) ഏതാണ്?",
        options: ["നിക്രോം (Nichrome)", "ടങ്സ്റ്റൺ (Tungsten)", "ടിൻ-ലെഡ് (Tin-Lead)", "ചെമ്പ് (Copper)"],
        correctAnswerIndex: 2,
        marks: 5,
        explanation: "കുറഞ്ഞ ദ്രവണാങ്കമുള്ള ടിൻ-ലെഡ് സങ്കരമാണ് ഫ്യൂസ് വയറിന് ഉപയോഗിക്കുന്നത്.",
      },
    ],
  },
  {
    id: "EX-103",
    title: "Class 9 കെമിസ്ട്രി - രാസബന്ധനം (Chemical Bonding Test)",
    subject: "രസതന്ത്രം (Chemistry)",
    grade: "9",
    batchId: "B09-A",
    date: "2026-10-19",
    durationMinutes: 10,
    totalMarks: 10,
    createdBy: "ഷാജി മാസ്റ്റർ",
    questions: [
      {
        id: "QC1",
        question: "സോഡിയം ക്ലോറൈഡിലെ (NaCl) രാസബന്ധനം ഏത് വിഭാഗത്തിൽപ്പെടുന്നു?",
        options: ["സഹസംയോജക ബന്ധനം (Covalent)", "അയോണിക് ബന്ധനം (Ionic)", "മെറ്റാലിക് ബന്ധനം", "ഹൈഡ്രജൻ ബന്ധനം"],
        correctAnswerIndex: 1,
        marks: 5,
      },
      {
        id: "QC2",
        question: "അഷ്ടക വിന്യാസം (Octet Configuration) എന്നതിൽ ബാഹ്യതമ ഷെല്ലിൽ എത്ര ഇലക്ട്രോണുകൾ ഉണ്ടായിരിക്കും?",
        options: ["2", "6", "8", "18"],
        correctAnswerIndex: 2,
        marks: 5,
      },
    ],
  },
];

export const INITIAL_ATTEMPTS: ExamAttempt[] = [
  {
    id: "AT-1",
    examId: "EX-101",
    examTitle: "SSLC ഗണിതം - സമാന്തരശ്രേണികൾ (Chapter 1)",
    subject: "ഗണിതം (Mathematics)",
    studentId: "STU-101",
    studentName: "ആദിത്യൻ കെ. ആർ. (Adithyan K R)",
    grade: "10",
    date: "2026-10-05",
    score: 18,
    totalMarks: 20,
    percentage: 90,
    answers: [1, 2, 1, 1],
  },
  {
    id: "AT-2",
    examId: "EX-102",
    examTitle: "SSLC ഫിസിക്സ് - വൈദ്യുതപ്രവാഹം (Unit 1)",
    subject: "ഊർജ്ജതന്ത്രം (Physics)",
    studentId: "STU-101",
    studentName: "ആദിത്യൻ കെ. ആർ. (Adithyan K R)",
    grade: "10",
    date: "2026-10-10",
    score: 14,
    totalMarks: 15,
    percentage: 93,
    answers: [1, 1, 2],
  },
  {
    id: "AT-3",
    examId: "EX-CHEM-1",
    examTitle: "SSLC രസതന്ത്രം - പീരിയോഡിക് ടേബിൾ",
    subject: "രസതന്ത്രം (Chemistry)",
    studentId: "STU-101",
    studentName: "ആദിത്യൻ കെ. ആർ. (Adithyan K R)",
    grade: "10",
    date: "2026-10-14",
    score: 15,
    totalMarks: 20,
    percentage: 75,
    answers: [0, 1, 2, 1],
  },
  {
    id: "AT-4",
    examId: "EX-BIO-1",
    examTitle: "SSLC ജീവശാസ്ത്രം - അറിയാനും പ്രതികരിക്കാനും",
    subject: "ജീവശാസ്ത്രം (Biology)",
    studentId: "STU-101",
    studentName: "ആദിത്യൻ കെ. ആർ. (Adithyan K R)",
    grade: "10",
    date: "2026-10-18",
    score: 19,
    totalMarks: 20,
    percentage: 95,
    answers: [1, 1, 0, 2],
  },
  {
    id: "AT-5",
    examId: "EX-101",
    examTitle: "SSLC ഗണിതം - സമാന്തരശ്രേണികൾ (Chapter 1)",
    subject: "ഗണിതം (Mathematics)",
    studentId: "STU-102",
    studentName: "ഫാത്തിമ സഹ്‌റ (Fathima Zahra)",
    grade: "10",
    date: "2026-10-05",
    score: 15,
    totalMarks: 20,
    percentage: 75,
    answers: [1, 2, 0, 1],
  },
  {
    id: "AT-6",
    examId: "EX-102",
    examTitle: "SSLC ഫിസിക്സ് - വൈദ്യുതപ്രവാഹം (Unit 1)",
    subject: "ഊർജ്ജതന്ത്രം (Physics)",
    studentId: "STU-102",
    studentName: "ഫാത്തിമ സഹ്‌റ (Fathima Zahra)",
    grade: "10",
    date: "2026-10-10",
    score: 10,
    totalMarks: 15,
    percentage: 67,
    answers: [1, 0, 2],
  },
  {
    id: "AT-7",
    examId: "EX-103",
    examTitle: "Class 9 കെമിസ്ട്രി - രാസബന്ധനം",
    subject: "രസതന്ത്രം (Chemistry)",
    studentId: "STU-104",
    studentName: "മുഹമ്മദ് നിഹാൽ (Muhammed Nihal)",
    grade: "9",
    date: "2026-10-19",
    score: 10,
    totalMarks: 10,
    percentage: 100,
    answers: [1, 2],
  },
];

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: "LC-1",
    title: "SSLC Maths - വൃത്തങ്ങളും തൊടുവരകളും (Sure A+ Live Revision)",
    subject: "ഗണിതം (Mathematics)",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    facultyName: "അനിൽ കുമാർ മാസ്റ്റർ",
    youtubeUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    scheduledDate: "2026-10-21",
    scheduledTime: "07:00 PM",
    isLive: true,
  },
  {
    id: "LC-2",
    title: "SSLC Physics - വൈദ്യുതകാന്തിക ഫലം (Electromagnetic Induction)",
    subject: "ഊർജ്ജതന്ത്രം (Physics)",
    grade: "10",
    batchId: "B10-B",
    batchName: "SSLC (Class 10) - Batch B (Evening)",
    facultyName: "ദീപ ടീച്ചർ",
    youtubeUrl: "https://www.youtube.com/watch?v=3fumBcKC6RE",
    scheduledDate: "2026-10-22",
    scheduledTime: "06:30 PM",
    isLive: false,
  },
  {
    id: "LC-3",
    title: "Class 9 Chemistry - രാസബന്ധനം & പീരിയോഡിക് ടേബിൾ സ്പെഷ്യൽ ക്ലാസ്",
    subject: "രസതന്ത്രം (Chemistry)",
    grade: "9",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    facultyName: "ഷാജി മാസ്റ്റർ",
    youtubeUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
    scheduledDate: "2026-10-21",
    scheduledTime: "07:30 PM",
    isLive: true,
  },
  {
    id: "LC-4",
    title: "Class 8 Biology - കോശജാലങ്ങൾ (SCERT Kerala Syllabus)",
    subject: "ജീവശാസ്ത്രം (Biology)",
    grade: "8",
    batchId: "B08-A",
    batchName: "Class 8 - Foundation Batch A",
    facultyName: "രമ്യ ടീച്ചർ",
    youtubeUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
    scheduledDate: "2026-10-23",
    scheduledTime: "05:30 PM",
    isLive: false,
  },
];

export const INITIAL_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: "QB-1",
    title: "SSLC ഗണിതം - സമാന്തരശ്രേണികൾ (കഴിഞ്ഞ 5 വർഷത്തെ ചോദ്യങ്ങളും ഉത്തരങ്ങളും)",
    grade: "10",
    subject: "ഗണിതം (Mathematics)",
    chapter: "Chapter 1 - സമാന്തരശ്രേണികൾ",
    type: "Previous Year Paper",
    uploadedBy: "അനിൽ കുമാർ മാസ്റ്റർ",
    uploadedDate: "2026-10-10",
    questionsList: [
      {
        q: "1) ഒരു സമാന്തരശ്രേണിയുടെ 5-ാം പദം 17-ഉം 10-ാം പദം 32-ഉം ആയാൽ പൊതുവ്യത്യാസവും ആദ്യപദവും കാണുക.",
        a: "പൊതുവ്യത്യാസം d = (32 - 17) / (10 - 5) = 15 / 5 = 3. ആദ്യപദം = 17 - 4(3) = 5.",
        marks: 3,
      },
      {
        q: "2) 7 കൊണ്ട് ഹരിക്കുമ്പോൾ 3 ശിഷ്ടം വരുന്ന മൂന്നക്ക സംഖ്യകൾ എത്രയുണ്ട്?",
        a: "ആദ്യ മൂന്നക്ക സംഖ്യ = 101, അവസാന സംഖ്യ = 997. പദങ്ങളുടെ എണ്ണം n = ((997 - 101)/7) + 1 = 129.",
        marks: 4,
      },
      {
        q: "3) 4n + 1 ബീജഗണിത രൂപമായ ശ്രേണിയുടെ ആദ്യ 25 പദങ്ങളുടെ തുക കാണുക.",
        a: "x_1 = 5, x_25 = 101. തുക = (25/2) × (5 + 101) = 25 × 53 = 1325.",
        marks: 4,
      },
    ],
  },
  {
    id: "QB-2",
    title: "SSLC ഫിസിക്സ് - വൈദ്യുതപ്രവാഹത്തിന്റെ ഫലങ്ങൾ (പ്രധാന സമവാക്യങ്ങളും ചോദ്യങ്ങളും)",
    grade: "10",
    subject: "ഊർജ്ജതന്ത്രം (Physics)",
    chapter: "Chapter 1 - വൈദ്യുതപ്രവാഹത്തിന്റെ ഫലങ്ങൾ",
    type: "Chapter Notes & Q&A",
    uploadedBy: "ദീപ ടീച്ചർ",
    uploadedDate: "2026-10-14",
    questionsList: [
      {
        q: "1) ഹീറ്റിംഗ് കോയിലുകൾ നിർമ്മിക്കാൻ നിക്രോം (Nichrome) ഉപയോഗിക്കുന്നതിന്റെ കാരണങ്ങൾ എന്തെല്ലാം?",
        a: "ഉയർന്ന റെസിസ്റ്റിവിറ്റി, ഉയർന്ന ദ്രവണാങ്കം, ചുട്ടുപഴുത്ത അവസ്ഥയിലും ഓക്സീകരിക്കപ്പെടാതെ ദീർഘകാലം നിലനിൽക്കാനുള്ള കഴിവ്.",
        marks: 3,
      },
      {
        q: "2) 230V-ൽ പ്രവർത്തിക്കുന്ന 1000W ഹീറ്ററിലൂടെ 5 മിനിറ്റ് വൈദ്യുതി പ്രവഹിച്ചാൽ ഉണ്ടാകുന്ന താപം എത്ര?",
        a: "H = P × t = 1000 W × (5 × 60 s) = 3,00,000 J (300 kJ).",
        marks: 3,
      },
    ],
  },
  {
    id: "QB-3",
    title: "Class 9 കെമിസ്ട്രി - രാസബന്ധനം (SCERT Model Questions)",
    grade: "9",
    subject: "രസതന്ത്രം (Chemistry)",
    chapter: "Chapter 2 - രാസബന്ധനം",
    type: "Model Exam Paper",
    uploadedBy: "ഷാജി മാസ്റ്റർ",
    uploadedDate: "2026-10-16",
    questionsList: [
      {
        q: "1) മഗ്നീഷ്യം ഓക്സൈഡ് (MgO) രൂപീകരണത്തിലെ ഇലക്ട്രോൺ കൈമാറ്റം വിശദമാക്കുക (Mg=12, O=8).",
        a: "Mg (2,8,2) രണ്ട് ഇലക്ട്രോണുകൾ വിട്ടുനൽകി Mg²⁺ ആകുന്നു. ഓക്സിജൻ (2,6) രണ്ട് ഇലക്ട്രോണുകൾ സ്വീകരിച്ച് O²⁻ ആകുന്നു. അയോണിക് ബന്ധനം വഴി MgO രൂപപ്പെടുന്നു.",
        marks: 4,
      },
    ],
  },
  {
    id: "QB-4",
    title: "Class 8 ജീവശാസ്ത്രം - കോശജാലങ്ങൾ (Short Notes & Diagrams Q&A)",
    grade: "8",
    subject: "ജീവശാസ്ത്രം (Biology)",
    chapter: "Chapter 1 - കോശജാലങ്ങൾ",
    type: "Chapter Notes & Q&A",
    uploadedBy: "രമ്യ ടീച്ചർ",
    uploadedDate: "2026-10-17",
    questionsList: [
      {
        q: "1) 'കോശത്തിലെ പവർ ഹൗസ്' (Powerhouse of the Cell) എന്നറിയപ്പെടുന്ന കോശാംഗം ഏത്? എന്തുകൊണ്ട്?",
        a: "മൈറ്റോകോൺഡ്രിയ (Mitochondria). കോശത്തിനാവശ്യമായ ഊർജ്ജം നിർമ്മിക്കുകയും സംഭരിക്കുകയും ചെയ്യുന്നതിനാൽ.",
        marks: 2,
      },
      {
        q: "2) സസ്യകോശത്തിൽ മാത്രം കാണപ്പെടുന്ന ജൈവകണങ്ങൾ (Plastids) ഏതെല്ലാം?",
        a: "ഹരിതകണം (Chloroplast), വർണ്ണകണം (Chromoplast), ശ്വേതകണം (Leucoplast).",
        marks: 3,
      },
    ],
  },
];
