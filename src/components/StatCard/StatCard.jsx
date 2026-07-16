import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatCard = ({ icon, badge, sublabel, label, value }) => {
  return (
    <div className="card stat-card">
      <div className="stat-header">
        <FontAwesomeIcon icon={icon} className="stat-icon" />

        {badge && <span className="stat-badge">{badge}</span>}
        {sublabel && <span className="stat-sublabel">{sublabel}</span>}
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
