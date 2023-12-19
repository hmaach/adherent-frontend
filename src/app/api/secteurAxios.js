import api from "./baseURL";

export const getSecteurs = async () => {
  try {
    const response = await api.get(`/public/secteur`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const AddSecteur = async (secteur, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const response = await api.post(`/admin/secteur/add`, secteur, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateSecteur = async (id, secteur, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.put(`/admin/secteur/update/${id}`, secteur, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteSecteur = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.delete(`/admin/secteur/delete/${id}`, {
      params: { id: id },
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
