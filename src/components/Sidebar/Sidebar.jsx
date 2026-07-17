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
    { path: "/", name: "Dashboard", icon: faHouse },
    { path: "/patients", name: "Patients", icon: faUsers },
    { path: "/doctors", name: "Doctors", icon: faUserDoctor },
    { path: "/appointments", name: "Appointments", icon: faCalendarCheck },
    { path: "/medical-records", name: "Medical Records", icon: faFolderOpen },
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
          <span>About</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
