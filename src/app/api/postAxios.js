import api from './baseURL'

export const getPublicPosts = async (type, q = null, token = null, page = null) => {
    try {
        const params = {};
        if (page) {
            params.page = page;
        }
        if (type) {
            params.type = type;
        }
        if (q) {
            params.q = q;
        }
        
        if (token) {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await api.get('/poste', {
                params,
                headers
            });
            return response.data;
        } else {
            const response = await api.get('/postespublic', {
                params
            });
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};


export const PosterPost = async (post, token) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        };
        const response = await api.post('/poste', post, {
            headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const UpdatePost = async (post, token) => {
    try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.put('/poste/update', post, {
            headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const SupprimerPost = async (id, token) => {
    try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.delete(`/poste/${id}`, {
            params: { id: id },
            headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};