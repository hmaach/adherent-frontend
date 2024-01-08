import api from "./baseURL";

export const getAnnounces = async (id, token = null) => {
  try {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await api.get(`/announce/${id}`, { headers });
      return response.data;
    } else {
      const response = await api.get(`/public/announce/${id}`);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAccueilAnnounces = async (page) => {
  try {
    const response = await api.get(`/public/announces?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUnimprovedAnnounces = async (page, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const response = await api.get(`/admin/announce?page=${page}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    // console.log(error);
    throw error
  }
};

export const searchAccueilAnnounces = async (q, page) => {
  try {
    const response = await api.get(
      `/public/announces/search/${q}/?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const publierAnnounce = async (announce, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const response = await api.post("/announce/store", announce, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editAnnounces = async (announces, deletedAnnounce, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const requestData = {
      announces: announces,
      deletedAnnounce: deletedAnnounce,
    };

    const response = await api.put(`/announce/edit`, requestData, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const approveAnnounce = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.put(
      `/admin/announce/approve/${id}`,
      {},
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnnounce = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.delete(`/admin/announce/delete/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
