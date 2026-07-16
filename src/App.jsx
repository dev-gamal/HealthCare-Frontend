import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import PatientList from "./pages/Patients/PatientList";
import DoctorList from "./pages/Doctors/DoctorList";
import Login from "./pages/Login/Login";
import "./app.css";

const AppointmentsPlaceholder = () => (
  <div>
    <h2>Gestion des Rendez-vous</h2>
    <p>Page en cours de développement...</p>
  </div>
);
const MedicalFilesPlaceholder = () => (
  <div>
    <h2>Gestion des Dossiers Médicaux</h2>
    <p>Page en cours de développement...</p>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="doctors" element={<DoctorList />} />
        <Route path="appointments" element={<AppointmentsPlaceholder />} />
        <Route path="medical-files" element={<MedicalFilesPlaceholder />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}