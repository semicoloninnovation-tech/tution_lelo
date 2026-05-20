import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { fetchMembers, fetchTests } from "../../utils/memberApi";

function Tests() {
  const [tests, setTests] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const load = async () => {
      setTests(await fetchTests());
      setMembers(await fetchMembers());
    };
    load();
  }, []);

  const findTeacher = (id) => members.find((member) => member.id === id)?.name || id;

  return (
    <section className="dashboard-page">
      <AdminSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Admin Controls</span>
            <h1>Tests</h1>
            <p>Monitor tests created by teachers for students.</p>
          </div>
        </div>

        <div className="member-panel premium-card">
          <h3><FaClipboardList /> Test Registry</h3>
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id}>
                    <td data-label="Title">{test.title}</td>
                    <td data-label="Class">{test.className}</td>
                    <td data-label="Subject">{test.subject}</td>
                    <td data-label="Date">{test.date}</td>
                    <td data-label="Teacher">{findTeacher(test.createdBy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tests;
