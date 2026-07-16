import api from './api';

export const patientService = {
  getAll: () => api.get('/patient'),
  getById: (id) => api.get(`/patient/${id}`),
  create: (data) => api.post('/patient', data),
  update: (id, data) => api.put(`/patient/${id}`, data),
  delete: (id) => api.delete(`/patient/${id}`)
};