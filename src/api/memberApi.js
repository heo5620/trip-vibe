import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080';

export const getMemberOne = async (id) => {
  const response = await axios.get(`${API_SERVER_HOST}/tripvibe/mypage/${id}`);
  return response.data; //member data
};

export const joinMember = async (member) => {
  const response = await axios.post(
    `${API_SERVER_HOST}/tripvibe/signup`,
    member
  );
  return response.data; //없음
};

export const signIn = async (memberId, pw) => {
  const response = await axios.post(`${API_SERVER_HOST}/tripvibe/signin`, {
    memberId,
    pw,
  });
  return response.data;
};
