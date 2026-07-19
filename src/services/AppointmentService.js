import api from "./api";

export const getAppointments = async () => {
  const response = await api.get("/appointment");
  return response.data.content.map((app) => ({
    ...app,
    doctorInfo: `${app.doctorName} (${app.doctorSpecialty})`,
    patientName: app.patientCompleteName,
  }));
};
