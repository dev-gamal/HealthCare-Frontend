import { Outlet, Link, useNavigate } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>HealthCare+</h2>
        </div>

        <nav className="sidebar-menu">
          <Link to="/dashboard" className="menu-item">
            Dashboard
          </Link>
          <Link to="/patients" className="menu-item">
            Patients
          </Link>
          <Link to="/doctors" className="menu-item">
            Doctors
          </Link>
          <Link to="/appointments" className="menu-item">
            Appointments
          </Link>
          <Link to="/medical-files" className="menu-item">
            Medical Files
          </Link>
          <Link to="/about" className="menu-item">
            About
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h3>Clinic Portal</h3>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
