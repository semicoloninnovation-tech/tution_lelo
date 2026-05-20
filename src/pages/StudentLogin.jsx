import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaUserGraduate } from "react-icons/fa";
import { fetchMembers } from "../utils/memberApi";

function StudentLogin() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const members = await fetchMembers();
      setStudents(members.filter((member) => member.role === "student"));
    };
    load();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentId) return;
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    setLoading(true);
    localStorage.setItem("studentMember", JSON.stringify(student));
    navigate("/student/dashboard");
  };

  return (
    <section className="member-dashboard-page">
      <div className="container member-login-shell premium-card">
        <div className="section-title">
          <span className="public-eyebrow">Student Portal</span>
          <h2>Student Login</h2>
        </div>
        <form className="member-form" onSubmit={handleSubmit}>
          <label>Select Student Profile</label>
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
            <option value="">Choose student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.className})
              </option>
            ))}
          </select>
          <button type="submit" className="submit-btn">
            {loading ? "Logging in..." : "Login"} <FaArrowRight />
          </button>
        </form>
        <p className="member-note"><FaUserGraduate /> Demo login uses member profiles managed by admin.</p>
      </div>
    </section>
  );
}

export default StudentLogin;
