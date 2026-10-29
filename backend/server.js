const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "database.json");
const INDEX_HTML = path.join(__dirname, "..", "index.html");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function sendJSON(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (req.method === "OPTIONS") {
    return sendJSON(res, 200, { ok: true });
  }

  // Serve Main Web Application (A PLUS ACCADEMY Landing Page + All Modules)
  if (req.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
    const html = fs.readFileSync(INDEX_HTML, "utf-8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(html);
  }

  // REST API Endpoints
  if (pathname === "/api/dashboard" && req.method === "GET") {
    const db = readDB();
    return sendJSON(res, 200, { academyName: "A PLUS ACCADEMY", ...db });
  }

  if (pathname === "/api/students" && req.method === "GET") {
    return sendJSON(res, 200, readDB().students);
  }

  if (pathname === "/api/students" && req.method === "POST") {
    const body = await parseBody(req);
    const db = readDB();
    const batch = db.batches.find((b) => b.id === body.batchId) || db.batches[0];
    const newStudent = {
      id: `STU-${100 + db.students.length + 1}`,
      rollNo: body.rollNo || `${batch.grade}A-0${db.students.length + 1}`,
      name: body.name,
      grade: batch.grade,
      batchId: batch.id,
      batchName: batch.name,
      schoolName: body.schoolName || "Govt. HSS Kerala",
      parentName: body.parentName || "",
      parentPhone: body.parentPhone || "",
      addedBy: body.addedBy || "Admin",
      joinedDate: new Date().toISOString().split("T")[0],
      totalFee: Number(body.totalFee || 12000),
      paidFee: Number(body.paidFee || 0),
      discount: 0,
      feeHistory: [],
    };
    db.students.unshift(newStudent);
    writeDB(db);
    return sendJSON(res, 201, newStudent);
  }

  if (pathname === "/api/attendance" && req.method === "GET") {
    return sendJSON(res, 200, readDB().attendance);
  }

  if (pathname === "/api/faculties" && req.method === "GET") {
    return sendJSON(res, 200, readDB().facultyChapters);
  }

  if (pathname === "/api/exams" && req.method === "GET") {
    const db = readDB();
    return sendJSON(res, 200, { exams: db.exams, attempts: db.attempts });
  }

  if (pathname === "/api/live-classes" && req.method === "GET") {
    return sendJSON(res, 200, readDB().liveClasses);
  }

  if (pathname === "/api/fees/report" && req.method === "GET") {
    return sendJSON(res, 200, readDB().students);
  }

  if (pathname === "/api/question-bank" && req.method === "GET") {
    return sendJSON(res, 200, readDB().questionBank);
  }

  if (pathname === "/api/accounts" && req.method === "GET") {
    return sendJSON(res, 200, readDB().accounts || []);
  }

  sendJSON(res, 404, { error: "Endpoint not found" });
});

server.listen(PORT, () => {
  console.log(`✅ A PLUS ACCADEMY Server running at http://localhost:${PORT}`);
});
