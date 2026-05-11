import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBookOpen,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserGraduate,
} from "react-icons/fa";

function StudentRequest() {

  const [tutors, setTutors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    studentClass: "",
    subject: "",
    tutor: "",
    location: "",
    contact: "",
  });

  // FETCH APPROVED TUTORS
  useEffect(() => {

    fetch(
      "https://vnaksh.com/tutor/getApprovedTutors.php"
    )
      .then((response) => response.json())
      .then((data) => {
        setTutors(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  // FETCH SUBJECTS FROM DB
  useEffect(() => {

    fetch(
      "https://vnaksh.com/tutor/getSubjects.php"
    )
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

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
        "https://vnaksh.com/tutor/studentRequest.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
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
          subject: "",
          tutor: "",
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
    <section className="student-page lead-form-page">

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
              Share the class, subject,
              location, and contact details.
              Our team will shortlist suitable
              tutors for your learning goals.
            </p>

            <div className="lead-benefits">

              <span>
                <FaUserGraduate />
                Personalized tutor match
              </span>

              <span>
                <FaBookOpen />
                All major subjects
              </span>

              <span>
                <FaMapMarkerAlt />
                Local home tuition
              </span>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="student-form-wrapper premium-form">

            <div className="student-form-content">

              <h2>Book a Home Tutor</h2>

              <p>
                Fill out the form below and we
                will connect you with the best
                tutor near you.
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

              {/* SUBJECT DROPDOWN */}
              <div className="form-group">

                <label>Select Subject</label>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Choose Subject
                  </option>

                  {subjects.map((subject) => (

                    <option
                      key={subject.id}
                      value={subject.subject}
                    >
                      {subject.subject}
                    </option>

                  ))}

                </select>

              </div>

              {/* TUTOR DROPDOWN */}
              <div className="form-group">

                <label>Select Tutor</label>

                <select
                  name="tutor"
                  value={formData.tutor}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Choose Tutor
                  </option>

                  {tutors.map((tutor) => (

                    <option
                      key={tutor.id}
                      value={tutor.name}
                    >
                      {tutor.name}
                    </option>

                  ))}

                </select>

              </div>

              {/* LOCATION */}
              <div className="form-group">

                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* CONTACT */}
              <div className="form-group">

                <label>Contact Number</label>

                <div className="input-with-icon">

                  <FaPhoneAlt />

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
                className="submit-btn"
              >
                Submit Request
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