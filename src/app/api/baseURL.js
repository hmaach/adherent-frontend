import axios from "axios";

const  api = axios.create({
    baseURL: 'https://adherent-app-783f8874404b.herokuapp.com/api'
    // baseURL: 'http://127.0.0.1:8000/api'
})
export default api;