import api from './baseURL';

/** Fetch all posts by adherents (paginated + filtered). */
export const getAdherentPostes = async (token, page = 1, perPage = 10, q = '', type = '', audience = '') => {
    const headers = { Authorization: `Bearer ${token}` };
    const params  = { page, per_page: perPage };
    if (q)        params.q        = q;
    if (type)     params.type     = type;
    if (audience) params.audience = audience;
    const response = await api.get('/post-agent/postes', { headers, params });
    return response.data;
};

/** Delete a single post (post agent). */
export const deleteAdherentPoste = async (id, token) => {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.delete(`/post-agent/postes/${id}/delete`, { headers });
    return response.data;
};

/** Bulk-delete multiple posts. */
export const bulkDeleteAdherentPostes = async (ids, token) => {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post('/post-agent/postes/bulk-delete', { ids }, { headers });
    return response.data;
};

/** Fetch stats (total, by_type, by_audience, recent). */
export const getAdherentPostesStats = async (token) => {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await api.get('/post-agent/postes/stats', { headers });
    return response.data;
};
