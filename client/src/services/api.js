import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchServices = () => API.get('/services');
export const fetchServiceById = (id) => API.get(`/services/${id}`);
export const createService = (newService) => API.post('/services', newService);
