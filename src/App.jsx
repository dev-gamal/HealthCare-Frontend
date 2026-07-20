import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import PatientList from "./pages/Patients/PatientList";
import DoctorList from "./pages/Doctors/DoctorList";
import Login from "./pages/Login/Login";
import AppointmentList from "./pages/Appointments/AppointmentList";
import MedicalFileList from "./pages/MedicalFiles/MedicalFileList";
import About from "./pages/About/About";
import { AuthProvider } from "./context/AuthProvider";
import AuthGuard from "./components/Guards/AuthGuard";
import RoleGuard from "./components/Guards/RoleGuard";

import "./app.css";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" replace />} />

        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />

            <Route element={<RoleGuard allowedRoles={["ADMIN", "DOCTOR"]} />}>
              <Route path="/patients" element={<PatientList />} />
              <Route path="/appointments" element={<AppointmentList />} />
              <Route path="/medical-files" element={<MedicalFileList />} />
            </Route>

            <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
              <Route path="/doctors" element={<DoctorList />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
