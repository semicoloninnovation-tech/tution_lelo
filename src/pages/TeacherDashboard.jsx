import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaClipboardList, FaPlus, FaUserGraduate } from "react-icons/fa";
import { fetchMembers, fetchTests, createAttendance, createTest } from "../utils/memberApi";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const [teacherId, setTeacherId] = useState("T-2001");
  const [teacherProfile, setTeacherProfile] =
    useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [status, setStatus] = useState("Present");
  const [testForm, setTestForm] = useState({
    title: "",
    className: "",
    subject: "",
    date: "",
  });

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    const sessionTeacher = JSON.parse(localStorage.getItem("teacherMember") || "null");
    if (sessionTeacher?.id) {
      setTeacherId(sessionTeacher.id);
      setTeacherProfile(sessionTeacher);
    }

    const load = async () => {
      const members = await fetchMembers();
      setStudents(members.filter((member) => member.role === "student"));
      setTests(await fetchTests());
    };
    load();
  }, []);
  const teacherInitial =
    (teacherProfile?.name || "T")
      .trim()
      .charAt(0)
      .toUpperCase();

  const markAttendance = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    await createAttendance({
      date: today,
      studentId: selectedStudent,
      status,
      teacherId,
    });
    alert("Attendance saved");
    setSelectedStudent("");
    setStatus("Present");
  };

  const createTestHandler = async (e) => {
    e.preventDefault();
    const updatedTests = await createTest({
      id: `TS-${Date.now()}`,
      ...testForm,
      createdBy: teacherId,
    });
    setTests(updatedTests);
    setTestForm({ title: "", className: "", subject: "", date: "" });
    alert("Test created successfully");
  };

  return (
    <section className="member-dashboard-page">
      <div className="container member-dashboard-shell">
        <div className="section-title">
          <span className="public-eyebrow">Teacher Dashboard</span>
          <h2>Attendance and test management</h2>
          <button
            type="button"
            className="ghost-btn"
            onClick={() => {
              localStorage.removeItem("teacherMember");
              navigate("/teacher/login");
            }}
          >
            Logout
          </button>
        </div>

        <div className="member-profile-card premium-card">
          <div className="member-avatar teacher-avatar">{teacherInitial}</div>
          <div>
            <h3>{teacherProfile?.name || "Teacher"}</h3>
            <div className="member-badges">
              <span className="member-badge">Teacher</span>
              <span className="member-badge">{teacherProfile?.subject || "Subject -"}</span>
            </div>
          </div>
        </div>

        <div className="member-dashboard-grid">
          <div className="member-panel premium-card">
            <h3><FaCalendarCheck /> Mark Attendance</h3>
            <form className="member-form" onSubmit={markAttendance}>
              <label>Student</label>
              <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} required>
                <option value="">Select student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>{student.name} ({student.className})</option>
                ))}
              </select>

              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>

              <button type="submit" className="submit-btn"><FaCalendarCheck /> Save Attendance</button>
            </form>
          </div>

          <div className="member-panel premium-card">
            <h3><FaPlus /> Conduct Test</h3>
            <form className="member-form" onSubmit={createTestHandler}>
              <label>Test Title</label>
              <input value={testForm.title} onChange={(e) => setTestForm({ ...testForm, title: e.target.value })} required />
              <label>Class</label>
              <input value={testForm.className} onChange={(e) => setTestForm({ ...testForm, className: e.target.value })} required />
              <label>Subject</label>
              <input value={testForm.subject} onChange={(e) => setTestForm({ ...testForm, subject: e.target.value })} required />
              <label>Date</label>
              <input type="date" value={testForm.date} onChange={(e) => setTestForm({ ...testForm, date: e.target.value })} required />
              <button type="submit" className="submit-btn"><FaClipboardList /> Create Test</button>
            </form>
          </div>
        </div>

        <div className="member-panel premium-card">
          <h3><FaClipboardList /> Upcoming Tests</h3>
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id}>
                    <td>{test.title}</td>
                    <td>{test.className}</td>
                    <td>{test.subject}</td>
                    <td>{test.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="member-note"><FaUserGraduate /> Attendance and tests are linked to your authenticated teacher profile.</p>
      </div>
    </section>
  );
}

export default TeacherDashboard;
