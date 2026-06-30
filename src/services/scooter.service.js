import api from "../api/axios";

export const getScooters = async () => {
  const response = await api.get("/scooters");
  return response.data;
};

export const createScooter = async (payload) => {
  const response = await api.post("/scooters", payload);
  return response.data;
};

export const deleteScooter = async (id) => {
  const response = await api.delete(`/scooters/${id}`);
  return response.data;
};

export const updateScooterLocation = async (id, location) => {
  const response = await api.put(`/scooters/${id}/location`, location);
  return response.data;
};
