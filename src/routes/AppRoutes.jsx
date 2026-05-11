import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        

        <Route
  path="/admin/student-requests"
  element={<StudentRequests />}
/>

<Route
  path="/admin/tutor-registrations"
  element={<TutorRegistrations />}
/>

<Route
  path="/admin/contact-messages"
  element={<ContactMessages />}
/>

<Route
  path="/admin/subjects"
  element={<AdminSubjects />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
