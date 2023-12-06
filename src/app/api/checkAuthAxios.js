import api from "./baseURL";

export const checkAuth = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.get(`/check-auth`, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
