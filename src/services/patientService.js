import api from "./api";

export const getPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};

export const getPatientDetails = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const addPatient = async (patientData) => {
  return await api.post("/patients", patientData);
};
