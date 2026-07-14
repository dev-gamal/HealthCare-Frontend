import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCalendarPlus,
  faVial,
  faFilePrescription,
  faUsers,
  faCalendarDay,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="home-container">
      <div className="left-column">
        <div className="hero-stats-wrapper">
          <div className="hero-card span-2">
            <div>
              <span className="hero-subtitle">VUE D'ENSEMBLE</span>
              <h2 className="hero-title">Bienvenue, Dr. Mercier</h2>
              <p className="hero-text">
                Vous avez 12 rendez-vous prévus aujourd'hui. Votre premier
                patient arrive dans 15 minutes.
              </p>
            </div>
            <button className="hero-btn">Voir le planning</button>
          </div>
        </div>

        <div className="hero-stats-wrapper">
          {/* Stat Total Patients */}
          <div className="card stat-card">
            <div className="stat-header">
              <FontAwesomeIcon icon={faUsers} className="stat-icon" />
              <span className="stat-badge">+12%</span>
            </div>
            <div>
              <p className="stat-label">Total Patients</p>
              <h3 className="stat-value">1,284</h3>
            </div>
          </div>

          <div className="card stat-card">
            <div className="stat-header">
              <FontAwesomeIcon icon={faCalendarDay} className="stat-icon" />
              <span className="stat-sublabel">Aujourd'hui</span>
            </div>
            <div>
              <p className="stat-label">Rendez-vous</p>
              <h3 className="stat-value">24</h3>
            </div>
          </div>
        </div>

        <div className="card card-mt">
          <div className="table-header">
            <h3>Rendez-vous à venir</h3>
            <a href="/rdv" className="table-link">
              Voir tout
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Type</th>
                <th>Heure</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-flex">
                  <span className="avatar-circle">JS</span>
                  Jean-Pierre S.
                </td>
                <td className="text-gray">Consultation Générale</td>
                <td>09:30</td>
                <td>
                  <span className="status-badge status-confirmed">
                    Confirmé
                  </span>
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="action-cell-icon"
                  />
                </td>
              </tr>
              <tr>
                <td className="td-flex">
                  <span className="avatar-circle danger">ML</span>
                  Marie Laurent
                </td>
                <td className="text-gray">Suivi Post-op</td>
                <td>10:15</td>
                <td>
                  <span className="status-badge status-late">En retard</span>
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className="action-cell-icon"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="right-column">
        <h3 className="section-title">Actions Rapides</h3>
        <div className="quick-actions-grid">
          <button className="action-btn">
            <FontAwesomeIcon icon={faUserPlus} className="action-icon" />
            Nouveau Patient
          </button>
          <button className="action-btn">
            <FontAwesomeIcon icon={faCalendarPlus} className="action-icon" />
            Planifier
          </button>
          <button className="action-btn">
            <FontAwesomeIcon icon={faVial} className="action-icon" />
            Résultats Labo
          </button>
          <button className="action-btn">
            <FontAwesomeIcon
              icon={faFilePrescription}
              className="action-icon"
            />
            Ordonnance
          </button>
        </div>

        {/* Actualités Santé */}
        <div className="card">
          <h3 className="section-title">Actualités Santé</h3>
          <ul className="news-list">
            <li className="news-item">
              <p className="news-title">Webinaire: IA et Diagnostic</p>
              <span className="news-meta">Demain à 14:00 • 45 inscrits</span>
            </li>
            <li className="news-item">
              <p className="news-title">Maintenance du portail</p>
              <span className="news-meta">Samedi 22:00 - Dimanche 04:00</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
