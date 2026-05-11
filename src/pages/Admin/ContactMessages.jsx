import { useEffect, useState } from "react";

import {
  FaEnvelopeOpenText,
  FaReply,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";

function ContactMessages() {

  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] =
    useState("");
  const [selectedMessage, setSelectedMessage] =
    useState(null);

  // FETCH MESSAGES
  const fetchMessages = async () => {

    try {

      const response = await fetch(
        "https://vnaksh.com/tutor/getContactMessages.php"
      );

      const data = await response.json();

      setMessages(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchMessages();

  }, []);

  // SEARCH FILTER
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      msg.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // MARK AS READ
  const handleReply = async (id) => {

    try {

      const response = await fetch(
        "https://vnaksh.com/tutor/updateMessageStatus.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            status: "Resolved",
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {

        fetchMessages();

      }

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE MESSAGE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        "https://vnaksh.com/tutor/deleteContactMessage.php",
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

        fetchMessages();

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
              Support Center
            </span>

            <h1>Contact Messages</h1>

            <p>
              Review and respond to support
              and inquiry messages.
            </p>

          </div>

          {/* SEARCH */}
          <div className="dashboard-actions">

            <label className="dashboard-search">

              <FaSearch />

              <input
                type="search"
                placeholder="Search messages..."
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
                Inbox
              </span>

              <h2>Recent Messages</h2>

            </div>

          </div>

          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredMessages.length > 0 ? (

                  filteredMessages.map((msg) => (

                    <tr key={msg.id}>

                      <td>{msg.name}</td>

                      <td>{msg.email}</td>

                      <td>
                        {msg.message.slice(0, 40)}
                        ...
                      </td>

                      <td>

                        <span
                          className={`status-pill ${
                            msg.status ===
                            "Resolved"
                              ? "status-matched"
                              : "status-new"
                          }`}
                        >
                          {msg.status}
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td>

                        <div className="table-actions">

                          {/* VIEW */}
                          <button
                            onClick={() =>
                              setSelectedMessage(
                                msg
                              )
                            }
                          >
                            <FaEnvelopeOpenText />
                          </button>

                          {/* RESOLVE */}
                          <button
                            onClick={() =>
                              handleReply(
                                msg.id
                              )
                            }
                          >
                            <FaReply />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                msg.id
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
                      colSpan="5"
                    >
                      No messages found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {selectedMessage && (

        <div className="modal-overlay">

          <div
            className="modal-box"
            role="dialog"
            aria-modal="true"
          >

            <h2>Message Details</h2>

            <div className="modal-details">

              <p>
                <strong>Name:</strong>{" "}
                {selectedMessage.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedMessage.email}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedMessage.status}
              </p>

              <p>
                <strong>Message:</strong>
              </p>

              <p>
                {selectedMessage.message}
              </p>

            </div>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedMessage(null)
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

export default ContactMessages;
