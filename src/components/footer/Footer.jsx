import "./footer.css";
import { Link } from "react-router-dom";
import { FaBookOpen, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <span><FaBookOpen /></span>
            <h3>TuitionLelo</h3>
          </div>
          <p>Find the best verified home tutors near you.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/subjects">Subjects</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-contact">
          <span><FaPhoneAlt /> +91 9876543210</span>
          <span><FaEnvelope /> support@tuitionlelo.com</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
