import api from "../api/axios";

export const getRides = async () => {
  const response = await api.get("/rides");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/rides/stats");
  return response.data;
};

export const startRide = async (scooterId) => {
  const response = await api.post("/rides/start", { scooterId });
  return response.data;
};

export const endRide = async (rideId) => {
  const response = await api.put(`/rides/end/${rideId}`);
  return response.data;
};
