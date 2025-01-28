import axiosInstance from "../utils/axiosInstance";

// Fetch dashboard stats
export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/dashboard/stats");
  return response.data;
};
