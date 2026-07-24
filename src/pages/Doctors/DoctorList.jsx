import { useState, useEffect } from "react";
import api from "../../services/api";
import DoctorForm from "./DoctorForm";
import ErrorDisplay from "../../components/Errors/ErrorDisplay";
import "./doctors.css";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState({ code: null, message: "" });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState(null);

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
    const loadInitialDoctors = async () => {
      try {
        const response = await api.get("/doctor?size=100");
        setDoctors(response.data.content);
        setErrorData({ code: null, message: "" });
      } catch (error) {
        handleApiError(error, "Impossible to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialDoctors();
  }, []);

  const refreshDoctors = async () => {
    try {
      const response = await api.get("/doctor?size=100");
      setDoctors(response.data.content);
      setErrorData({ code: null, message: "" });
    } catch (error) {
      handleApiError(error, "Error refreshing doctors list");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await api.delete(`/doctor/${id}`);
        setDoctors(doctors.filter((d) => d.id !== id));
        setErrorData({ code: null, message: "" });
      } catch (error) {
        handleApiError(error, "Error occurred while deleting the doctor.");
      }
    }
  };

  const handleAddClick = () => {
    setErrorData({ code: null, message: "" });
    setDoctorToEdit(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (doctor) => {
    setErrorData({ code: null, message: "" });
    setDoctorToEdit(doctor);
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    refreshDoctors();
  };

  if (loading && doctors.length === 0) return <p>Loading doctors...</p>;

  return (
    <div className="crud-container">
      <ErrorDisplay statusCode={errorData.code} message={errorData.message} />

      {isFormVisible ? (
        <DoctorForm
          doctor={doctorToEdit}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <>
          <div className="crud-header">
            <h2>Doctor Management</h2>
            <button className="btn-primary" onClick={handleAddClick}>
              + Add Doctor
            </button>
          </div>

          <table className="simple-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialty}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEditClick(doctor)}
                      >
                        Modify
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No doctor found.
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