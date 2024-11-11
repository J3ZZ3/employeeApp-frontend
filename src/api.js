import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/employees', 
});

export const addEmployee = async (data) => {
  try {
    return await api.post('/', data);
  } catch (error) {
    console.error('Error in addEmployee API call:', error.response || error.message);
    throw error;
  }
};

export const updateEmployee = async (id, data) => {
    try {
      return await api.put(`/${id}`, data); 
    } catch (error) {
      console.error('Error in updateEmployee API call:', error.response || error.message);
      throw error;
    }
  };
  

export const deleteEmployee = async (id) => {
  try {
    return await api.delete(`/${id}`);
  } catch (error) {
    console.error('Error in deleteEmployee API call:', error.response || error.message);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const response = await api.get('/');
    return response;
  } catch (error) {
    console.error('Error in getEmployees API call:', error.response || error.message);
    throw error;
  }
};

