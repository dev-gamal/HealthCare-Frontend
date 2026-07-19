import api from "./api";

export const getMedicalFiles = async () => {
  const response = await api.get("/file");
  return response.data.content.map((file) => ({
    ...file,
    patientName: file.patientCompleteName,
  }));
};
