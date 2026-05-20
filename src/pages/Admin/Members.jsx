import { useEffect, useState } from "react";
import { FaIdBadge, FaUserGraduate, FaUserPlus } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { createMember, fetchMembers } from "../../utils/memberApi";

function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "student",
    className: "",
    subject: "",
  });

  useEffect(() => {
    const load = async () => {
      setMembers(await fetchMembers());
    };
    load();
  }, []);

  const addNewMember = async (e) => {
    e.preventDefault();
    const idPrefix = form.role === "teacher" ? "T" : "S";
    const updated = await createMember({
      id: `${idPrefix}-${Date.now()}`,
      name: form.name,
      role: form.role,
      className: form.role === "student" ? form.className : "",
      subject: form.role === "teacher" ? form.subject : "",
    });
    setMembers(updated);
    setForm({ name: "", role: "student", className: "", subject: "" });
  };

  return (
    <section className="dashboard-page">
      <AdminSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Admin Controls</span>
            <h1>Members</h1>
            <p>Create student and teacher member profiles.</p>
          </div>
        </div>

        <div className="member-dashboard-grid">
          <div className="member-panel premium-card">
            <h3><FaUserPlus /> Add Member</h3>
            <form className="member-form" onSubmit={addNewMember}>
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <label>Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              {form.role === "student" ? (
                <>
                  <label>Class</label>
                  <input value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} required />
                </>
              ) : (
                <>
                  <label>Subject</label>
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </>
              )}
              <button className="submit-btn" type="submit"><FaUserPlus /> Save Member</button>
            </form>
          </div>

          <div className="member-panel premium-card">
            <h3><FaIdBadge /> Member List</h3>
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Class/Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td data-label="ID">{member.id}</td>
                      <td data-label="Name">{member.name}</td>
                      <td data-label="Role">{member.role}</td>
                      <td data-label="Class/Subject">{member.role === "student" ? member.className : member.subject}</td>
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

export default Members;
