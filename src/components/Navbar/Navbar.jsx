import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Rechercher un patient, un dossier..." />
      </div>

      <div className="navbar-actions">
        <div className="bell-icon">
          <FontAwesomeIcon icon={faBell} />
        </div>
        
        <div className="user-profile">
          <div className="user-info">
            <p className="user-name">Dr. Gamal Badie</p>
            <p className="user-role">Administrateur</p>
          </div>
          <div className="user-avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;