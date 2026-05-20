import { useEffect, useState } from "react";

import {
  FaSearch,
  FaFilter,
  FaEye,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";

function StudentRequests() {

  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] =
    useState(null);
  const [statusFilter, setStatusFilter] =
    useState("all");

  // FETCH STUDENT REQUESTS
  const fetchRequests = async () => {

    try {

      const response = await fetch(
        "http://localhost/tutionlelo_api/getStudentRequests.php"
      );

      const data = await response.json();

      setRequests(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchRequests();

  }, []);

  // SEARCH FILTER
  const filteredRequests = requests.filter(
    (item) => {
      const searchMatched = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.subject
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (!searchMatched) return false;
      if (statusFilter === "all") return true;
      return (
        (item.status || "")
          .toLowerCase() === statusFilter
      );
    }
  );

  // APPROVE REQUEST
  const handleApprove = async (id) => {

    try {

      const response = await fetch(
        "http://localhost/tutionlelo_api/approveStudentRequest.php",
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

        fetchRequests();

      }

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE REQUEST
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        "http://localhost/tutionlelo_api/deleteStudentRequest.php",
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

        fetchRequests();

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
              Student Management
            </span>

            <h1>Student Requests</h1>

            <p>
              Track and manage incoming tuition
              requirements from students.
            </p>

          </div>

          <div className="dashboard-actions">

            {/* SEARCH */}
            <label className="dashboard-search">

              <FaSearch />

              <input
                type="search"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

            </label>

            <button className="icon-action">
              <FaFilter />
            </button>

          </div>

        </div>

        {/* TABLE CARD */}
        <div className="premium-table-card">

          <div className="table-header">

            <div>

              <span className="eyebrow">
                Priority Queue
              </span>

              <h2>All Student Requests</h2>

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

          {/* TABLE */}
          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>

                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  {/* <th>Subject</th>
                  <th>Tutor</th> */}
                  <th>Location</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredRequests.length > 0 ? (

                  filteredRequests.map((item) => (

                    <tr key={item.id}>

                      <td data-label="Student">{item.name}</td>

                      <td data-label="Class">
                        {item.studentClass}
                      </td>

                      {/* <td data-label="Subject">{item.subject}</td> */}

                      {/* <td data-label="Tutor">{item.tutor}</td> */}

                      <td data-label="Location">{item.location}</td>

                      <td data-label="Contact">{item.contact}</td>

                      <td data-label="Status">

                        <span
                          className={`status-pill ${
                            item.status ===
                            "Approved"
                              ? "status-matched"
                              : "status-review"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td data-label="Actions">

                        <div className="table-actions">

                          {/* VIEW */}
                          <button
                            onClick={() =>
                              setSelectedStudent(
                                item
                              )
                            }
                          >
                            <FaEye />
                          </button>

                          {/* APPROVE */}
                          <button
                            onClick={() =>
                              handleApprove(
                                item.id
                              )
                            }
                          >
                            <FaCheckCircle />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                          >
                            <FaTrash />
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
                      No student requests found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {selectedStudent && (

        <div className="modal-overlay">

          <div
            className="modal-box"
            role="dialog"
            aria-modal="true"
          >

            <h2>Student Request Details</h2>

            <div className="modal-details">

              <p>
                <strong>Name:</strong>{" "}
                {selectedStudent.name}
              </p>

              <p>
                <strong>Class:</strong>{" "}
                {
                  selectedStudent.studentClass
                }
              </p>

              {/* <p>
                <strong>Subject:</strong>{" "}
                {selectedStudent.subject}
              </p> */}

              {/* <p>
                <strong>Tutor:</strong>{" "}
                {selectedStudent.tutor}
              </p> */}

              <p>
                <strong>Location:</strong>{" "}
                {selectedStudent.location}
              </p>

              <p>
                <strong>Contact:</strong>{" "}
                {selectedStudent.contact}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedStudent.status}
              </p>

            </div>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedStudent(null)
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

export default StudentRequests;
