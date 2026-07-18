import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import PatientList from "./pages/Patients/PatientList";
import DoctorList from "./pages/Doctors/DoctorList";
import Login from "./pages/Login/Login";
import AppointmentList from "./pages/Appointments/AppointmentList";
import MedicalFileList from "./pages/MedicalFiles/MedicalFileList";
import About from "./pages/About/About";
import "./app.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/medical-files" element={<MedicalFileList />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
