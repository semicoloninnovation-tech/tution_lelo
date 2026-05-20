import { useState } from "react";

import {
  FaArrowRight,
  FaBolt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserGraduate,
} from "react-icons/fa";

function StudentRequest() {

  const [formData, setFormData] = useState({
    name: "",
    studentClass: "",
    location: "",
    contact: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost/tutionlelo_api/studentRequest.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,
            subject: "",
            subjects: "",
            tutor: "",
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {

        alert(
          "Tutor Request Submitted Successfully!"
        );

        setFormData({
          name: "",
          studentClass: "",
          location: "",
          contact: "",
        });

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (
    <section className="student-page lead-form-page cartoon-student-bg">

      <div className="container">

        <div className="lead-form-shell">

          {/* LEFT SIDE */}
          <div className="lead-form-visual student-visual">

            <span className="public-eyebrow">
              Student Request
            </span>

            <h1>
              Tell us what you need. We will
              find the right tutor.
            </h1>

            <p>
              Share simple details and we will
              quickly connect you with the right
              tutor for your class.
            </p>

            <div className="lead-benefits">

              <span>
                <FaUserGraduate />
                Personalized tutor match
              </span>

              <span>
                <FaMapMarkerAlt />
                Local home tuition
              </span>

              <span>
                <FaBolt />
                Fast callback support
              </span>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="student-form-wrapper premium-form simple-book-form">

            <div className="student-form-content">

              <h2>Book a Home Tutor</h2>

              <p>
                Fill out the form below and we
                will connect you with the best
                tutors near you.
              </p>

            </div>

            <form
              className="student-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}
              <div className="form-group">

                <label>Student Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* CLASS */}
              <div className="form-group">

                <label>Class</label>

                <input
                  type="text"
                  name="studentClass"
                  placeholder="Enter class"
                  value={formData.studentClass}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>Address</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter your address"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* CONTACT */}
              <div className="form-group">

                <label>Contact Number</label>

                <div className="form-group">

                  <input
                    type="tel"
                    name="contact"
                    placeholder="Enter contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="submit-btn book-highlight-btn"
              >
                Book Tutor Now
                <FaArrowRight />
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default StudentRequest;
