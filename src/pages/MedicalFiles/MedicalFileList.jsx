import { useState, useEffect } from "react";
import api from "../../services/api";
import MedicalFileForm from "./MedicalFileForm";
import "./medicalFiles.css";

export default function MedicalFileList() {
  const [medicalFiles, setMedicalFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [fileToEdit, setFileToEdit] = useState(null);

  useEffect(() => {
    const loadInitialFiles = async () => {
      try {
        const response = await api.get("/file?size=100");
        setMedicalFiles(response.data.content);
      } catch (error) {
        console.error("Error while fetching medical files", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialFiles();
  }, []);

  // 2. Rafraîchissement après modification
  const refreshFiles = async () => {
    try {
      const response = await api.get("/file?size=100");
      setMedicalFiles(response.data.content);
    } catch (error) {
      console.error("Error while updating the list", error);
    }
  };

  // 3. Suppression (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medical file?")) {
      try {
        await api.delete(`/file/${id}`);
        setMedicalFiles(medicalFiles.filter((file) => file.id !== id));
      } catch (error) {
        console.error("Error while deleting the file", error);
        alert("Error while deleting the medical file.");
      }
    }
  };

  const handleAddClick = () => {
    setFileToEdit(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (file) => {
    setFileToEdit(file);
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    refreshFiles();
  };

  if (loading && medicalFiles.length === 0) return <p>Loading medical files...</p>;

  return (
    <div className="crud-container">
      {isFormVisible ? (
        <MedicalFileForm
          medicalFile={fileToEdit}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <>
          <div className="crud-header">
            <h2>Medical File Management</h2>
            <button className="btn-primary" onClick={handleAddClick}>
              + New Medical File
            </button>
          </div>

          <table className="simple-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Diagnosis</th>
                <th>Observation</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicalFiles.length > 0 ? (
                medicalFiles.map((file) => (
                  <tr key={file.id}>
                    <td>{file.id}</td>
                    <td>{file.patientCompleteName || `Patient #${file.patientId}`}</td>
                    <td>{file.diagnosis}</td>
                    <td>{file.observation}</td>
                    <td>{file.creationDate}</td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEditClick(file)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(file.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No medical file found.
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