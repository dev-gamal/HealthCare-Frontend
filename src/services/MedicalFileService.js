import api from "./api";

export const getMedicalFiles = async () => {
  const response = await api.get("/medical-files");
  return response.data.map((file) => ({
    ...file,
    patientName: file.patientCompleteName,
    id: file.patientId,
  }));
};
