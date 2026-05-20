import {
  addAttendance as addAttendanceLocal,
  addMember as addMemberLocal,
  addTest as addTestLocal,
  getAttendance as getAttendanceLocal,
  getMembers as getMembersLocal,
  getTests as getTestsLocal,
} from "./memberData";

const API_BASE = "https://vnaksh.com/tutor";

async function safeJson(response) {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

async function tryApi(url, options) {
  const response = await fetch(url, options);
  return safeJson(response);
}

export async function fetchMembers() {
  try {
    const data = await tryApi(`${API_BASE}/getMembers.php`);
    return Array.isArray(data) ? data : getMembersLocal();
  } catch {
    return getMembersLocal();
  }
}

export async function createMember(payload) {
  try {
    const data = await tryApi(`${API_BASE}/createMember.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (data?.status === "success") {
      return fetchMembers();
    }
  } catch {
    // fallback below
  }
  addMemberLocal(payload);
  return getMembersLocal();
}

export async function fetchAttendance() {
  try {
    const data = await tryApi(`${API_BASE}/getAttendance.php`);
    return Array.isArray(data) ? data : getAttendanceLocal();
  } catch {
    return getAttendanceLocal();
  }
}

export async function createAttendance(payload) {
  try {
    const data = await tryApi(`${API_BASE}/createAttendance.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (data?.status === "success") {
      return fetchAttendance();
    }
  } catch {
    // fallback below
  }
  addAttendanceLocal(payload);
  return getAttendanceLocal();
}

export async function fetchTests() {
  try {
    const data = await tryApi(`${API_BASE}/getTests.php`);
    return Array.isArray(data) ? data : getTestsLocal();
  } catch {
    return getTestsLocal();
  }
}

export async function createTest(payload) {
  try {
    const data = await tryApi(`${API_BASE}/createTest.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (data?.status === "success") {
      return fetchTests();
    }
  } catch {
    // fallback below
  }
  addTestLocal(payload);
  return getTestsLocal();
}

export async function loginTeacher(credentials) {
  const data = await tryApi(`${API_BASE}/teacherLogin.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return data;
}
