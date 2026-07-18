import api from "./api";

export const getDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

export const createDoctor = async (doctorData) => {
  return await api.post("/doctors", doctorData);
};
