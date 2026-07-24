import "./errorDisplay.css";

const ErrorDispaly = ({ statusCode, message }) => {
  if (!statusCode && !message) return null;

  let errorTypeClass = "error-default";

  if (statusCode >= 500) {
    errorTypeClass = "error-server";
  } else if (statusCode === 401 || statusCode === 403) {
    errorTypeClass = "error-auth";
  } else if (statusCode === 404) {
    errorTypeClass = "error-not-found";
  } else if (statusCode === 400) {
    errorTypeClass = "error-client";
  }

  return (
    <div className={`error-display-container ${errorTypeClass}`}>
      <div className="error-icon">
        {statusCode >= 500 ? "🔥" : statusCode === 403 ? "⛔" : "⚠️"}
      </div>
      <div className="error-contnet">
        {statusCode && (
          <span className="error-status">HTTP error {statusCode}</span>
        )}
        <span className="error-message">{message}</span>
      </div>
    </div>
  );
};

export default ErrorDispaly;