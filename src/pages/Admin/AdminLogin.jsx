import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaBookOpen,
  FaChartLine,
  FaLock,
  FaMagic,
  FaRegEnvelope,
  FaShieldAlt,
  FaUserGraduate,
} from "react-icons/fa";

function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // LOGIN SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "https://semicoloninnovations.in/tuitionleo/adminLogin.php",
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

        // SAVE ADMIN SESSION
        localStorage.setItem(
          "admin",
          JSON.stringify(data.admin)
        );

        alert("Login Successful");

        navigate("/admin/dashboard");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

    setLoading(false);

  };

  return (
    <section className="admin-login-page">

      <div className="admin-login-shell">

        {/* LEFT SIDE */}
        <div className="admin-login-visual">

          <div className="admin-login-brand">

            <span className="brand-mark">
              <FaBookOpen />
            </span>

            <span>TuitionLelo</span>

          </div>

          <div className="admin-login-copy">

            <span className="eyebrow">

              <FaMagic />

              Premium learning command center

            </span>

            <h1>
              Manage every learner journey
              from one elegant workspace.
            </h1>

            <p>
              Track tutor onboarding,
              student requests, messages,
              and platform growth with a
              calm, modern dashboard built
              for daily operations.
            </p>

          </div>

          <div className="admin-login-highlights">

            <div>

              <FaUserGraduate />

              <span>2.4k</span>

              <p>Active learners</p>

            </div>

            <div>

              <FaChartLine />

              <span>94%</span>

              <p>Match success</p>

            </div>

            <div>

              <FaShieldAlt />

              <span>Secure</span>

              <p>Admin access</p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="admin-login-box">

          <div className="admin-login-header">

            <span className="login-badge">
              Admin Portal
            </span>

            <h2>Welcome Back</h2>

            <p>
              Sign in to manage tutors,
              students, requests, and
              website data.
            </p>

          </div>

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="form-group admin-form-group">

              <label>Email Address</label>

              <div className="admin-input-wrap">

                <FaRegEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="admin@tuitionlelo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="form-group admin-form-group">

              <label>Password</label>

              <div className="admin-input-wrap">

                <FaLock />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="submit-btn admin-submit-btn"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Login"}

              <FaArrowRight />

            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default AdminLogin;
