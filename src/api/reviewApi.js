import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080/tripvibe';

//리뷰 목록 조회 (main)
export const getReviewList = async () => {
  const response = await axios.get(`${API_SERVER_HOST}/reviewlist`);
  return response.data;
};

//사용자가 쓴 리뷰 목록 조회(mypage)
export const getMyReviewList = async (id) => {
  const response = await axios.get(`${API_SERVER_HOST}/myreviewlist`, {
    params: { id },
  });
  return response.data;
};

//리뷰 상세 조회
export const getReviewOne = async (id) => {
  const response = await axios.get(`${API_SERVER_HOST}/review/detail`, {
    params: { id },
  });
  return response.data;
};

//리뷰 등록
export const saveReview = async (formData) => {
  const response = await axios.post(`${API_SERVER_HOST}/review`, formData);
  return response.data;
};

//리뷰 수정
export const updateReview = async (id, formData) => {
  const response = await axios.put(
    `${API_SERVER_HOST}/review/detail`,
    formData,
    {
      params: { id },
    }
  );
  return response.data;
};

//리뷰 삭제
export const deleteReview = async (id) => {
  const response = await axios.delete(`${API_SERVER_HOST}/review`, {
    params: { id },
  });
  return response.data;
};
