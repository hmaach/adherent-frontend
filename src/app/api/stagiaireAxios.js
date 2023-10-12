import api from "./baseURL";

export const getCv = async (id) => {
  try {
    const response = await api.get(`/stagiaire/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCompétences = async (id) => {
  try {
    const response = await api.get(`/stagiaire/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCv = async (id, request, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.put(`/stagiaire/${id}`, request, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



export const updateProfilePicture = async (id, file, token) => {
  try {
    const formData = new FormData();
    formData.append('profile_picture', file);

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const response = await api.post(`/stagiaire/${id}/profile-picture`, formData, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const importStagiaire = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/stagiaires/import', formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchData = async () => {
  try {
    const response = await api.get('/stagiairesExc');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchFetch = async (query) => {
  try {
    // Perform the search request to your API
    const response = await api.post(`/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch search results');
  }
};

export const addPropos = async (id, request, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post(`/stagiaires/${id}/add-propos`, request, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const request = { currentPassword, newPassword };
    const response = await api.post("/change-password", request, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateCompetences = async (userId, competenceId, request) => {
  try {
    const response = await api.put(`/stagiaire/${userId}/competences/${competenceId}`, request);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addCompetences = async (userId, request) => {
  try {
    const response = await api.post(`/stagiaire/${userId}/competences`, request);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




export const updateExperience = async (userId, experienceId, request) => {
  try {
    const response = await api.put(`/stagiaires/${userId}/experiences/${experienceId}`, request);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addExperience = async (experience) => {
  try {
    const { userId, titre, dateDeb, dateFin, mission } = experience;
    const response = await api.post(`/stagiaires/${userId}/experiences`, {
      titre,
      dateDeb,
      dateFin,
      mission
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addFormation = async (id, request, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post(`/formations/${id}`, request, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateFormation = async (id, formationId, request, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.put(`/formations/${id}/${formationId}`, request, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addInteret = async (id, request, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post(`/interets/${id}`, request, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateInteret = async (id, interetId, request, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.put(`/interets/${id}/${interetId}`, request, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};