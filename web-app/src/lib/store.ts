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
    classTeacher: "Anil Kumar Master (Maths)",
    whatsappGroupLink: "https://chat.whatsapp.com/sslc-batch-a-kerala",
  },
  {
    id: "B10-B",
    name: "SSLC (Class 10) - Batch B (Evening)",
    grade: "10",
    timing: "04:30 PM - 06:30 PM",
    classTeacher: "Deepa Teacher (Physics)",
    whatsappGroupLink: "https://chat.whatsapp.com/sslc-batch-b-kerala",
  },
  {
    id: "B09-A",
    name: "Class 9 - State Batch A",
    grade: "9",
    timing: "04:30 PM - 06:30 PM",
    classTeacher: "Shaji Master (Chemistry)",
    whatsappGroupLink: "https://chat.whatsapp.com/class9-batch-a-kerala",
  },
  {
    id: "B08-A",
    name: "Class 8 - Foundation Batch A",
    grade: "8",
    timing: "05:00 PM - 06:45 PM",
    classTeacher: "Ramya Teacher (Biology)",
    whatsappGroupLink: "https://chat.whatsapp.com/class8-batch-a-kerala",
  },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "STU-101",
    rollNo: "10A-01",
    name: "Adithyan K R",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    schoolName: "Govt. Model Boys HSS, Kozhikode",
    parentName: "Rajesh K",
    parentPhone: "919847011223",
    addedBy: "Anil Kumar Master (Teacher)",
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
    name: "Fathima Zahra",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    schoolName: "GVHSS Nadakkavu",
    parentName: "Abdul Salam",
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
    name: "Sreelakshmi M",
    grade: "10",
    batchId: "B10-B",
    batchName: "SSLC (Class 10) - Batch B (Evening)",
    schoolName: "GHSS Medical College",
    parentName: "Mohanan P",
    parentPhone: "919847033445",
    addedBy: "Deepa Teacher (Teacher)",
    joinedDate: "2026-06-05",
    totalFee: 12000,
    paidFee: 4500,
    discount: 500,
    feeHistory: [
      { id: "FH5", date: "2026-06-05", amount: 4500, mode: "UPI", receiptNo: "RCP-1010", collectedBy: "Deepa Teacher" },
    ],
  },
  {
    id: "STU-104",
    rollNo: "09A-01",
    name: "Muhammed Nihal",
    grade: "9",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    schoolName: "Govt. Ganapath HSS",
    parentName: "Hamsa K",
    parentPhone: "919847044556",
    addedBy: "Shaji Master (Teacher)",
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
    name: "Gouri Nandana",
    grade: "9",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    schoolName: "GVHSS Meenchanda",
    parentName: "Suresh Babu",
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
    name: "Abhinav Krishna",
    grade: "8",
    batchId: "B08-A",
    batchName: "Class 8 - Foundation Batch A",
    schoolName: "Govt. Achuthan Girls & Boys HS",
    parentName: "Krishnakumar",
    parentPhone: "919847066778",
    addedBy: "Ramya Teacher (Teacher)",
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
    markedBy: "Anil Kumar Master",
    records: [
      { studentId: "STU-101", studentName: "Adithyan K R", rollNo: "10A-01", status: "Present" },
      { studentId: "STU-102", studentName: "Fathima Zahra", rollNo: "10A-02", status: "Present" },
    ],
  },
  {
    id: "ATT-2",
    date: "2026-10-20",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    grade: "10",
    markedBy: "Deepa Teacher",
    records: [
      { studentId: "STU-101", studentName: "Adithyan K R", rollNo: "10A-01", status: "Present" },
      { studentId: "STU-102", studentName: "Fathima Zahra", rollNo: "10A-02", status: "Absent" },
    ],
  },
  {
    id: "ATT-3",
    date: "2026-10-21",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    grade: "9",
    markedBy: "Shaji Master",
    records: [
      { studentId: "STU-104", studentName: "Muhammed Nihal", rollNo: "09A-01", status: "Present" },
      { studentId: "STU-105", studentName: "Gouri Nandana", rollNo: "09A-02", status: "Absent" },
    ],
  },
];

export const INITIAL_FACULTY_CHAPTERS: FacultyChapter[] = [
  {
    id: "FC-1",
    facultyName: "Anil Kumar Master",
    phone: "919447100200",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    subject: "Mathematics",
    chapterNo: 1,
    chapterTitle: "Arithmetic Sequences",
    totalPortions: 6,
    completedPortions: 6,
    topicsCovered: [
      "Number Patterns & Sequences",
      "Algebraic Form of an AP",
      "Position & Term Differences",
      "Sum of Consecutive Terms",
    ],
    status: "Completed",
    lastUpdated: "2026-10-15",
  },
  {
    id: "FC-2",
    facultyName: "Anil Kumar Master",
    phone: "919447100200",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    subject: "Mathematics",
    chapterNo: 2,
    chapterTitle: "Circles & Tangents",
    totalPortions: 8,
    completedPortions: 5,
    topicsCovered: [
      "Angles in a Circle & Semicircle",
      "Cyclic Quadrilaterals",
      "Tangent Constructions & Properties",
    ],
    status: "In Progress",
    lastUpdated: "2026-10-20",
  },
  {
    id: "FC-3",
    facultyName: "Deepa Teacher",
    phone: "919447100201",
    grade: "10",
    batchId: "B10-B",
    batchName: "SSLC (Class 10) - Batch B (Evening)",
    subject: "Physics",
    chapterNo: 1,
    chapterTitle: "Effects of Electric Current",
    totalPortions: 5,
    completedPortions: 5,
    topicsCovered: ["Joule's Law of Heating", "Electric Power & Fuse", "Heating Appliances"],
    status: "Completed",
    lastUpdated: "2026-10-12",
  },
  {
    id: "FC-4",
    facultyName: "Shaji Master",
    phone: "919447100202",
    grade: "9",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    subject: "Chemistry",
    chapterNo: 2,
    chapterTitle: "Chemical Bonding",
    totalPortions: 6,
    completedPortions: 4,
    topicsCovered: ["Ionic Bonding", "Covalent Bonding", "Electron Dot Diagrams & Valency"],
    status: "In Progress",
    lastUpdated: "2026-10-19",
  },
  {
    id: "FC-5",
    facultyName: "Ramya Teacher",
    phone: "919447100203",
    grade: "8",
    batchId: "B08-A",
    batchName: "Class 8 - Foundation Batch A",
    subject: "Biology",
    chapterNo: 1,
    chapterTitle: "Life's Mysteries in Little Chambers",
    totalPortions: 4,
    completedPortions: 4,
    topicsCovered: ["Compound Microscope", "Plant Cell vs Animal Cell", "Cell Organelles & Functions"],
    status: "Completed",
    lastUpdated: "2026-10-18",
  },
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: "EX-101",
    title: "SSLC Mathematics - Arithmetic Sequences (Chapter 1 Model Exam)",
    subject: "Mathematics",
    grade: "10",
    batchId: "B10-A",
    date: "2026-10-21",
    durationMinutes: 15,
    totalMarks: 20,
    createdBy: "Anil Kumar Master",
    questions: [
      {
        id: "Q1",
        question: "What is the common difference of the arithmetic sequence 5, 8, 11, 14...?",
        options: ["2", "3", "4", "5"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "Subtract the first term from the second term: 8 - 5 = 3.",
      },
      {
        id: "Q2",
        question: "If the algebraic form of an arithmetic sequence is 3n + 2, what is its first term?",
        options: ["3", "2", "5", "6"],
        correctAnswerIndex: 2,
        marks: 5,
        explanation: "Substitute n = 1: 3(1) + 2 = 5.",
      },
      {
        id: "Q3",
        question: "Find the sum of consecutive natural numbers from 1 + 2 + 3 + ... + 20.",
        options: ["200", "210", "190", "220"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "n(n+1)/2 = 20 × 21 / 2 = 210.",
      },
      {
        id: "Q4",
        question: "What is the 10th term of the arithmetic sequence 10, 15, 20...?",
        options: ["50", "55", "60", "45"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "x_n = a + (n-1)d = 10 + 9 × 5 = 55.",
      },
    ],
  },
  {
    id: "EX-102",
    title: "SSLC Physics - Effects of Electric Current (Unit Test)",
    subject: "Physics",
    grade: "10",
    batchId: "B10-A",
    date: "2026-10-20",
    durationMinutes: 10,
    totalMarks: 15,
    createdBy: "Deepa Teacher",
    questions: [
      {
        id: "QP1",
        question: "What is the SI unit of Electric Power?",
        options: ["Joule", "Watt", "Volt", "Ampere"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "The SI unit of electric power is Watt (W).",
      },
      {
        id: "QP2",
        question: "According to Joule's Law, what is the formula for heat generated (H)?",
        options: ["H = IRt", "H = I²Rt", "H = VIt²", "H = I/Rt"],
        correctAnswerIndex: 1,
        marks: 5,
        explanation: "Joule's Law: H = I²Rt.",
      },
      {
        id: "QP3",
        question: "Which alloy is commonly used to make safety fuse wire?",
        options: ["Nichrome", "Tungsten", "Tin-Lead Alloy", "Copper"],
        correctAnswerIndex: 2,
        marks: 5,
        explanation: "Tin-Lead alloy has a low melting point and high resistivity.",
      },
    ],
  },
  {
    id: "EX-103",
    title: "Class 9 Chemistry - Chemical Bonding Test",
    subject: "Chemistry",
    grade: "9",
    batchId: "B09-A",
    date: "2026-10-19",
    durationMinutes: 10,
    totalMarks: 10,
    createdBy: "Shaji Master",
    questions: [
      {
        id: "QC1",
        question: "What type of chemical bond is present in Sodium Chloride (NaCl)?",
        options: ["Covalent Bond", "Ionic Bond", "Metallic Bond", "Hydrogen Bond"],
        correctAnswerIndex: 1,
        marks: 5,
      },
      {
        id: "QC2",
        question: "How many electrons are present in the outermost shell in an Octet configuration?",
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
    examTitle: "SSLC Mathematics - Arithmetic Sequences (Chapter 1)",
    subject: "Mathematics",
    studentId: "STU-101",
    studentName: "Adithyan K R",
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
    examTitle: "SSLC Physics - Effects of Electric Current (Unit 1)",
    subject: "Physics",
    studentId: "STU-101",
    studentName: "Adithyan K R",
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
    examTitle: "SSLC Chemistry - Periodic Table & Electronic Configuration",
    subject: "Chemistry",
    studentId: "STU-101",
    studentName: "Adithyan K R",
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
    examTitle: "SSLC Biology - Sensations and Responses",
    subject: "Biology",
    studentId: "STU-101",
    studentName: "Adithyan K R",
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
    examTitle: "SSLC Mathematics - Arithmetic Sequences (Chapter 1)",
    subject: "Mathematics",
    studentId: "STU-102",
    studentName: "Fathima Zahra",
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
    examTitle: "SSLC Physics - Effects of Electric Current (Unit 1)",
    subject: "Physics",
    studentId: "STU-102",
    studentName: "Fathima Zahra",
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
    examTitle: "Class 9 Chemistry - Chemical Bonding",
    subject: "Chemistry",
    studentId: "STU-104",
    studentName: "Muhammed Nihal",
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
    title: "SSLC Maths - Circles & Tangents (Sure A+ Live Revision)",
    subject: "Mathematics",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    facultyName: "Anil Kumar Master",
    youtubeUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    scheduledDate: "2026-10-21",
    scheduledTime: "07:00 PM",
    isLive: true,
  },
  {
    id: "LC-2",
    title: "SSLC Physics - Electromagnetic Induction (Live Class)",
    subject: "Physics",
    grade: "10",
    batchId: "B10-B",
    batchName: "SSLC (Class 10) - Batch B (Evening)",
    facultyName: "Deepa Teacher",
    youtubeUrl: "https://www.youtube.com/watch?v=3fumBcKC6RE",
    scheduledDate: "2026-10-22",
    scheduledTime: "06:30 PM",
    isLive: false,
  },
  {
    id: "LC-3",
    title: "Class 9 Chemistry - Chemical Bonding & Periodic Table Special Class",
    subject: "Chemistry",
    grade: "9",
    batchId: "B09-A",
    batchName: "Class 9 - State Batch A",
    facultyName: "Shaji Master",
    youtubeUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
    scheduledDate: "2026-10-21",
    scheduledTime: "07:30 PM",
    isLive: true,
  },
  {
    id: "LC-4",
    title: "Class 8 Biology - Life's Mysteries in Little Chambers (Foundation)",
    subject: "Biology",
    grade: "8",
    batchId: "B08-A",
    batchName: "Class 8 - Foundation Batch A",
    facultyName: "Ramya Teacher",
    youtubeUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
    scheduledDate: "2026-10-23",
    scheduledTime: "05:30 PM",
    isLive: false,
  },
];

export const INITIAL_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: "QB-1",
    title: "SSLC Mathematics - Arithmetic Sequences (Previous 5 Years Q&A)",
    grade: "10",
    subject: "Mathematics",
    chapter: "Chapter 1 - Arithmetic Sequences",
    type: "Previous Year Paper",
    uploadedBy: "Anil Kumar Master",
    uploadedDate: "2026-10-10",
    questionsList: [
      {
        q: "1) The 5th term of an arithmetic sequence is 17 and the 10th term is 32. Find its common difference and first term.",
        a: "Common difference d = (32 - 17) / (10 - 5) = 15 / 5 = 3. First term = 17 - 4(3) = 5.",
        marks: 3,
      },
      {
        q: "2) How many 3-digit numbers leave a remainder of 3 when divided by 7?",
        a: "First 3-digit number = 101, Last number = 997. Number of terms n = ((997 - 101)/7) + 1 = 129.",
        marks: 4,
      },
      {
        q: "3) Find the sum of the first 25 terms of the arithmetic sequence with algebraic form 4n + 1.",
        a: "x_1 = 5, x_25 = 101. Sum = (25/2) × (5 + 101) = 25 × 53 = 1325.",
        marks: 4,
      },
    ],
  },
  {
    id: "QB-2",
    title: "SSLC Physics - Effects of Electric Current (Key Formulas & Questions)",
    grade: "10",
    subject: "Physics",
    chapter: "Chapter 1 - Effects of Electric Current",
    type: "Chapter Notes & Q&A",
    uploadedBy: "Deepa Teacher",
    uploadedDate: "2026-10-14",
    questionsList: [
      {
        q: "1) Why is Nichrome used as a heating element in electric heating appliances?",
        a: "High resistivity, high melting point, and ability to remain red hot for a long time without oxidation.",
        marks: 3,
      },
      {
        q: "2) Calculate the heat developed when a 1000W heater operates at 230V for 5 minutes.",
        a: "H = P × t = 1000 W × (5 × 60 s) = 3,00,000 J (300 kJ).",
        marks: 3,
      },
    ],
  },
  {
    id: "QB-3",
    title: "Class 9 Chemistry - Chemical Bonding (Model Questions)",
    grade: "9",
    subject: "Chemistry",
    chapter: "Chapter 2 - Chemical Bonding",
    type: "Model Exam Paper",
    uploadedBy: "Shaji Master",
    uploadedDate: "2026-10-16",
    questionsList: [
      {
        q: "1) Explain the electron transfer during the formation of Magnesium Oxide (MgO) [Mg=12, O=8].",
        a: "Mg (2,8,2) donates two electrons to form Mg²⁺. Oxygen (2,6) accepts two electrons to form O²⁻, forming an ionic bond in MgO.",
        marks: 4,
      },
    ],
  },
  {
    id: "QB-4",
    title: "Class 8 Biology - Cell Clusters & Organelles (Short Notes & Q&A)",
    grade: "8",
    subject: "Biology",
    chapter: "Chapter 1 - Life's Mysteries in Little Chambers",
    type: "Chapter Notes & Q&A",
    uploadedBy: "Ramya Teacher",
    uploadedDate: "2026-10-17",
    questionsList: [
      {
        q: "1) Which organelle is known as the 'Powerhouse of the Cell' and why?",
        a: "Mitochondria, because it produces and stores energy (ATP) required for cellular activities.",
        marks: 2,
      },
      {
        q: "2) Name the three types of Plastids found exclusively in plant cells.",
        a: "Chloroplast (photosynthesis), Chromoplast (imparts colour), and Leucoplast (food storage).",
        marks: 3,
      },
    ],
  },
];
