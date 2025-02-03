import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/employees', 
});

const API_BASE_URL = 'http://localhost:5000/api/employees';


export const addEmployee = async (data) => {
  try {
    const response = await api.post('/', data);
    return response.data;
  } catch (error) {
    console.error('Error in addEmployee API call:', error.response || error.message);
    throw error;
  }
};

export const updateEmployee = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error in updateEmployee API call:', error.response || error.message);
    throw error;
  }
};
  

export const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteEmployee API call:', error.response || error.message);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const response = await api.get('/');
    return { data: response.data };
  } catch (error) {
    console.error('Error in getEmployees API call:', error);
    throw error;
  }
};

