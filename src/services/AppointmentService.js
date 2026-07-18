import api from "./api";

export const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data.map((app) => ({
    ...app,
    doctorInfo: `${app.doctorName} (${app.doctorSpecialty})`,
    patientName: app.patientCompleteName,
  }));
};
