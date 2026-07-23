import { useState, useEffect } from "react";
import api from "../../services/api";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async (endpoint) => {
      try {
        const res = await api.get(`/${endpoint}?size=1`);
        return res.data.totalElements || 0;
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          throw err;
        }
        console.warn(`Could not fetch ${endpoint} count`, err);
        return 0;
      }
    };

    const fetchDashboardData = async () => {
      try {
        const [patients, doctors, appointments] = await Promise.allSettled([
          fetchCount("patient"),
          fetchCount("doctor"),
          fetchCount("appointment"),
        ]);

        setStats({
          patients: patients.status === "fulfilled" ? patients.value : 0,
          doctors: doctors.status === "fulfilled" ? doctors.value : 0,
          appointments: appointments.status === "fulfilled" ? appointments.value : 0,
        });
      } catch (err) {
        console.error("Error loading dashboard data", err);
        setError("Impossible to load statistics. Check your API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard - Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p className="stat-number">{stats.patients}</p>
        </div>

        <div className="stat-card">
          <h3>Total Doctors</h3>
          <p className="stat-number">{stats.doctors}</p>
        </div>

        <div className="stat-card">
          <h3>Appointments</h3>
          <p className="stat-number">{stats.appointments}</p>
        </div>
      </div>
    </div>
  );
}
