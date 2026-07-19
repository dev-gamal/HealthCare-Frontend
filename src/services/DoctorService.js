import api from "./api";

export const getDoctors = async () => {
  const response = await api.get("/doctor");
  return response.data;
};

export const createDoctor = async (doctorData) => {
  return await api.post("/doctor", doctorData);
};
