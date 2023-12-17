import api from "./baseURL";

export const register = async (userData) => {
  try {
    const params = {
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
      acceptTerms: userData.terms,
    };
    const response = await api.post(`/register`, params);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
