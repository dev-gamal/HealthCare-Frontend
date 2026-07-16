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
        console.error("Erreur lors de la récupération des patients", error);
        alert("Impossible de charger les patients.");
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
      console.error("Erreur lors de la mise à jour de la liste", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      try {
        await api.delete(`/patient/${id}`);
        setPatients(patients.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Erreur de suppression", error);
        alert("Erreur lors de la suppression.");
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

  if (loading && patients.length === 0) return <p>Chargement...</p>;

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
            <h2>Gestion des Patients</h2>
            <button className="btn-primary" onClick={handleAddClick}>
              + Ajouter un patient
            </button>
          </div>

          <table className="simple-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
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
                        Modifier
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(patient.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Aucun patient trouvé.
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
