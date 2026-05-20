import { useEffect, useState } from "react";

import {
  FaArrowRight,
  FaAward,
  FaBookOpen,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
} from "react-icons/fa";

import MultiSelectDropdown from "../components/MultiSelectDropdown";

function TutorRegister() {

  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    subjects: [],
    experience: "",
    location: "",
    contact: "",
  });

  // FETCH SUBJECTS FROM DB
  useEffect(() => {

    fetch(
      "http://localhost/tutionlelo_api/getSubjects.php"
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

  const subjectOptions = subjects.map((subject) => ({
    value: subject.subject,
    label: subject.subject,
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
        "http://localhost/tutionlelo_api/registerTutor.php",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...formData,
            subjects:
              formData.subjects.join(", "),
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {

        alert(
          "Tutor Registration Submitted Successfully!"
        );

        setFormData({
          name: "",
          qualification: "",
          subjects: [],
          experience: "",
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
    <section className="tutor-page lead-form-page cartoon-tutor-bg">

      <div className="container">

        <div className="lead-form-shell reverse">

          {/* LEFT SIDE */}
          <div className="lead-form-visual tutor-visual">

            <span className="public-eyebrow">
              Tutor Registration
            </span>

            <h1>
              Join a premium network of trusted
              home tutors.
            </h1>

            <p>
              Register your teaching profile and
              connect with students looking for
              reliable learning support nearby.
            </p>

            <div className="lead-benefits">

              <span>
                <FaAward />
                Verified profile visibility
              </span>

              <span>
                <FaBookOpen />
                Subject-based student leads
              </span>

              <span>
                <FaMapMarkerAlt />
                Local teaching opportunities
              </span>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="tutor-form-wrapper premium-form">

            <div className="tutor-form-content">

              <h2>Become a Tutor</h2>

              <p>
                Register yourself as a tutor
                and start teaching students
                near your location.
              </p>

            </div>

            <form
              className="tutor-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}
              <div className="form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* QUALIFICATION */}
              <div className="form-group">

                <label>Qualification</label>

                <input
                  type="text"
                  name="qualification"
                  placeholder="Enter qualification"
                  value={
                    formData.qualification
                  }
                  onChange={handleChange}
                  required
                />

              </div>

              {/* SUBJECTS */}
              <div className="form-group">

                <label>
                  Select Subjects
                </label>

                <MultiSelectDropdown
                  id="tutor-subjects"
                  label="Select Subjects"
                  options={subjectOptions}
                  selectedValues={formData.subjects}
                  onChange={(selectedSubjects) =>
                    setFormData({
                      ...formData,
                      subjects: selectedSubjects,
                    })
                  }
                  placeholder="Choose one or more subjects"
                  emptyMessage="No subjects available"
                />

              </div>

              {/* EXPERIENCE */}
              <div className="form-group">

                <label>Experience</label>

                <input
                  type="text"
                  name="experience"
                  placeholder="Teaching experience"
                  value={
                    formData.experience
                  }
                  onChange={handleChange}
                  required
                />

              </div>

              {/* LOCATION */}
              <div className="form-group">

                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Your location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* CONTACT */}
              <div className="form-group">

                <label>
                  Contact Number
                </label>

                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="submit-btn"
              >

                <FaChalkboardTeacher />

                Register as Tutor

                <FaArrowRight />

              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default TutorRegister;
