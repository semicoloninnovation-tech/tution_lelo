import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaBookOpen, FaTimes } from "react-icons/fa";

import "./navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="logo">
        <span><FaBookOpen /></span>
        <h2>TuitionLelo</h2>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/subjects">Subjects</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

      </ul>

      <div className={`nav-buttons ${menuOpen ? "active" : ""}`}>

        <Link to="/student-request" className="btn">
          Book Tutor
        </Link>

        <Link to="/tutor-register" className="btn secondary">
          Become Tutor
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
