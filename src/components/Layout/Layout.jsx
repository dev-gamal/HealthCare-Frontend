import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./layout.css";

export default function Layout() {
  const { user, logout } = useAuth();

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
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h3>Clinic Portal</h3>

          {user && (
            <div className="user-profile">
              <span className="user-name">{user.username}</span>
              <span className="user-separator"> - </span>
              <span className="user-role">{user.role}</span>
            </div>
          )}
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
