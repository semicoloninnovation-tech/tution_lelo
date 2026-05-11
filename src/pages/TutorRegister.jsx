import { useState } from "react";
import {
  FaArrowRight,
  FaAward,
  FaBookOpen,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
} from "react-icons/fa";

function TutorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    subjects: "",
    experience: "",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
         "https://vnaksh.com/tutor/registerTutor.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        alert("Tutor Registration Submitted!");

        setFormData({
          name: "",
          qualification: "",
          subjects: "",
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
    <section className="tutor-page lead-form-page">
      <div className="container">
        <div className="lead-form-shell reverse">
          <div className="lead-form-visual tutor-visual">
            <span className="public-eyebrow">
              Tutor Registration
            </span>

            <h1>
              Join a premium network of trusted home tutors.
            </h1>

            <p>
              Register your teaching profile and connect
              with students looking for reliable,
              subject-focused learning support nearby.
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

          <div className="tutor-form-wrapper premium-form">
            <div className="tutor-form-content">
              <h2>Become a Tutor</h2>

              <p>
                Register yourself as a tutor and start
                teaching students near your location.
              </p>
            </div>

            <form
              className="tutor-form"
              onSubmit={handleSubmit}
            >
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

              <div className="form-group">
                <label>Qualification</label>

                <input
                  type="text"
                  name="qualification"
                  placeholder="Enter qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Subjects</label>

                <input
                  type="text"
                  name="subjects"
                  placeholder="Subjects you teach"
                  value={formData.subjects}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Experience</label>

                <input
                  type="text"
                  name="experience"
                  placeholder="Teaching experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

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

              <div className="form-group">
                <label>Contact Number</label>

                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

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