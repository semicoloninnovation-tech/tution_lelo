import { useEffect, useState } from "react";
import { FaCalendarCheck, FaUserGraduate } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { fetchAttendance, fetchMembers } from "../../utils/memberApi";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const load = async () => {
      setAttendance(await fetchAttendance());
      setMembers(await fetchMembers());
    };
    load();
  }, []);

  const findName = (id) => members.find((m) => m.id === id)?.name || id;

  return (
    <section className="dashboard-page">
      <AdminSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Admin Controls</span>
            <h1>Attendance Records</h1>
            <p>Track student attendance entries created by teachers.</p>
          </div>
        </div>

        <div className="member-panel premium-card">
          <h3><FaCalendarCheck /> Attendance Log</h3>
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Teacher</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((row, idx) => (
                  <tr key={`${row.studentId}-${idx}`}>
                    <td data-label="Date">{row.date}</td>
                    <td data-label="Student">{findName(row.studentId)}</td>
                    <td data-label="Teacher">{findName(row.teacherId)}</td>
                    <td data-label="Status">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="member-note"><FaUserGraduate /> Data is API-ready with automatic local fallback.</p>
      </div>
    </section>
  );
}

export default Attendance;
