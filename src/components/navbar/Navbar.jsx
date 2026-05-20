import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaBookOpen, FaEnvelope, FaPhoneAlt, FaTimes } from "react-icons/fa";

import "./navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuOpen || !navRef.current) return;
      if (!navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={navRef}>
      <div className="top-contact-bar">
        <a href="mailto:support@tuitionlelo.com">
          <FaEnvelope />
          support@tuitionlelo.com
        </a>
        <a href="tel:+919876543210">
          <FaPhoneAlt />
          +91 98765 43210
        </a>
      </div>

      <div className="mobile-header">
        <button
          type="button"
          className="mobile-menu-icon left-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="mobile-logo">
          <span><FaBookOpen /></span>
          <h2>TuitionLelo</h2>
        </div>

      </div>

      <nav className="navbar">

      <div className="logo">
        <span><FaBookOpen /></span>
        <h2>TuitionLelo</h2>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>

        <li>
          <Link to="/subjects" onClick={() => setMenuOpen(false)}>Subjects</Link>
        </li>

        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </li>

        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>

      </ul>

      <div className={`nav-buttons ${menuOpen ? "active" : ""}`}>

        <Link to="/student-request" className="btn" onClick={() => setMenuOpen(false)}>
          Book Tutor
        </Link>

        <Link to="/tutor-register" className="btn secondary" onClick={() => setMenuOpen(false)}>
          Become Tutor
        </Link>

      </div>

      </nav>
    </header>
  );
}

export default Navbar;
