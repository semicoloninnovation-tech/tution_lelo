import {
  FaEnvelope,
  FaHome,
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function AdminSidebar() {

  const menuItems = [
    {
      icon: <FaHome />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },

    {
      icon: <FaUserGraduate />,
      label: "Student Requests",
      path: "/admin/student-requests",
    },

    {
      icon: <FaChalkboardTeacher />,
      label: "Tutor Registrations",
      path: "/admin/tutor-registrations",
    },

    {
      icon: <FaEnvelope />,
      label: "Contact Messages",
      path: "/admin/contact-messages",
    },

    {
      icon: <FaBookOpen />,
      label: "Subjects",
      path: "/admin/subjects",
    },
  ];

  return (
    <aside className="dashboard-sidebar">

      {/* LOGO */}
      <div className="dashboard-logo">

        <span className="dashboard-logo-mark">
          TL
        </span>

        <div>

          <h2>TuitionLelo</h2>

          <p>Admin Studio</p>

        </div>

      </div>

      {/* MENU */}
      <ul className="dashboard-menu">

        {menuItems.map((item) => (

          <NavLink
            to={item.path}
            key={item.label}
            className={({ isActive }) =>
              isActive
                ? "menu-link active"
                : "menu-link"
            }
          >

            <li>

              {item.icon}

              <span>{item.label}</span>

            </li>

          </NavLink>

        ))}

      </ul>

    </aside>
  );
}

export default AdminSidebar;