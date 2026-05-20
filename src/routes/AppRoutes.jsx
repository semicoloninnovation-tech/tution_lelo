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
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import StudentLogin from "../pages/StudentLogin";
import TeacherLogin from "../pages/TeacherLogin";

import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import StudentRequests from "../pages/Admin/StudentRequests";
import TutorRegistrations from "../pages/Admin/TutorRegistrations";
import ContactMessages from "../pages/Admin/ContactMessages";

import ScrollAnimations from "../components/ScrollAnimations";
import AdminSubjects from "../pages/Admin/Subjects";
import Members from "../pages/Admin/Members";
import Attendance from "../pages/Admin/Attendance";
import Tests from "../pages/Admin/Tests";

function ProtectedAdminRoute({ children }) {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function ProtectedStudentRoute({ children }) {
  const student = localStorage.getItem("studentMember");
  if (!student) {
    return <Navigate to="/student/login" replace />;
  }
  return children;
}

function ProtectedTeacherRoute({ children }) {
  const teacher = localStorage.getItem("teacherMember");
  if (!teacher) {
    return <Navigate to="/teacher/login" replace />;
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

          <Route
            path="/student/login"
            element={<StudentLogin />}
          />

          <Route
            path="/teacher/login"
            element={<TeacherLogin />}
          />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedStudentRoute>
                <StudentDashboard />
              </ProtectedStudentRoute>
            }
          />

          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedTeacherRoute>
                <TeacherDashboard />
              </ProtectedTeacherRoute>
            }
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

        <Route
          path="/admin/members"
          element={
            <ProtectedAdminRoute>
              <Members />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedAdminRoute>
              <Attendance />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/tests"
          element={
            <ProtectedAdminRoute>
              <Tests />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
