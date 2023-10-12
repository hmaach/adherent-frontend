// import api from './baseURL'

// export const downloadCV = async (id) => {
//     try {
//         const response = await api.get(`/gcv${id}`, {
//             responseType: 'blob',
//         });
//         return response.data;

//     } catch (error) {
//         console.log(error);
//     }
// };
import api from './baseURL';

/**
 * @param {string} id 
 * @returns {Promise<Blob>} 
 * @throws {Error} 
 */

export const downloadCV = async (id) => {
  try {
    const response = await api.get(`/gcv/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading CV:', error);
    throw new Error('Failed to download CV. Please try again.');
  }
};
