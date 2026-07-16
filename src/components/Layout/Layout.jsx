import { Outlet, Link, useNavigate } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>HealthCare+</h2>
        </div>

        <nav className="sidebar-menu">
          <Link to="/dashboard" className="menu-item">
            Tableau de bord
          </Link>
          <Link to="/patients" className="menu-item">
            Patients
          </Link>
          <Link to="/doctors" className="menu-item">
            Médecins
          </Link>
          <Link to="/appointments" className="menu-item">
            Rendez-vous
          </Link>
          <Link to="/medical-files" className="menu-item">
            Dossiers Médicaux
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h3>Portail Clinique</h3>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
