import api from "./baseURL";

export const getUsers = async (page, perPage, query, role, token) => {
  try {
    const params = {
      page: page,
      query: query,
      per_page: perPage,
      role: role,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get("admin/user", {
      headers,
      params,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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

export const registerByAdmin = async (userData, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const formData = {
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      role: userData.role,
      defaultPasword: userData.defaultPasword,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
    };
    const response = await api.post(`admin/user/new`, formData, { headers });
    return response.data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const changeRoleByAdmin = async (id, newRole, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const formData = {
      newRole: newRole,
    };
    const response = await api.put(`admin/user/${id}/change-role`, formData, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordByAdmin = async (id, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.put(
      `admin/user/${id}/reset-password`,
      {},
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserByAdmin = async (id, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.delete(`admin/user/${id}/delete`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
