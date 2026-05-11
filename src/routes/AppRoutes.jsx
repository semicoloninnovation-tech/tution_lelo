import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Subjects from "../pages/Subjects";
import StudentRequest from "../pages/StudentRequest";
import TutorRegister from "../pages/TutorRegister";

import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import StudentRequests from "../pages/Admin/StudentRequests";
import TutorRegistrations from "../pages/Admin/TutorRegistrations";
import ContactMessages from "../pages/Admin/ContactMessages";

import ScrollAnimations from "../components/ScrollAnimations";
import AdminSubjects from "../pages/Admin/Subjects";

function ProtectedAdminRoute({ children }) {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollAnimations />

      <Routes>

        {/* PUBLIC WEBSITE */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/subjects" element={<Subjects />} />

          <Route
            path="/student-request"
            element={<StudentRequest />}
          />

          <Route
            path="/tutor-register"
            element={<TutorRegister />}
          />

        </Route>

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <Navigate to="/admin/dashboard" replace />
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/student-requests"
          element={
            <ProtectedAdminRoute>
              <StudentRequests />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/tutor-registrations"
          element={
            <ProtectedAdminRoute>
              <TutorRegistrations />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/contact-messages"
          element={
            <ProtectedAdminRoute>
              <ContactMessages />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/subjects"
          element={
            <ProtectedAdminRoute>
              <AdminSubjects />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
