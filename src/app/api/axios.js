// import axios from "axios";
// import { useSelector } from "react-redux";
// import GetCookie from "../../cookies/JWT/GetCookie";
// import { selectCurrentUser } from "../../features/auth/authSlice";
// import api from './baseURL'
//
// // export const api = axios.create({
// //     baseURL: 'http://127.0.0.1:8000/api'
// // })
//
//
// export const search = async (query,token) => {
//     try {
//         if (token) {
//             const headers = { Authorization: `Bearer ${token}` };
//             const response = await api.get('/search', {
//                 params: {query : query},
//                 headers
//             })
//             return response.data
//             // console.log(response.data);
//         }else{
//             const response = await api.get('/search', {
//                 params: {query : query}
//             })
//             // console.log(response.data);
//             return response.data
//
//         }
//     } catch (error) {
//         console.log(error);
//
//     }
// }
