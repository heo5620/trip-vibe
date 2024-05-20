import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080';

export const getMemberOne = async (id) => {
  const response = await axios.get(`${API_SERVER_HOST}/tripvibe/mypage/${id}`);
  return response.data;
};
