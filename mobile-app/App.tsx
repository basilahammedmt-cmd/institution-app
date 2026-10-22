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
  // "home" shows the A PLUS ACCADEMY Icon Grid Landing Page matching the PDF
  const [activeView, setActiveView] = useState<string>("home");
  const [batches] = useState<Batch[]>(INITIAL_BATCHES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const [stuName, setStuName] = useState("");
  const [stuParent, setStuParent] = useState("");
  const [stuPhone, setStuPhone] = useState("91");
  const [stuAddedBy, setStuAddedBy] = useState("അനിൽ കുമാർ മാസ്റ്റർ");

  const [attendanceMap, setAttendanceMap] = useState<Record<string, "Present" | "Absent">>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
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

  const landingIcons = [
    { id: "dashboard", label: "DASH BOARD", symbol: "🖥️" },
    { id: "students", label: "STUDENTS", symbol: "👥" },
    { id: "attendance", label: "ATTENDENCE", symbol: "📅" },
    { id: "faculties", label: "FACULTIES&CHAPTER", symbol: "👨‍🏫" },
    { id: "exam", label: "EXAM", symbol: "📖" },
    { id: "exam_report", label: "EXAMINATION\nREPORT", symbol: "📈" },
    { id: "live_class", label: "LIVE CLASSES", symbol: "🎬" },
    { id: "student_fee", label: "STUDENT FEE", symbol: "🎓" },
    { id: "fee_report", label: "FEE REPORT", symbol: "📊" },
    { id: "communication", label: "COMMUNICATION", symbol: "✈️" },
    { id: "question_bank", label: "NOTES & QUESTION\nBANK", symbol: "📚" },
    { id: "accounts", label: "ACCOUNTS", symbol: "💵" },
  ];

  const sideButtons = [
    { id: "courses", label: "COURSES" },
    { id: "schedule", label: "SCHEDULE" },
    { id: "classes", label: "CLASSES" },
    { id: "hours", label: "HOURS" },
    { id: "materials", label: "MATERIALS" },
  ];

  const handleAddStudent = () => {
    if (!stuName.trim()) {
      Alert.alert("അറിയിപ്പ്", "ദയവായി കുട്ടിയുടെ പേര് നൽകുക");
      return;
    }
    const batch = batches[0];
    const newStu: Student = {
      id: `STU-${Date.now()}`,
      rollNo: `10A-0${students.length + 1}`,
      name: stuName,
      grade: "10",
      batchId: batch.id,
      batchName: batch.name,
      schoolName: "Govt. HSS Kerala",
      parentName: stuParent || "രക്ഷിതാവ്",
      parentPhone: stuPhone,
      addedBy: stuAddedBy,
      totalFee: 12000,
      paidFee: 2000,
      discount: 0,
    };
    setStudents([newStu, ...students]);
    setStuName("");
    setStuParent("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* A PLUS ACCADEMY Header matching PDF */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setActiveView("home")} style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoA}>A</Text>
            <Text style={styles.logoPlus}>+</Text>
          </View>
          <Text style={styles.academyTitle}>A PLUS ACCADEMY</Text>
        </TouchableOpacity>
        {activeView !== "home" && (
          <TouchableOpacity onPress={() => setActiveView("home")} style={styles.cyanBtn}>
            <Text style={styles.cyanBtnText}>← HOME</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Left Sidebar Buttons Row (COURSES, SCHEDULE, CLASSES, HOURS, MATERIALS) */}
      <View style={styles.sideBarRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {sideButtons.map((b) => (
            <TouchableOpacity key={b.id} onPress={() => setActiveView(b.id)} style={styles.cyanPillSmall}>
              <Text style={styles.cyanPillSmallText}>{b.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {activeView === "home" ? (
          /* PDF ICON GRID LANDING PAGE */
          <View style={styles.iconGrid}>
            {landingIcons.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setActiveView(item.id)}
                style={styles.iconLauncherCard}
              >
                <View style={styles.greenIconBox}>
                  <Text style={styles.greenIconSymbol}>{item.symbol}</Text>
                </View>
                <View style={styles.cyanLabelBox}>
                  <Text style={styles.cyanLabelText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* SELECTED MODULE VIEW */
          <View style={{ gap: 12 }}>
            {activeView === "dashboard" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>DASH BOARD — A PLUS ACCADEMY</Text>
                <Text style={styles.boldText}>• ആകെ കുട്ടികൾ (Total Students): {metrics.totalStudents}</Text>
                <Text style={styles.boldText}>• ശരാശരി ഹാജർ (Attendance): 94%</Text>
                <Text style={styles.boldText}>• പിരിഞ്ഞ ഫീസ് (Paid Fee): ₹{metrics.totalPaid}</Text>
                <Text style={[styles.boldText, { color: "#e11d48" }]}>
                  • ബാക്കി ഫീസ് (Pending Fee): ₹{metrics.pendingBalance}
                </Text>
              </View>
            )}

            {activeView === "students" && (
              <View style={{ gap: 10 }}>
                <View style={styles.card}>
                  <Text style={styles.cardHeader}>➕ പുതിയ കുട്ടിയെ ചേർക്കുക (STUDENTS)</Text>
                  <TextInput
                    placeholder="കുട്ടിയുടെ പേര്"
                    value={stuName}
                    onChangeText={setStuName}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="രക്ഷിതാവിന്റെ പേര്"
                    value={stuParent}
                    onChangeText={setStuParent}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="ആരാണ് ചേർത്തത്? (Added By)"
                    value={stuAddedBy}
                    onChangeText={setStuAddedBy}
                    style={styles.input}
                  />
                  <TouchableOpacity style={styles.greenBtn} onPress={handleAddStudent}>
                    <Text style={styles.greenBtnText}>കുട്ടിയെ ചേർക്കുക</Text>
                  </TouchableOpacity>
                </View>
                {students.map((s) => (
                  <View key={s.id} style={styles.card}>
                    <Text style={styles.boldText}>{s.name}</Text>
                    <Text style={styles.subText}>
                      {s.batchName} • Added by: {s.addedBy}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {activeView === "attendance" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>ATTENDENCE (Batch-wise Marking)</Text>
                {students.map((s) => {
                  const st = attendanceMap[s.id] || "Present";
                  return (
                    <View key={s.id} style={styles.rowBetween}>
                      <Text style={styles.boldText}>{s.name}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          setAttendanceMap({
                            ...attendanceMap,
                            [s.id]: st === "Present" ? "Absent" : "Present",
                          })
                        }
                        style={[
                          styles.greenBtn,
                          { backgroundColor: st === "Present" ? "#2d7a47" : "#e11d48", paddingHorizontal: 14 },
                        ]}
                      >
                        <Text style={styles.greenBtnText}>{st}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}

            {activeView === "faculties" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>FACULTIES & CHAPTER</Text>
                <Text style={styles.boldText}>അനിൽ കുമാർ മാസ്റ്റർ — ഗണിതം (Class 10)</Text>
                <Text style={styles.subText}>Chapter 1: സമാന്തരശ്രേണികൾ (6/6 ഭാഗങ്ങൾ - 100%)</Text>
              </View>
            )}

            {activeView === "exam" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>ONLINE MCQ EXAM (Instant Score)</Text>
                <Text style={styles.boldText}>
                  1. 5, 8, 11, 14... എന്ന സമാന്തരശ്രേണിയുടെ പൊതുവ്യത്യാസം എത്ര?
                </Text>
                {["2", "3", "4", "5"].map((opt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedOption(idx)}
                    style={[
                      styles.optionBtn,
                      selectedOption === idx && { backgroundColor: "#2d7a47" },
                    ]}
                  >
                    <Text style={{ color: selectedOption === idx ? "#fff" : "#000" }}>{opt}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.greenBtn} onPress={() => setExamSubmitted(true)}>
                  <Text style={styles.greenBtnText}>Submit & View Marks</Text>
                </TouchableOpacity>
                {examSubmitted && (
                  <Text style={[styles.boldText, { color: "#2d7a47", marginTop: 8 }]}>
                    നിങ്ങൾ നേടിയ മാർക്ക്: {selectedOption === 1 ? "5 / 5 (100%)" : "0 / 5"}
                  </Text>
                )}
              </View>
            )}

            {activeView === "exam_report" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>AI EXAMINATION REPORT</Text>
                <Text style={styles.boldText}>ആദിത്യൻ കെ. ആർ. — ശരാശരി മാർക്ക്: 88% (A+ Grade)</Text>
                <Text style={styles.subText}>Maths: 90% | Physics: 93% | Chemistry: 75% | Biology: 95%</Text>
              </View>
            )}

            {activeView === "live_class" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>YOUTUBE LIVE CLASSES</Text>
                <Text style={styles.boldText}>🔴 SSLC Maths - വൃത്തങ്ങളും തൊടുവരകളും Live</Text>
                <TouchableOpacity
                  style={[styles.greenBtn, { marginTop: 10 }]}
                  onPress={() => Linking.openURL("https://www.youtube.com/watch?v=aircAruvnKk")}
                >
                  <Text style={styles.greenBtnText}>▶ Watch YouTube Live</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeView === "student_fee" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>STUDENT FEE LEDGER</Text>
                <TextInput value={payAmount} onChangeText={setPayAmount} style={styles.input} />
                {students.map((s) => (
                  <Text key={s.id} style={styles.subText}>
                    {s.name}: Total ₹{s.totalFee} | Paid ₹{s.paidFee} | Balance ₹{s.totalFee - s.paidFee}
                  </Text>
                ))}
              </View>
            )}

            {activeView === "fee_report" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>INSTITUTION FEE REPORT</Text>
                <Text style={styles.boldText}>Fully Paid Students: {metrics.fullyPaidCount}</Text>
                <Text style={styles.boldText}>Pending Fee Students: {metrics.pendingStudentsCount}</Text>
                <Text style={[styles.boldText, { color: "#e11d48" }]}>
                  Total Balance Pending: ₹{metrics.pendingBalance}
                </Text>
              </View>
            )}

            {activeView === "communication" && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>WHATSAPP COMMUNICATION</Text>
                {batches.map((b) => (
                  <TouchableOpacity
                    key={b.id}
                    style={[styles.greenBtn, { marginVertical: 4 }]}
                    onPress={() => Linking.openURL(b.whatsappGroupLink)}
                  >
                    <Text style={styles.greenBtnText}>💬 Open {b.name} WhatsApp Group</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {(activeView === "question_bank" ||
              activeView === "accounts" ||
              activeView === "courses" ||
              activeView === "schedule" ||
              activeView === "classes" ||
              activeView === "hours" ||
              activeView === "materials") && (
              <View style={styles.card}>
                <Text style={styles.cardHeader}>{activeView.toUpperCase()} — A PLUS ACCADEMY</Text>
                <Text style={styles.subText}>
                  കേരള സിലബസ് 8, 9, 10 ക്ലാസുകളിലെ മുഴുവൻ പഠന വിവരങ്ങളും ഇവിടെ ലഭ്യമാണ്.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: "#169bc2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoBadge: { flexDirection: "row", alignItems: "flex-start" },
  logoA: { fontSize: 28, fontWeight: "900", color: "#1e4b85", fontStyle: "italic" },
  logoPlus: { fontSize: 18, fontWeight: "900", color: "#c81e1e", marginTop: -2 },
  academyTitle: { fontSize: 20, fontWeight: "900", color: "#195685", letterSpacing: 1 },
  sideBarRow: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
  cyanPillSmall: {
    borderWidth: 1.5,
    borderColor: "#169bc2",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  cyanPillSmallText: { fontSize: 11, fontWeight: "600", color: "#0f172a" },
  cyanBtn: {
    borderWidth: 1.5,
    borderColor: "#169bc2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  cyanBtnText: { fontSize: 11, fontWeight: "700", color: "#195685" },
  container: { flex: 1, padding: 14 },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  iconLauncherCard: {
    width: "31%",
    alignItems: "center",
    marginBottom: 22,
  },
  greenIconBox: {
    width: 64,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#2d7a47",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  greenIconSymbol: { fontSize: 28 },
  cyanLabelBox: {
    width: "100%",
    minHeight: 36,
    borderWidth: 1.5,
    borderColor: "#169bc2",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  cyanLabelText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#169bc2",
    marginBottom: 10,
  },
  cardHeader: { fontSize: 15, fontWeight: "800", color: "#195685", marginBottom: 10 },
  boldText: { fontSize: 13, fontWeight: "700", color: "#0f172a", marginVertical: 2 },
  subText: { fontSize: 12, color: "#475569", marginTop: 3 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  greenBtn: {
    backgroundColor: "#2d7a47",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  greenBtnText: { color: "#ffffff", fontWeight: "700", fontSize: 12 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
});
