import api from "./baseURL";


export const getMyArchive = async (filter, q = null, token = null, page = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const params = { filter };
    params.limit = 7;
    if (page) {
      params.page = page;
    }
    if (q) {
      params.q = q;
    }

    let response;
    if (token) {
      response = await api.get('/ownarchive', {
        params,
        headers
      });
    } else {
      response = await api.get('/archive', {
        params
      });
    }

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Request failed with status code ' + response.status);
    }
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while fetching archive data.');
  }
};





export const addCategory = async (label, token) => {
  try {
    if (!label) {
      throw new Error('Category label is required');
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await api.post('/category', { label }, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Optional: rethrow the error to handle it elsewhere
  }
};


export const UpdateCategory = async (category, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.put(`/category/update/${category.id}`, category, {
      headers
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteCategory = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.delete(`/category/${id}`, {
      params: { id: id },
      headers
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};