import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080';

//마이페이지
//회원 1명 조회
export const getMemberOne = async (id) => {
  const response = await axios.get(
    `${API_SERVER_HOST}/tripvibe/mypage/${id}`);
  return response.data; //member data
};

//회원정보수정
export const editMember = async (id, formData) => {
  const response = await axios.put(
    `${API_SERVER_HOST}/tripvibe/mypage/edit/${id}`, 
    formData,
    {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    }
  );
  return response.data;
};


//회원가입
export const joinMember = async (member) => {
  const response = await axios.post(
    `${API_SERVER_HOST}/tripvibe/signup`,
    member
  );
  return response.data; //없음
};

export const signIn = async (member) => {
  const response = await axios.post(
    `${API_SERVER_HOST}/tripvibe/login`,
    member,
    {
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
    }
  );
  return response.data; //로그인한 사용자의 고유 번호 받아옴
};

export const checkLoginStatus = async () => {
  const response = await axios.get(`${API_SERVER_HOST}/tripvibe/checksession`);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_SERVER_HOST}/tripvibe/logout`);
  return response.data;
};
