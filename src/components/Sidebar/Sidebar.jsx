import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faUserDoctor,
  faCalendarCheck,
  faFolderOpen,
  faCircleInfo,
  faBriefcaseMedical,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navItems = [
    { path: "/", name: "Tableau de bord", icon: faHouse },
    { path: "/patients", name: "Patients", icon: faUsers },
    { path: "/medecins", name: "Médecins", icon: faUserDoctor },
    { path: "/rdv", name: "Rendez-vous", icon: faCalendarCheck },
    { path: "/dossiers", name: "Dossiers médicaux", icon: faFolderOpen },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <FontAwesomeIcon icon={faBriefcaseMedical} />
        </div>
        <h1 className="sidebar-title">HealthCare+</h1>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="nav-bottom">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FontAwesomeIcon icon={faCircleInfo} className="nav-icon" />
          <span>À propos</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
