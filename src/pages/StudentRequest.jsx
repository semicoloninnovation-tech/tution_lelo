import { useEffect, useState } from "react";

import {
  FaArrowRight,
  FaBookOpen,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserGraduate,
} from "react-icons/fa";

import MultiSelectDropdown from "../components/MultiSelectDropdown";

function StudentRequest() {

  const [tutors, setTutors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    studentClass: "",
    subjects: [],
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

  // FETCH SUBJECTS
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

    if (e.target.name === "tutor") {
      setFormData({
        ...formData,
        tutor: e.target.value,
        subjects: [],
      });

      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const selectedTutor = tutors.find(
    (tutor) => tutor.name === formData.tutor
  );

  const tutorSubjects =
    selectedTutor?.subjects || selectedTutor?.subject || "";

  const availableSubjects = tutorSubjects
    ? tutorSubjects
        .split(",")
        .map((subject) => subject.trim())
        .filter(Boolean)
    : subjects.map((subject) => subject.subject);

  const subjectOptions = availableSubjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  // SUBMIT FORM
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.subjects.length === 0) {
      alert("Please select at least one subject");
      return;
    }

    try {

      const response = await fetch(
        "https://vnaksh.com/tutor/studentRequest.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,
            subject: formData.subjects.join(", "),
            subjects: formData.subjects.join(", "),
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
          subjects: [],
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
              Share the class, subjects,
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

              {/* MULTIPLE SUBJECT DROPDOWN */}
              <div className="form-group">

                <label>Select Subjects</label>

                <MultiSelectDropdown
                  id="student-subjects"
                  label="Select Subjects"
                  options={subjectOptions}
                  selectedValues={formData.subjects}
                  onChange={(selectedSubjects) =>
                    setFormData({
                      ...formData,
                      subjects: selectedSubjects,
                    })
                  }
                  placeholder={
                    formData.tutor
                      ? "Choose one or more subjects"
                      : "Select a tutor first"
                  }
                  disabled={!formData.tutor}
                  emptyMessage="No subjects available for this tutor"
                />

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
