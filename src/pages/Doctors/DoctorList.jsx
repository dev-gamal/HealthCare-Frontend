import { useState, useEffect } from "react";
import api from "../../services/api";
import DoctorForm from "./DoctorForm";
import "./doctors.css";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour gérer l'affichage du formulaire
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState(null);

  // 1. Chargement initial des données
  useEffect(() => {
    const loadInitialDoctors = async () => {
      try {
        const response = await api.get("/doctor?size=100");
        setDoctors(response.data.content);
      } catch (error) {
        console.error("Erreur lors de la récupération des médecins", error);
        alert("Impossible de charger les médecins.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialDoctors();
  }, []);

  // 2. Rafraîchissement silencieux après un ajout/modification
  const refreshDoctors = async () => {
    try {
      const response = await api.get("/doctor?size=100");
      setDoctors(response.data.content);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la liste", error);
    }
  };

  // 3. Suppression (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce médecin ?")) {
      try {
        await api.delete(`/doctor/${id}`);
        setDoctors(doctors.filter((d) => d.id !== id));
      } catch (error) {
        console.error("Erreur de suppression", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  // 4. Gestion de l'affichage du formulaire
  const handleAddClick = () => {
    setDoctorToEdit(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (doctor) => {
    setDoctorToEdit(doctor);
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    refreshDoctors();
  };

  if (loading && doctors.length === 0) return <p>Chargement des médecins...</p>;

  return (
    <div className="crud-container">
      {isFormVisible ? (
        <DoctorForm
          doctor={doctorToEdit}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <>
          <div className="crud-header">
            <h2>Gestion des Médecins</h2>
            <button className="btn-primary" onClick={handleAddClick}>
              + Ajouter un médecin
            </button>
          </div>

          <table className="simple-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Spécialité</th>
                <th>Email</th>
                <th>Téléphone</th>
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
                        Modifier
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Aucun médecin trouvé.
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