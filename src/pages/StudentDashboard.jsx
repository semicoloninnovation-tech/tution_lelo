import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaCalendarCheck, FaClipboardList } from "react-icons/fa";
import { fetchAttendance, fetchMembers, fetchTests } from "../utils/memberApi";

function StudentDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [currentStudentId, setCurrentStudentId] = useState("");

  useEffect(() => {
    const sessionStudent = JSON.parse(localStorage.getItem("studentMember") || "null");
    if (sessionStudent?.id) {
      setCurrentStudentId(sessionStudent.id);
    }

    const load = async () => {
      const members = await fetchMembers();
      setStudents(members.filter((member) => member.role === "student"));
      setTests(await fetchTests());
      setAttendance(await fetchAttendance());
    };
    load();
  }, []);

  const currentStudent = students.find((student) => student.id === currentStudentId) || students[0];

  const studentAttendance = useMemo(
    () => attendance.filter((entry) => entry.studentId === currentStudent?.id),
    [attendance, currentStudent]
  );

  const presentCount = studentAttendance.filter((entry) => entry.status === "Present").length;
  const attendancePercent = studentAttendance.length
    ? Math.round((presentCount / studentAttendance.length) * 100)
    : 0;
  const studentInitial =
    (currentStudent?.name || "S")
      .trim()
      .charAt(0)
      .toUpperCase();

  return (
    <section className="member-dashboard-page">
      <div className="container member-dashboard-shell">
        <div className="section-title">
          <span className="public-eyebrow">Student Dashboard</span>
          <h2>Attendance and test updates</h2>
          <button
            type="button"
            className="ghost-btn"
            onClick={() => {
              localStorage.removeItem("studentMember");
              navigate("/student/login");
            }}
          >
            Logout
          </button>
        </div>

        <div className="member-profile-card premium-card">
          <div className="member-avatar">{studentInitial}</div>
          <div>
            <h3>{currentStudent?.name || "Student"}</h3>
            <div className="member-badges">
              <span className="member-badge">Student</span>
              <span className="member-badge">{currentStudent?.className || "Class -"}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-stats member-stats">
          <div className="stat-card">
            <div className="stat-icon"><FaCalendarCheck /></div>
            <h3>{attendancePercent}%</h3>
            <p>Attendance Score</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaClipboardList /></div>
            <h3>{tests.length}</h3>
            <p>Available Tests</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaBookOpen /></div>
            <h3>{currentStudent?.className || "-"}</h3>
            <p>Current Class</p>
          </div>
        </div>

        <div className="member-dashboard-grid">
          <div className="member-panel premium-card">
            <h3><FaCalendarCheck /> My Attendance</h3>
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAttendance.map((entry, idx) => (
                    <tr key={`${entry.date}-${idx}`}>
                      <td>{entry.date}</td>
                      <td>{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="member-panel premium-card">
            <h3><FaClipboardList /> Assigned Tests</h3>
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
        </div>
      </div>
    </section>
  );
}

export default StudentDashboard;
