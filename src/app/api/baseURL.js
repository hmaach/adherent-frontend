import axios from "axios";

const  api = axios.create({
    baseURL: 'https://adherent-app-783f8874404b.herokuapp.com/api'
})
export default api;