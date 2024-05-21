import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080';

//리뷰 등록
export const saveReview = async (formData) => {
  const response = await axios.post(
    `${API_SERVER_HOST}/tripvibe/review`,
    formData
  );
  return response.data;
};

//리뷰 목록 조회
export const getReviewList = async () => {
  const response = await axios.get(`${API_SERVER_HOST}/tripvibe/reviewlist`);
  return response.data;
};

//리뷰 1개 조회
export const getReviewOne = async (id) => {
  const response = await axios.get(
    `${API_SERVER_HOST}/tripvibe/review/detail/${id}`
  );
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await axios.delete(
    `${API_SERVER_HOST}/tripvibe/review/${id}`,
    id
  );
  return response.data;
};
