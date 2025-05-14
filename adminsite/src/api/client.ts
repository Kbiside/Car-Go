import axios from 'axios';

const API_BASE = '/api/clients';

export default {
  getAllClients: async () => {
    const response = await axios.get(API_BASE);
    return response.data;
  },
  
  getClient: async (id: number) => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  },
  
  // Добавьте другие методы по мере необходимости
};