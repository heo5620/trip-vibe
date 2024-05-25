import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080/tripvibe';

//회원가입
export const joinMember = async (member) => {
  const response = await axios.post(`${API_SERVER_HOST}/signup`, member);
  return response.data;
};

//로그인
export const signIn = async (member) => {
  const response = await axios.post(`${API_SERVER_HOST}/signin`, member, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data; //로그인한 사용자의 고유 id
};

//로그아웃
export const logout = async () => {
  const response = await axios.post(`${API_SERVER_HOST}/signout`);
  return response.data;
};

//로그인 상태 확인
export const checkLoginStatus = async () => {
  const response = await axios.get(`${API_SERVER_HOST}/checksession`);
  return response.data;
};

///////////////마이페이지///////////////////

// 세션 기반 회원 정보 조회
export const getMemberFromSession = async () => {
  const response = await axios.get(`${API_SERVER_HOST}/mypage`, {
    withCredentials: true,
  });
  return response.data;
};

//회원 정보 수정
export const editMember = async (id, formData) => {
  const response = await axios.put(`${API_SERVER_HOST}/mypage`, formData, {
    params: { id },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 회원 탈퇴
export const deleteMember = async (id) => {
  const response = await axios.delete(`${API_SERVER_HOST}/mypage`, {
    params: { id },
  });
  return response.data;
};
