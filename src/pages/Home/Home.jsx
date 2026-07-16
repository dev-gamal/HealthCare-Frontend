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
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

import StatCard from "../../components/StatCard/StatCard";
import QuickAction from "../../components/QuickAction/QuickAction";

const Home = () => {
  const upcomingAppointments = [
    {
      id: 1,
      patient: "Jean-Pierre S.",
      initiales: "JS",
      type: "Consultation Générale",
      heure: "09:30",
      statut: "Confirmé",
      statutClass: "status-confirmed",
      avatarClass: "",
    },
    {
      id: 2,
      patient: "Marie Laurent",
      initiales: "ML",
      type: "Suivi Post-op",
      heure: "10:15",
      statut: "En retard",
      statutClass: "status-late",
      avatarClass: "danger",
    },
  ];

  const handleQuickAction = (actionName) => {
    console.log(`Quick action triggered : ${actionName}`);
  };

  return (
    <div className="home-container">
      <div className="left-column">
        <div className="hero-stats-wrapper">
          <div className="hero-card span-2">
            <div>
              <span className="hero-subtitle">VUE D'ENSEMBLE</span>
              <h2 className="hero-title">Bienvenue, Dr. Mercier</h2>
              <p className="hero-text">
                Vous avez {upcomingAppointments.length} rendez-vous prévus
                aujourd'hui. Votre premier patient arrive dans 15 minutes.
              </p>
            </div>
            <button className="hero-btn">Voir le planning</button>
          </div>
        </div>

        <div className="hero-stats-wrapper">
          <StatCard
            icon={faUsers}
            badge="+12%"
            label="Total Patients"
            value="1,284"
          />
          <StatCard
            icon={faUserDoctor}
            sublabel="Actifs"
            label="Médecins"
            value="42"
          />
          <StatCard
            icon={faCalendarDay}
            sublabel="Aujourd'hui"
            label="Rendez-vous"
            value="24"
          />
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
              {upcomingAppointments.map((rdv) => (
                <tr key={rdv.id}>
                  <td className="td-flex">
                    <span className={`avatar-circle ${rdv.avatarClass}`}>
                      {rdv.initiales}
                    </span>
                    {rdv.patient}
                  </td>
                  <td className="text-gray">{rdv.type}</td>
                  <td>{rdv.heure}</td>
                  <td>
                    <span className={`status-badge ${rdv.statutClass}`}>
                      {rdv.statut}
                    </span>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className="action-cell-icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="right-column">
        <h3 className="section-title">Actions Rapides</h3>
        <div className="quick-actions-grid">
          <QuickAction
            icon={faUserPlus}
            label="Nouveau Patient"
            onClick={() => handleQuickAction("Nouveau Patient")}
          />
          <QuickAction
            icon={faCalendarPlus}
            label="Planifier"
            onClick={() => handleQuickAction("Planifier")}
          />
          <QuickAction
            icon={faVial}
            label="Résultats Labo"
            onClick={() => handleQuickAction("Résultats Labo")}
          />
          <QuickAction
            icon={faFilePrescription}
            label="Ordonnance"
            onClick={() => handleQuickAction("Ordonnance")}
          />
        </div>

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
