import api from "./baseURL";

export const getEvents = async (token = null) => {
  try {
    if (token) {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await api.get("/events", { headers });
      return response.data;
    } else {
      const response = await api.get("/eventspublic");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const showEvent = async (id, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.get(`/showevent/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const showEvents = async (ids, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.get("/showevents", {
      params: { ids },
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getThisMonthEvents = async (token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.get(`/monthevents`, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addEvent = async (event, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post("/events", event, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEvent = async (id, event, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.put(`/events/${id}`, event, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelEvent = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post(`/events/${id}/cancel`, null, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const restoreEventColor = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post(`/events/${id}/restore-color`, null, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.delete(`/events/${id}`, {
      params: { id: id },
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const SupprimerPost = async (id, token) => {
//   try {
//       const headers = { Authorization: `Bearer ${token}` };
//       const response = await api.delete(`/poste/${id}`, {
//           params: { id: id },
//           headers
//       });
//       return response.data;
//   } catch (error) {
//       console.log(error);
//   }
// };
