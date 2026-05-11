import { useEffect, useState } from "react";

import {
  FaArrowUp,
  FaBell,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaSearch,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";

function AdminDashboard() {

  // STATES
  const [studentRequests, setStudentRequests] =
    useState([]);

  const [filteredStudents, setFilteredStudents] =
    useState([]);

  const [tutorCount, setTutorCount] =
    useState(0);

  const [contactCount, setContactCount] =
    useState(0);

  const [totalUsers, setTotalUsers] =
    useState(0);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showAll, setShowAll] =
    useState(false);

  // FETCH DASHBOARD DATA
  const fetchDashboardData = async () => {

    try {

      // STUDENT REQUESTS
      const studentResponse = await fetch(
        "https://vnaksh.com/tutor/getStudentRequests.php"
      );

      const studentData =
        await studentResponse.json();

      setStudentRequests(studentData);
      setFilteredStudents(studentData);

      // TUTOR DATA
      const tutorResponse = await fetch(
        "https://vnaksh.com/tutor/getTutors.php"
      );

      const tutorData =
        await tutorResponse.json();

      setTutorCount(tutorData.length);

      // CONTACT DATA
      const contactResponse = await fetch(
        "https://vnaksh.com/tutor/getContactMessages.php"
      );

      const contactData =
        await contactResponse.json();

      setContactCount(contactData.length);

      // TOTAL USERS
      setTotalUsers(
        studentData.length +
          tutorData.length
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  // SEARCH FUNCTION
  useEffect(() => {

    const filtered =
      studentRequests.filter(
        (student) =>
          student.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          student.subject
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          student.location
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );

    setFilteredStudents(filtered);

  }, [searchTerm, studentRequests]);

  // STATS
  const stats = [
    {
      icon: <FaUserGraduate />,
      value: studentRequests.length,
      label: "Student Requests",
      trend: "Live Database",
    },

    {
      icon: <FaChalkboardTeacher />,
      value: tutorCount,
      label: "Tutor Registrations",
      trend: "Updated Live",
    },

    {
      icon: <FaEnvelope />,
      value: contactCount,
      label: "Contact Messages",
      trend: "Need Attention",
    },

    {
      icon: <FaUsers />,
      value: totalUsers,
      label: "Total Users",
      trend: "Platform Users",
    },
  ];

  // DISPLAY STUDENTS
  const displayedStudents = showAll
    ? filteredStudents
    : filteredStudents.slice(0, 5);

  return (
    <section className="dashboard-page">

      <AdminSidebar />

      <div className="dashboard-content">

        {/* HEADER */}
        <div className="dashboard-header">

          <div>

            <span className="eyebrow">
              Live Education Operations
            </span>

            <h1>Admin Dashboard</h1>

            <p>
              Welcome back, Admin.
              Your learning marketplace
              is looking sharp today.
            </p>

          </div>

          {/* SEARCH */}
          <div className="dashboard-actions">

            <label className="dashboard-search">

              <FaSearch />

              <input
                type="search"
                placeholder="Search requests, tutors..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
              />

            </label>

            <button
              className="icon-action"
              aria-label="Notifications"
            >
              <FaBell />
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="dashboard-stats">

          {stats.map((stat) => (

            <div
              className="stat-card"
              key={stat.label}
            >

              <div className="stat-card-top">

                <div className="stat-icon">
                  {stat.icon}
                </div>

                <span>

                  <FaArrowUp />

                  {stat.trend}

                </span>

              </div>

              <h3>{stat.value}</h3>

              <p>{stat.label}</p>

            </div>

          ))}

        </div>

        {/* MAIN GRID */}
        <div className="dashboard-grid">

          {/* STUDENT TABLE */}
          <div className="dashboard-table-section">

            <div className="section-heading">

              <div>

                <span className="eyebrow">
                  Priority Queue
                </span>

                <h2>
                  Recent Student Requests
                </h2>

              </div>

              {/* VIEW ALL BUTTON */}
              <button
                className="ghost-btn"
                onClick={() =>
                  setShowAll(!showAll)
                }
              >
                {showAll
                  ? "Show Less"
                  : "View All"}
              </button>

            </div>

            <div className="dashboard-table-wrapper">

              <table className="dashboard-table">

                <thead>

                  <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {displayedStudents.length >
                  0 ? (

                    displayedStudents.map(
                      (student) => (

                        <tr
                          key={student.id}
                        >

                          <td>
                            {student.name}
                          </td>

                          <td>
                            {
                              student.studentClass
                            }
                          </td>

                          <td>
                            {
                              student.subject
                            }
                          </td>

                          <td>
                            {
                              student.location
                            }
                          </td>

                          <td>

                            <span
                              className={`status-pill ${
                                student.status ===
                                "Approved"
                                  ? "status-matched"
                                  : "status-review"
                              }`}
                            >
                              {
                                student.status
                              }
                            </span>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr className="dashboard-empty-row">

                      <td
                        className="dashboard-empty-cell"
                        colSpan="5"
                      >
                        No student requests
                        found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ACTIVITY PANEL */}
          <div className="activity-panel">

            <div className="section-heading">

              <div>

                <span className="eyebrow">
                  Today
                </span>

                <h2>Activity Pulse</h2>

              </div>

            </div>

            <div className="activity-list">

              {/* TUTORS */}
              <div className="activity-item">

                <FaCheckCircle />

                <div>

                  <h3>
                    {tutorCount} tutor
                    profiles registered
                  </h3>

                  <p>
                    Active tutor database
                    updated
                  </p>

                </div>

              </div>

              {/* STUDENTS */}
              <div className="activity-item">

                <FaCalendarCheck />

                <div>

                  <h3>
                    {
                      studentRequests.length
                    }{" "}
                    student requests
                  </h3>

                  <p>
                    Tuition requests are
                    increasing
                  </p>

                </div>

              </div>

              {/* CONTACTS */}
              <div className="activity-item">

                <FaClock />

                <div>

                  <h3>
                    {contactCount} support
                    messages
                  </h3>

                  <p>
                    Waiting for admin
                    response
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AdminDashboard;
