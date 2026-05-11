import { useState } from "react";
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Admin Login Submitted");
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-shell">
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

            <h1>Manage every learner journey from one elegant workspace.</h1>

            <p>
              Track tutor onboarding, student requests, messages, and platform
              growth with a calm, modern dashboard built for daily operations.
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

        <div className="admin-login-box">
          <div className="admin-login-header">
            <span className="login-badge">Admin Portal</span>

            <h2>Welcome Back</h2>

            <p>
              Sign in to manage tutors, students, requests, and website data.
            </p>
          </div>

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

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

            <button type="submit" className="submit-btn admin-submit-btn">
              Login
              <FaArrowRight />
            </button>

          </form>
        </div>

      </div>

    </section>
  );
}

export default AdminLogin;
