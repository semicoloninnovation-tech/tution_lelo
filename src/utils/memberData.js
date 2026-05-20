const MEMBERS_KEY = "tl_members";
const ATTENDANCE_KEY = "tl_attendance";
const TESTS_KEY = "tl_tests";

const defaultMembers = [
  { id: "S-1001", name: "Aarav Sharma", role: "student", className: "Class 8" },
  { id: "S-1002", name: "Sara Khan", role: "student", className: "Class 10" },
  { id: "S-1003", name: "Vihaan Patel", role: "student", className: "Class 12" },
  { id: "T-2001", name: "Neha Verma", role: "teacher", subject: "Mathematics" },
  { id: "T-2002", name: "Imran Ali", role: "teacher", subject: "Science" },
];

const defaultAttendance = [
  { date: "2026-05-10", studentId: "S-1001", status: "Present", teacherId: "T-2001" },
  { date: "2026-05-10", studentId: "S-1002", status: "Absent", teacherId: "T-2002" },
  { date: "2026-05-11", studentId: "S-1003", status: "Present", teacherId: "T-2001" },
];

const defaultTests = [
  { id: "TS-1", title: "Math Revision Test", className: "Class 8", subject: "Mathematics", date: "2026-05-20", createdBy: "T-2001" },
];

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function readArray(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return safeParse(raw, fallback);
}

function writeArray(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function getMembers() {
  return readArray(MEMBERS_KEY, defaultMembers);
}

export function setMembers(members) {
  writeArray(MEMBERS_KEY, members);
}

export function getStudents() {
  return getMembers().filter((member) => member.role === "student");
}

export function getTeachers() {
  return getMembers().filter((member) => member.role === "teacher");
}

export function addMember(member) {
  const members = getMembers();
  const next = [...members, member];
  setMembers(next);
  return next;
}

export function getAttendance() {
  return readArray(ATTENDANCE_KEY, defaultAttendance);
}

export function setAttendance(attendance) {
  writeArray(ATTENDANCE_KEY, attendance);
}

export function addAttendance(entry) {
  const attendance = getAttendance();
  const next = [...attendance, entry];
  setAttendance(next);
  return next;
}

export function getTests() {
  return readArray(TESTS_KEY, defaultTests);
}

export function setTests(tests) {
  writeArray(TESTS_KEY, tests);
}

export function addTest(test) {
  const tests = getTests();
  const next = [...tests, test];
  setTests(next);
  return next;
}
