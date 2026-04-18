import axios from "axios";
import url from "./url";

const  api = axios.create({
    baseURL: url + '/api'
    // baseURL: 'http://127.0.0.1:8000/api'
})
export default api;