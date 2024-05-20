import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080';

export const saveReview = async (formData) => {
  const response = await axios.post(
    `${API_SERVER_HOST}/tripvibe/review`,
    formData
  );
  return response.data;
};

export const getReviewList = async () => {
  const response = await axios.get(`${API_SERVER_HOST}/tripvibe/reviewlist`);
  return response.data;
};

export const getReviewOne = async (id) => {
  const response = await axios.get(
    `${API_SERVER_HOST}/tripvibe/review/detail/${id}`
  );
  return response.data;
};
