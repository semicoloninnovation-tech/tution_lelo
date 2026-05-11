import { useState } from "react";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://vnaksh.com/tutor/contactMessage.php",
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

        alert("Message Sent Successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
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
    <section className="contact-page inner-page premium-section">

      <div className="container">

        {/* HERO */}
        <div className="inner-hero contact-hero">

          <div>

            <span className="public-eyebrow">
              Contact Us
            </span>

            <h1>
              Have a question? We are here to
              help you choose better.
            </h1>

            <p>
              Reach out for tutor matching,
              student support, partnerships,
              or anything you want to clarify
              before getting started.
            </p>

          </div>

        </div>

        <div className="contact-wrapper">

          {/* LEFT INFO */}
          <div className="contact-info">

            <div className="contact-card premium-card">

              <FaPhoneAlt className="contact-icon" />

              <div>

                <h3>Phone Number</h3>

                <p>+91 9876543210</p>

              </div>

            </div>

            <div className="contact-card premium-card">

              <FaEnvelope className="contact-icon" />

              <div>

                <h3>Email Address</h3>

                <p>support@tuitionlelo.com</p>

              </div>

            </div>

            <div className="contact-card premium-card">

              <FaWhatsapp className="contact-icon" />

              <div>

                <h3>WhatsApp</h3>

                <p>Chat with us anytime</p>

              </div>

            </div>

            <div className="contact-map-card premium-card">

              <FaMapMarkerAlt />

              <h3>
                Serving Local Learning Needs
              </h3>

              <p>
                Home tuition support across
                nearby student communities.
              </p>

            </div>

          </div>

          {/* CONTACT FORM */}
          <form
            className="contact-form premium-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            <div className="form-group">

              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}
            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* MESSAGE */}
            <div className="form-group">

              <label>Message</label>

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="submit-btn"
            >
              Send Message
              <FaPaperPlane />
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;