import { useState, useEffect } from "react";
import api from "../../services/api";
import PatientForm from "./PatientForm";
import "./patients.css";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  useEffect(() => {
    const loadInitialPatients = async () => {
      try {
        const response = await api.get("/patient?size=100");
        setPatients(response.data.content);
      } catch (error) {
        console.error("Error loading patients", error);
        alert("Impossible to load patients.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialPatients();
  }, []);

  const refreshPatients = async () => {
    try {
      const response = await api.get("/patient?size=100");
      setPatients(response.data.content);
    } catch (error) {
      console.error("Error updating patients list", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await api.delete(`/patient/${id}`);
        setPatients(patients.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting patient", error);
        alert("Error occurred while deleting the patient.");
      }
    }
  };

  const handleAddClick = () => {
    setPatientToEdit(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (patient) => {
    setPatientToEdit(patient);
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    refreshPatients();
  };

  if (loading && patients.length === 0) return <p>Loading...</p>;

  return (
    <div className="crud-container">
      {isFormVisible ? (
        <PatientForm
          patient={patientToEdit}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <>
          <div className="crud-header">
            <h2>Patient Management</h2>
            <button className="btn-primary" onClick={handleAddClick}>
              + Add Patient
            </button>
          </div>

          <table className="simple-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.firstName}</td>
                    <td>{patient.email}</td>
                    <td>{patient.phone}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEditClick(patient)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(patient.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No patient found.
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
