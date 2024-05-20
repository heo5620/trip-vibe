import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080';

export const saveReview = async (formData) => {
  const response = axios.post(`${API_SERVER_HOST}/tripvibe/review`, formData);
  return response.data;
};
