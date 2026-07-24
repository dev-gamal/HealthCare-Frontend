import { useState, useEffect } from "react";
import api from "../../services/api";
import AppointmentForm from "./AppointmentForm";
import ErrorDisplay from "../../components/Errors/ErrorDisplay";
import "./appointments.css";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState({ code: null, message: "" });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);

  const handleApiError = (error, defaultMessage) => {
    console.error("API Error:", error);
    if (error.response) {
      setErrorData({
        code: error.response.status,
        message: error.response.data?.message || defaultMessage,
      });
    } else {
      setErrorData({ code: 503, message: "Cannot connect to the server." });
    }
  };

  useEffect(() => {
    const loadInitialAppointments = async () => {
      try {
        const response = await api.get("/appointment?size=100");
        setAppointments(response.data.content);
        setErrorData({ code: null, message: "" });
      } catch (error) {
        handleApiError(error, "Error while fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    loadInitialAppointments();
  }, []);

  const refreshAppointments = async () => {
    try {
      const response = await api.get("/appointment?size=100");
      setAppointments(response.data.content);
      setErrorData({ code: null, message: "" });
    } catch (error) {
      handleApiError(error, "Error while updating the list");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Cancel and delete this appointment?")) {
      try {
        await api.delete(`/appointment/${id}`);
        setAppointments(appointments.filter((a) => a.id !== id));
        setErrorData({ code: null, message: "" });
      } catch (error) {
        handleApiError(error, "Error while deleting appointment.");
      }
    }
  };

  const handleAddClick = () => {
    setErrorData({ code: null, message: "" });
    setAppointmentToEdit(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (appointment) => {
    setErrorData({ code: null, message: "" });
    setAppointmentToEdit(appointment);
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    refreshAppointments();
  };

  if (loading && appointments.length === 0)
    return <p>Loading appointments...</p>;

  return (
    <div className="crud-container">
      <ErrorDisplay statusCode={errorData.code} message={errorData.message} />

      {isFormVisible ? (
        <AppointmentForm
          appointment={appointmentToEdit}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <>
          <div className="crud-header">
            <h2>Appointments Management</h2>
            <button className="btn-primary" onClick={handleAddClick}>
              + New Appointment
            </button>
          </div>

          <table className="simple-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patientCompleteName || "N/A"}</td>
                    <td>{appointment.doctorName || "N/A"}</td>
                    <td>
                      {new Date(appointment.appointmentDate).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${appointment.status?.toLowerCase()}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEditClick(appointment)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
