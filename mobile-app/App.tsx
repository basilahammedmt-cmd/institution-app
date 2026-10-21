import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Linking,
  Alert,
  StatusBar,
} from "react-native";

type ClassGrade = "8" | "9" | "10";
type UserRole = "admin" | "teacher" | "student";

interface Batch {
  id: string;
  name: string;
  grade: ClassGrade;
  timing: string;
  classTeacher: string;
  whatsappGroupLink: string;
}

interface Student {
  id: string;
  rollNo: string;
  name: string;
  grade: ClassGrade;
  batchId: string;
  batchName: string;
  schoolName: string;
  parentName: string;
  parentPhone: string;
  addedBy: string;
  totalFee: number;
  paidFee: number;
  discount: number;
}

const INITIAL_BATCHES: Batch[] = [
  {
    id: "B10-A",
    name: "SSLC (Class 10) - Batch A (Morning)",
    grade: "10",
    timing: "06:30 AM - 08:30 AM",
    classTeacher: "അനിൽ കുമാർ മാസ്റ്റർ (Maths)",
    whatsappGroupLink: "https://chat.whatsapp.com/sslc-batch-a-kerala",
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

const INITIAL_STUDENTS: Student[] = [
  {
    id: "STU-101",
    rollNo: "10A-01",
    name: "ആദിത്യൻ കെ. ആർ. (Adithyan K R)",
    grade: "10",
    batchId: "B10-A",
    batchName: "SSLC (Class 10) - Batch A (Morning)",
    schoolName: "Govt. Model Boys HSS",
    parentName: "രാജേഷ് കെ.",
    parentPhone: "919847011223",
    addedBy: "അനിൽ കുമാർ മാസ്റ്റർ (Teacher)",
    totalFee: 12000,
    paidFee: 12000,
    discount: 0,
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
    totalFee: 12000,
    paidFee: 8000,
    discount: 0,
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
    totalFee: 10000,
    paidFee: 6000,
    discount: 0,
  },
  {
    id: "STU-106",
    rollNo: "08A-01",
    name: "അഭിനവ് കൃഷ്ണ (Abhinav Krishna)",
    grade: "8",
    batchId: "B08-A",
    batchName: "Class 8 - Foundation Batch A",
    schoolName: "Govt. Achuthan HS",
    parentName: "കൃഷ്ണകുമാർ",
    parentPhone: "919847066778",
    addedBy: "രമ്യ ടീച്ചർ (Teacher)",
    totalFee: 8500,
    paidFee: 0,
    discount: 0,
  },
];

export default function App() {
  const [role, setRole] = useState<UserRole>("admin");
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const [batches] = useState<Batch[]>(INITIAL_BATCHES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  // Add Student State
  const [stuName, setStuName] = useState("");
  const [stuParent, setStuParent] = useState("");
  const [stuPhone, setStuPhone] = useState("91");
  const [stuAddedBy, setStuAddedBy] = useState("അനിൽ കുമാർ മാസ്റ്റർ");
  const [selectedBatchId, setSelectedBatchId] = useState("B10-A");

  // Attendance State
  const [attendanceMap, setAttendanceMap] = useState<Record<string, "Present" | "Absent">>({});
  const [attendanceHistoryCount, setAttendanceHistoryCount] = useState(3);

  // MCQ Exam State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);

  // Fee Payment State
  const [selectedFeeStuId, setSelectedFeeStuId] = useState("STU-102");
  const [payAmount, setPayAmount] = useState("2000");

  const metrics = useMemo(() => {
    const totalExpected = students.reduce((acc, s) => acc + (s.totalFee - s.discount), 0);
    const totalPaid = students.reduce((acc, s) => acc + s.paidFee, 0);
    const pendingBalance = totalExpected - totalPaid;
    const pendingStudentsCount = students.filter((s) => s.totalFee - s.discount - s.paidFee > 0).length;
    const fullyPaidCount = students.filter((s) => s.totalFee - s.discount - s.paidFee <= 0).length;
    return {
      totalStudents: students.length,
      totalExpected,
      totalPaid,
      pendingBalance,
      pendingStudentsCount,
      fullyPaidCount,
    };
  }, [students]);

  const handleAddStudent = () => {
    if (!stuName.trim()) {
      Alert.alert("അറിയിപ്പ്", "ദയവായി കുട്ടിയുടെ പേര് നൽകുക");
      return;
    }
    const batch = batches.find((b) => b.id === selectedBatchId) || batches[0];
    const newStu: Student = {
      id: `STU-${Date.now()}`,
      rollNo: `${batch.grade}A-0${students.length + 1}`,
      name: stuName,
      grade: batch.grade,
      batchId: batch.id,
      batchName: batch.name,
      schoolName: "Govt. HSS Kerala",
      parentName: stuParent || "രക്ഷിതാവ്",
      parentPhone: stuPhone,
      addedBy: stuAddedBy,
      totalFee: 10000,
      paidFee: 2000,
      discount: 0,
    };
    setStudents([newStu, ...students]);
    setStuName("");
    setStuParent("");
    Alert.alert("വിജയിച്ചു", `${newStu.name} എന്ന കുട്ടിയെ ${batch.name} ബാച്ചിലേക്ക് ചേർത്തു!`);
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleRecordFee = () => {
    const amt = Number(payAmount) || 0;
    if (amt <= 0) return;
    setStudents(
      students.map((s) => (s.id === selectedFeeStuId ? { ...s, paidFee: s.paidFee + amt } : s))
    );
    Alert.alert("ഫീസ് രേഖപ്പെടുത്തി", `₹${amt} വിജയകരമായി ബാലൻസ് ഷീറ്റിൽ ചേർത്തു!`);
  };

  const tabs = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "students", label: "👨‍🎓 Students" },
    { id: "attendance", label: "✅ Attendance" },
    { id: "faculties", label: "👩‍🏫 Chapters" },
    { id: "exam", label: "📝 MCQ Exam" },
    { id: "exam_report", label: "🤖 AI Report" },
    { id: "live_class", label: "🎥 Live Class" },
    { id: "student_fee", label: "💳 Student Fee" },
    { id: "fee_report", label: "📈 Fee Report" },
    { id: "communication", label: "💬 WhatsApp" },
    { id: "question_bank", label: "📚 Q-Bank" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1b4b" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🎓 കേരള ട്യൂഷൻ ആപ്പ്</Text>
          <Text style={styles.headerSubtitle}>Govt. School Classes 8, 9 & 10 (Android & iOS)</Text>
        </View>
        <View style={styles.roleSwitch}>
          {(["admin", "teacher", "student"] as UserRole[]).map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRole(r)}
              style={[styles.roleBtn, role === r && styles.roleBtnActive]}
            >
              <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>
                {r.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Horizontal Module Navigation */}
      <View style={styles.tabBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBar}>
          {tabs.map((t) => (
            <TouchableOpacity
              key={t.id}
              onPress={() => setActiveTab(t.id)}
              style={[styles.tabPill, activeTab === t.id && styles.tabPillActive]}
            >
              <Text style={[styles.tabPillText, activeTab === t.id && styles.tabPillTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 1. DASHBOARD */}
        {activeTab === "dashboard" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. ഡാഷ്‌ബോർഡ് (Complete Dashboard)</Text>
            <View style={styles.grid2}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>ആകെ കുട്ടികൾ</Text>
                <Text style={styles.metricValue}>{metrics.totalStudents}</Text>
                <Text style={styles.metricSub}>Classes 8, 9 & 10</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>ഇന്നത്തെ ഹാജർ</Text>
                <Text style={[styles.metricValue, { color: "#059669" }]}>94%</Text>
                <Text style={styles.metricSub}>{batches.length} Active Batches</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>ലഭിച്ച ഫീസ് (Paid)</Text>
                <Text style={[styles.metricValue, { color: "#4f46e5" }]}>₹{metrics.totalPaid}</Text>
                <Text style={styles.metricSub}>Fully Paid: {metrics.fullyPaidCount}</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>ബാക്കി ഫീസ് (Pending)</Text>
                <Text style={[styles.metricValue, { color: "#e11d48" }]}>₹{metrics.pendingBalance}</Text>
                <Text style={styles.metricSub}>{metrics.pendingStudentsCount} കുട്ടികൾ തരാനുണ്ട്</Text>
              </View>
            </View>
          </View>
        )}

        {/* 2. STUDENTS DATA */}
        {activeTab === "students" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. സ്റ്റുഡന്റ്സ് ഡാറ്റ & ബാച്ച് (Students Data)</Text>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>➕ പുതിയ കുട്ടിയെ ബാച്ചിലേക്ക് ചേർക്കുക</Text>
              <TextInput
                placeholder="കുട്ടിയുടെ പേര് (Student Name)"
                value={stuName}
                onChangeText={setStuName}
                style={styles.input}
              />
              <TextInput
                placeholder="രക്ഷിതാവിന്റെ പേര് (Parent Name)"
                value={stuParent}
                onChangeText={setStuParent}
                style={styles.input}
              />
              <TextInput
                placeholder="വാട്സാപ്പ് നമ്പർ (919847...)"
                value={stuPhone}
                onChangeText={setStuPhone}
                style={styles.input}
              />
              <TextInput
                placeholder="ആരാണ് ചേർത്തത്? (Added By Teacher/Admin)"
                value={stuAddedBy}
                onChangeText={setStuAddedBy}
                style={styles.input}
              />
              <TouchableOpacity style={styles.primaryBtn} onPress={handleAddStudent}>
                <Text style={styles.primaryBtnText}>കുട്ടിയെ ചേർക്കുക (Add Student)</Text>
              </TouchableOpacity>
            </View>

            {students.map((s) => (
              <View key={s.id} style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.boldText}>{s.name}</Text>
                  <Text style={styles.subText}>
                    {s.batchName} • Roll: {s.rollNo}
                  </Text>
                  <Text style={styles.badgeText}>👤 ചേർത്തത്: {s.addedBy}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveStudent(s.id)} style={styles.dangerBtn}>
                  <Text style={styles.dangerBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* 3. ATTENDANCE */}
        {activeTab === "attendance" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. ബാച്ച് അടിസ്ഥാനത്തിലുള്ള അറ്റൻഡൻസ്</Text>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>ബാച്ച് തിരഞ്ഞെടുത്ത് ഹാജർ രേഖപ്പെടുത്തുക</Text>
              {students.map((s) => {
                const status = attendanceMap[s.id] || "Present";
                return (
                  <View key={s.id} style={styles.cardRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.boldText}>{s.name}</Text>
                      <Text style={styles.subText}>{s.batchName}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setAttendanceMap({
                          ...attendanceMap,
                          [s.id]: status === "Present" ? "Absent" : "Present",
                        })
                      }
                      style={[
                        styles.statusBtn,
                        { backgroundColor: status === "Present" ? "#059669" : "#e11d48" },
                      ]}
                    >
                      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>{status}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => {
                  setAttendanceHistoryCount(attendanceHistoryCount + 1);
                  Alert.alert("ഹജർ രേഖപ്പെടുത്തി", "ഇന്നത്തെ ബാച്ച് അറ്റൻഡൻസ് ഹിസ്റ്ററിയിലേക്ക് സേവ് ചെയ്തു!");
                }}
              >
                <Text style={styles.primaryBtnText}>✅ അറ്റൻഡൻസ് സേവ് ചെയ്യുക ({attendanceHistoryCount} Records)</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 4. FACULTIES & CHAPTERS */}
        {activeTab === "faculties" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. ഫാക്കൽറ്റീസ് & ചാപ്റ്റർ പുരോഗതി</Text>
            <View style={styles.card}>
              <Text style={styles.boldText}>അനിൽ കുമാർ മാസ്റ്റർ — ഗണിതം (Class 10)</Text>
              <Text style={styles.subText}>Chapter 1: സമാന്തരശ്രേണികൾ (6/6 ഭാഗങ്ങൾ പൂർത്തിയായി - 100%)</Text>
              <Text style={styles.badgeText}>✓ സംഖ്യാ ശ്രേണികൾ, ബീജഗണിത രൂപം, പദങ്ങളുടെ തുക</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.boldText}>ദീപ ടീച്ചർ — ഊർജ്ജതന്ത്രം (Class 10)</Text>
              <Text style={styles.subText}>Chapter 2: വൈദ്യുതകാന്തിക ഫലം (5/8 ഭാഗങ്ങൾ - 62%)</Text>
              <Text style={styles.badgeText}>✓ കാന്തമണ്ഡലം, സോളിനോയിഡ്, മോട്ടോർ തത്വം</Text>
            </View>
          </View>
        )}

        {/* 5. EXAM (INSTANT SCORE) */}
        {activeTab === "exam" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. ഓൺലൈൻ പരീക്ഷ (Instant Marks MCQ Exam)</Text>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>SSLC ഗണിതം - സമാന്തരശ്രേണികൾ (5 Marks)</Text>
              <Text style={styles.boldText}>
                ചോദ്യം 1: 5, 8, 11, 14... എന്ന സമാന്തരശ്രേണിയുടെ പൊതുവ്യത്യാസം എത്ര?
              </Text>
              {["2", "3", "4", "5"].map((opt, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedOption(idx)}
                  style={[
                    styles.optionBtn,
                    selectedOption === idx && { backgroundColor: "#4f46e5", borderColor: "#4f46e5" },
                  ]}
                >
                  <Text style={{ color: selectedOption === idx ? "#fff" : "#1e293b", fontWeight: "600" }}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => setExamSubmitted(true)}
              >
                <Text style={styles.primaryBtnText}>സബ്മിറ്റ് ചെയ്ത് മാർക്ക് കാണുക</Text>
              </TouchableOpacity>
              {examSubmitted && (
                <View style={{ marginTop: 12, padding: 12, backgroundColor: "#ecfdf5", borderRadius: 10 }}>
                  <Text style={{ fontWeight: "800", color: "#065f46" }}>
                    🎉 നിങ്ങൾ നേടിയ മാർക്ക്: {selectedOption === 1 ? "5 / 5 (100%)" : "0 / 5"} (ശരിയുത്തരം: 3)
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* 6. AI EXAM GRAPHICAL REPORT */}
        {activeTab === "exam_report" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. AI എക്സാമിനേഷൻ ഗ്രാഫിക്കൽ റിപ്പോർട്ട്</Text>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>🤖 AI Performance Graph — ആദിത്യൻ കെ. ആർ. (Class 10)</Text>
              {[
                { sub: "ഗണിതം (Maths)", pct: 90 },
                { sub: "ഊർജ്ജതന്ത്രം (Physics)", pct: 93 },
                { sub: "രസതന്ത്രം (Chemistry)", pct: 75 },
                { sub: "ജീവശാസ്ത്രം (Biology)", pct: 95 },
              ].map((item, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={styles.subText}>
                    {item.sub}: {item.pct}%
                  </Text>
                  <View style={{ height: 10, backgroundColor: "#e2e8f0", borderRadius: 6 }}>
                    <View
                      style={{
                        width: `${item.pct}%`,
                        height: 10,
                        backgroundColor: "#4f46e5",
                        borderRadius: 6,
                      }}
                    />
                  </View>
                </View>
              ))}
              <Text style={[styles.badgeText, { marginTop: 8 }]}>
                🤖 AI വിലയിരുത്തൽ: കുട്ടിയുടെ ശരാശരി മാർക്ക് 88% (A+ നിലവാരം). കെമിസ്ട്രിയിൽ അല്പം കൂടി ശ്രദ്ധിച്ചാൽ മുഴുവൻ വിഷയങ്ങളിലും A+ ഉറപ്പാക്കാം.
              </Text>
            </View>
          </View>
        )}

        {/* 7. YOUTUBE LIVE CLASS */}
        {activeTab === "live_class" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. YouTube ലൈവ് ക്ലാസ് (Live Classroom)</Text>
            <View style={styles.card}>
              <Text style={styles.boldText}>🔴 SSLC Maths - വൃത്തങ്ങളും തൊടുവരകളും Live</Text>
              <Text style={styles.subText}>Batch A • അനിൽ കുമാർ മാസ്റ്റർ • 07:00 PM</Text>
              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: "#dc2626", marginTop: 10 }]}
                onPress={() => Linking.openURL("https://www.youtube.com/watch?v=aircAruvnKk")}
              >
                <Text style={styles.primaryBtnText}>▶ YouTube ലൈവ് ക്ലാസ് തുറക്കുക</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 8. STUDENT FEE BALANCE SHEET */}
        {activeTab === "student_fee" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. സ്റ്റുഡന്റ് ഫീ ബാലൻസ് ഷീറ്റ്</Text>
            <View style={styles.card}>
              <Text style={styles.cardHeader}>💳 ഫീസ് അടയ്ക്കുക</Text>
              <TextInput
                placeholder="തുക (₹)"
                value={payAmount}
                onChangeText={setPayAmount}
                keyboardType="numeric"
                style={styles.input}
              />
              <TouchableOpacity style={styles.primaryBtn} onPress={handleRecordFee}>
                <Text style={styles.primaryBtnText}>ഫീസ് രേഖപ്പെടുത്തുക</Text>
              </TouchableOpacity>
            </View>
            {students.map((s) => {
              const bal = s.totalFee - s.discount - s.paidFee;
              return (
                <View key={s.id} style={styles.card}>
                  <Text style={styles.boldText}>{s.name}</Text>
                  <Text style={styles.subText}>
                    ആകെ ഫീസ്: ₹{s.totalFee} | നൽകിയത്: ₹{s.paidFee} | ഇനി തരാനുള്ളത്: ₹{bal}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* 9. INSTITUTION FEE REPORT */}
        {activeTab === "fee_report" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. സ്ഥാപനത്തിലെ മൊത്തം ഫീ റിപ്പോർട്ട്</Text>
            <View style={styles.card}>
              <Text style={styles.boldText}>• മുഴുവൻ ഫീസും അടച്ചവർ (Fully Paid): {metrics.fullyPaidCount} പേർ</Text>
              <Text style={styles.boldText}>
                • ബാക്കി ഫീസ് തരാനുള്ളവർ (Pending Students): {metrics.pendingStudentsCount} പേർ
              </Text>
              <Text style={styles.boldText}>• ആകെ പിരിഞ്ഞുകിട്ടിയ തുക: ₹{metrics.totalPaid}</Text>
              <Text style={[styles.boldText, { color: "#e11d48" }]}>
                • ഇനി പിരിഞ്ഞുകിട്ടാനുള്ള ബാലൻസ്: ₹{metrics.pendingBalance}
              </Text>
            </View>
          </View>
        )}

        {/* 10. WHATSAPP COMMUNICATION */}
        {activeTab === "communication" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. വാട്സാപ്പ് ഗ്രൂപ്പ് കമ്മ്യൂണിക്കേഷൻ</Text>
            {batches.map((b) => (
              <View key={b.id} style={styles.card}>
                <Text style={styles.boldText}>{b.name}</Text>
                <Text style={styles.subText}>അധ്യാപകൻ: {b.classTeacher}</Text>
                <TouchableOpacity
                  style={[styles.primaryBtn, { backgroundColor: "#059669", marginTop: 8 }]}
                  onPress={() => Linking.openURL(b.whatsappGroupLink)}
                >
                  <Text style={styles.primaryBtnText}>💬 രക്ഷിതാക്കളുടെ വാട്സാപ്പ് ഗ്രൂപ്പ് തുറക്കുക</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* 11. QUESTION BANK */}
        {activeTab === "question_bank" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. ക്വസ്റ്റ്യൻ ബാങ്ക് (Question Bank)</Text>
            <View style={styles.card}>
              <Text style={styles.boldText}>
                SSLC ഗണിതം - സമാന്തരശ്രേണികൾ (കഴിഞ്ഞ 5 വർഷത്തെ ചോദ്യങ്ങൾ)
              </Text>
              <Text style={styles.subText}>
                Q1: ഒരു സമാന്തരശ്രേണിയുടെ 5-ാം പദം 17-ഉം 10-ാം പദം 32-ഉം ആയാൽ പൊതുവ്യത്യാസം കാണുക.
              </Text>
              <Text style={styles.badgeText}>ഉത്തരം: d = (32 - 17) / 5 = 3</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    backgroundColor: "#1e1b4b",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 17, fontWeight: "800" },
  headerSubtitle: { color: "#a5b4fc", fontSize: 11, marginTop: 2 },
  roleSwitch: { flexDirection: "row", backgroundColor: "#312e81", borderRadius: 8, padding: 2 },
  roleBtn: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 6 },
  roleBtnActive: { backgroundColor: "#fbbf24" },
  roleBtnText: { color: "#e0e7ff", fontSize: 10, fontWeight: "700" },
  roleBtnTextActive: { color: "#1e1b4b" },
  tabBarContainer: { backgroundColor: "#312e81", paddingVertical: 8 },
  tabBar: { paddingHorizontal: 12, gap: 8 },
  tabPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#3730a3",
    marginRight: 8,
  },
  tabPillActive: { backgroundColor: "#fbbf24" },
  tabPillText: { color: "#e0e7ff", fontSize: 12, fontWeight: "700" },
  tabPillTextActive: { color: "#1e1b4b" },
  container: { flex: 1, padding: 14 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
  grid2: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  metricCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  metricLabel: { fontSize: 11, color: "#64748b", fontWeight: "600" },
  metricValue: { fontSize: 22, fontWeight: "800", color: "#0f172a", marginVertical: 4 },
  metricSub: { fontSize: 10, color: "#64748b" },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 10,
  },
  cardRow: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeader: { fontSize: 14, fontWeight: "700", color: "#1e293b", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    marginBottom: 8,
    backgroundColor: "#f8fafc",
  },
  primaryBtn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  dangerBtn: { backgroundColor: "#ffe4e6", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  dangerBtnText: { color: "#e11d48", fontSize: 11, fontWeight: "700" },
  statusBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  optionBtn: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  boldText: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
  subText: { fontSize: 12, color: "#475569", marginTop: 2 },
  badgeText: { fontSize: 11, color: "#4f46e5", fontWeight: "600", marginTop: 4 },
});
