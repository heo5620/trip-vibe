import axios from 'axios';
import Header from '../components/Header';

const API_SERVER_HOST = 'http://localhost:8080';

//리뷰 등록
export const saveReview = async formData => {
  const response = await axios.post(`${API_SERVER_HOST}/tripvibe/review`, formData);
  return response.data;
};

//리뷰 목록 조회
export const getReviewList = async () => {
  const response = await axios.get(`${API_SERVER_HOST}/tripvibe/reviewlist`);
  return response.data;
};

//내가 쓴 리뷰 목록 조회
export const getMyReviewList = async id => {
  const response = await axios.get(`${API_SERVER_HOST}/tripvibe/myreviewlist/${id}`);
  return response.data;
};

//리뷰 1개 조회
export const getReviewOne = async id => {
  const response = await axios.get(`${API_SERVER_HOST}/tripvibe/review/detail/${id}`);
  return response.data;
};

//리뷰 수정
export const updateReview = async (id, formData) => {
  const response = await axios.put(`${API_SERVER_HOST}/tripvibe/review/detail/${id}`, formData);
  return response.data;
};

//리뷰 삭제
export const deleteReview = async id => {
  const response = await axios.delete(`${API_SERVER_HOST}/tripvibe/review/${id}`, id);
  return response.data;
};

//  {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// }
