import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuickAction = ({ icon, label, onClick }) => {
  return (
    <button className="action-btn" onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="action-icon" />
      {label}
    </button>
  );
};

export default QuickAction;
