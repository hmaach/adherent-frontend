import api from './baseURL'

export const getFilieres = async (token) => {
    try {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await api.get('/filiere', {
                headers
            });
            return response.data;

    } catch (error) {
        console.log(error);
    }
};
