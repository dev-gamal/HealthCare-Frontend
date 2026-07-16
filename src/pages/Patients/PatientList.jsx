import { useState, useEffect } from "react";
import api from "../../services/api";
import "./patientList.css";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/patient");
        setPatients(response.data.content);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="list-container">
      <h2>Liste des Patients</h2>
      <button className="btn-primary">Ajouter un patient</button>

      <table className="simple-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.lastName}</td>
              <td>{patient.firstName}</td>
              <td>{patient.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
