import api from "./baseURL";

export const getAdherent = async (id, token = null) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    if (token) {
      const response = await api.get(`/adherent/${id}`, {
        headers,
      });
      return response.data;
    } else {
      const response = await api.get(`/public/adherent/${id}`);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRandomFourAdherents = async () => {
  const response = await api.get(`/public/4-adherents/`);
  return response.data;
};

export const updateProfilAdherent = async (image, id, token) => {
  try {
    const formData = new FormData();
    formData.append("img", image);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const response = await api.post(`/adherent/${id}/update-profil`, formData, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const UpdateProfilImage = async (img, id, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const response = await api.post(`/adherent/${id}/updateImage`, {
      img: img,
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteProfilImage = async (id, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.delete(`/adherent/${id}/remove-profil`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateApropos = async (id, post, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.put(`/adherent/${id}/update`, post, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const rateAdherent = async (id, value, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const data = { value: value }; // Define your data object
    const response = await api.post(`/adherent/${id}/rate`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
