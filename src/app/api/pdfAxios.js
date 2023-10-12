import api from './baseURL'

export const downloadPDF = async (pdfPath) => {
    try {
        const response = await api.get('/downloadpdf', {
            params: {
                pdf_path: pdfPath
            },
            responseType: 'blob',
        });
        return response.data;

    } catch (error) {
        console.log(error);
    }
};

export const UpdatePdfLibelle = async (pdf, token) => {
    try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.put(`/pdf/update/${pdf.id}`, {
            libelle: pdf.libelle
        }, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const removePdfFromCategory = async (id, token) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.post(`/pdf/removecategory/${id}`, null, {
        headers: headers
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  };