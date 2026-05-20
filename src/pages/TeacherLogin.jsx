import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaChalkboardTeacher, FaLock, FaRegEnvelope } from "react-icons/fa";
import { loginTeacher } from "../utils/memberApi";

function TeacherLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginTeacher(formData);

      if (data.status === "success" && data.teacher) {
        localStorage.setItem("teacherMember", JSON.stringify(data.teacher));
        alert("Login Successful");
        navigate("/teacher/dashboard");
      } else {
        alert(data.message || "Invalid login credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <section className="member-dashboard-page">
      <div className="container member-login-shell premium-card">
        <div className="section-title">
          <span className="public-eyebrow">Teacher Portal</span>
          <h2>Teacher Login</h2>
        </div>
        <form className="member-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <div className="input-with-icon">
            <FaRegEnvelope />
            <input
              type="email"
              name="email"
              placeholder="teacher@tuitionlelo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-with-icon">
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

          <button type="submit" className="submit-btn">
            {loading ? "Logging in..." : "Login"} <FaArrowRight />
          </button>
        </form>
        <p className="member-note"><FaChalkboardTeacher /> Login is authenticated from teacher API credentials.</p>
      </div>
    </section>
  );
}

export default TeacherLogin;
