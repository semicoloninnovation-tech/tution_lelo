import { useEffect, useState } from "react";
import {
  FaSearch,
  FaUserCheck,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";

function TutorRegistrations() {
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTutor, setSelectedTutor] =
    useState(null);
  const [statusFilter, setStatusFilter] =
    useState("all");

  // FETCH TUTORS
  const fetchTutors = async () => {
    try {
      const response = await fetch(
        "http://localhost/tutionlelo_api/getTutors.php"
      );

      const data = await response.json();

      setTutors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  // SEARCH FILTER
  const filteredTutors = tutors.filter((tutor) => {
    const searchMatched = tutor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (!searchMatched) return false;
    if (statusFilter === "all") return true;
    return (
      (tutor.status || "")
        .toLowerCase() === statusFilter
    );
  });

  // APPROVE TUTOR
  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        "http://localhost/tutionlelo_api/approveTutor.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        fetchTutors();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TUTOR
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tutor?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        "http://localhost/tutionlelo_api/deleteTutor.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        fetchTutors();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="dashboard-page">
      <AdminSidebar />

      <div className="dashboard-content">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">
              Tutor Management
            </span>

            <h1>Tutor Registrations</h1>

            <p>
              Review tutor applications and
              verify teaching profiles.
            </p>
          </div>

          {/* SEARCH */}
          <div className="dashboard-actions">
            <label className="dashboard-search">
              <FaSearch />

              <input
                type="search"
                placeholder="Search tutors..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </label>
          </div>
        </div>

        {/* TABLE */}
        <div className="premium-table-card">
          <div className="table-header">
            <div>
              <span className="eyebrow">
                Verification Center
              </span>

              <h2>Registered Tutors</h2>
            </div>
          </div>
          <div className="mobile-filter-strip">
            {[
              ["all", "All"],
              ["approved", "Approved"],
              ["pending", "Pending"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`filter-chip ${statusFilter === value ? "active" : ""}`}
                onClick={() => setStatusFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Subjects</th>
                  <th>Experience</th>
                  <th>Location</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTutors.length > 0 ? (
                  filteredTutors.map((tutor) => (
                    <tr key={tutor.id}>
                      <td data-label="Name">{tutor.name}</td>

                      <td data-label="Qualification">
                        {tutor.qualification}
                      </td>

                      <td data-label="Subjects">{tutor.subjects}</td>

                      <td data-label="Experience">{tutor.experience}</td>

                      <td data-label="Location">{tutor.location}</td>

                      <td data-label="Contact">{tutor.contact}</td>

                      <td data-label="Status">
                        <span
                          className={`status-pill ${
                            tutor.status ===
                            "Approved"
                              ? "status-active"
                              : "status-review"
                          }`}
                        >
                          {tutor.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td data-label="Actions">
                        <div className="table-actions">
                          {/* VIEW */}
                          <button
                            onClick={() =>
                              setSelectedTutor(
                                tutor
                              )
                            }
                          >
                            <FaEye />
                          </button>

                          {/* APPROVE */}
                          <button
                            onClick={() =>
                              handleApprove(
                                tutor.id
                              )
                            }
                          >
                            <FaUserCheck />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                tutor.id
                              )
                            }
                          >
                            <FaTimesCircle />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="dashboard-empty-row">
                    <td
                      className="dashboard-empty-cell"
                      colSpan="8"
                    >
                      No tutor registrations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedTutor && (
        <div className="modal-overlay">
          <div
            className="modal-box"
            role="dialog"
            aria-modal="true"
          >
            <h2>Tutor Details</h2>

            <div className="modal-details">
              <p>
                <strong>Name:</strong>{" "}
                {selectedTutor.name}
              </p>

              <p>
                <strong>
                  Qualification:
                </strong>{" "}
                {
                  selectedTutor.qualification
                }
              </p>

              <p>
                <strong>Subjects:</strong>{" "}
                {selectedTutor.subjects}
              </p>

              <p>
                <strong>
                  Experience:
                </strong>{" "}
                {
                  selectedTutor.experience
                }
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {selectedTutor.location}
              </p>

              <p>
                <strong>Contact:</strong>{" "}
                {selectedTutor.contact}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedTutor.status}
              </p>
            </div>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedTutor(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TutorRegistrations;
