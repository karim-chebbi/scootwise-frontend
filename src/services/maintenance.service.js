import api from "../api/axios";

export const reportIssue = async (payload) => {
  const response = await api.post("/maintenance", payload);
  return response.data;
};

export const getMaintenanceReports = async () => {
  const response = await api.get("/maintenance");
  return response.data;
};

export const resolveMaintenance = async (id) => {
  const response = await api.put(`/maintenance/resolve/${id}`);
  return response.data;
};
