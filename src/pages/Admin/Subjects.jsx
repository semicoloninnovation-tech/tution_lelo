import { useEffect, useState } from "react";

import {
  FaBookOpen,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";

function Subjects() {

  // STATES
  const [subjects, setSubjects] =
    useState([]);

  const [subjectName, setSubjectName] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  // FETCH SUBJECTS
  const fetchSubjects = async () => {

    try {

      const response = await fetch(
        "https://vnaksh.com/tutor/getSubjects.php"
      );

      const data =
        await response.json();

      setSubjects(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchSubjects();

  }, []);

  // ADD / UPDATE SUBJECT
  const handleSubmit = async () => {

    if (!subjectName) {

      alert("Enter subject name");

      return;

    }

    try {

      const response = await fetch(
        "https://vnaksh.com/tutor/addSubject.php",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id: editId,
            subject: subjectName,
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      setSubjectName("");
      setEditId(null);

      fetchSubjects();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE SUBJECT
  const deleteSubject = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this subject?"
      );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        "https://vnaksh.com/tutor/deleteSubject.php",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      fetchSubjects();

    } catch (error) {

      console.log(error);

    }

  };

  // EDIT SUBJECT
  const editSubject = (subject) => {

    setSubjectName(subject.subject);

    setEditId(subject.id);

  };

  return (
    <section className="dashboard-page">

      <AdminSidebar />

      <div className="dashboard-content">

        {/* HEADER */}
        <div className="dashboard-header">

          <div>

            <span className="eyebrow">
              Subject Management
            </span>

            <h1>Subjects</h1>

            <p>
              Manage all subjects available
              for tutor registration and
              student requests.
            </p>

          </div>

        </div>

        {/* ADD SUBJECT */}
        <div className="premium-table-card">

          <div className="subject-manager-toolbar">

            <input
              className="subject-manager-input"
              type="text"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) =>
                setSubjectName(
                  e.target.value
                )
              }
            />

            <button
              className="submit-btn"
              onClick={handleSubmit}
            >

              <FaPlus />

              {editId
                ? "Update Subject"
                : "Add Subject"}

            </button>

          </div>

          {/* SUBJECT LIST */}
          <div className="subject-manager-grid">

            {subjects.length > 0 ? (

              subjects.map((subject) => (

                <div
                  className="subject-manager-card"
                  key={subject.id}
                >

                  <div className="subject-manager-label">

                    <FaBookOpen />

                    <span>
                      {subject.subject}
                    </span>

                  </div>

                  <div className="subject-manager-actions">

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        editSubject(subject)
                      }
                    >

                      <FaEdit />

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteSubject(
                          subject.id
                        )
                      }
                    >

                      <FaTrash />

                    </button>

                  </div>

                </div>

              ))

            ) : (

              <p className="dashboard-empty-copy">
                No subjects found
              </p>

            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Subjects;
