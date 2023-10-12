import api from "./baseURL";

export const search = async (query,token=null) => {
    try {
        if (token) {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await api.get('/search', {
                params: {query : query},
                headers
            })
            return response.data
            // console.log(response.data);
        }else{
            const response = await api.get('/search', {
                params: {query : query}
            })
            // console.log(response.data);
            return response.data

        }
    } catch (error) {
        console.log(error);

    }
}