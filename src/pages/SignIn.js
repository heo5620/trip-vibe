import React, { useState, useContext } from 'react';
import { ReviewStateContext } from '../App';
import { useNavigate } from 'react-router-dom';
import '../SignIn.css';

const SignIn = () => {
  const [userId, setUserId] = useState(''); //userId
  const [password, setPassword] = useState(''); //userPw

  //에러 상태 관리
  //const [userIdError, setUserIdError] = useState('');
  //const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const data = useContext(ReviewStateContext);

  const navigate = useNavigate(); // useNavigate 초기화

  //로그인 버튼 클릭 시 호출
  const handleSignIn = (e) => {
    e.preventDefault(); //기본 동작 x

    // 입력받은 값이 유효성 검사에 맞지 않을 때,
    if (!validateUserId() || !validatePassword()) {
      setLoginError('아이디와 비밀번호를 올바르게 입력하세요.');
      return;
    }

    // 유저 정보 확인
    const user = data.user.find((user) => user.username === userId);

    //입력 받은 값이 data 안에서 없거나, 일치 하지 않을 때
    if (!user || user.pw !== password) {
      setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 로그인 성공
    console.log('로그인 성공');
    navigate('/');
  };

  //아이디 유효성 검사
  const validateUserId = () => {
    const regex = /^[a-z0-9]{6,18}$/;
    return regex.test(userId); //t/f
  };

  //비밀번호 유효성 검사
  const validatePassword = () => {
    const regex = /^[a-zA-Z0-9!@_]{8,20}$/;
    return regex.test(password); //t/f
  };

  //회원가입 페이지로 이동
  const handleSignUp = () => {
    navigate('/SignUp');
  };

  return (
    <div className="container">
      <div className="content">
        <h1 style={{ textAlign: 'center' }}>로그인</h1>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input-field"
            required
          />
          {loginError && <div className="error-message">{loginError}</div>}
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="signin-button">
              로그인
            </button>
            <button
              type="submit"
              className="signup-button"
              onClick={handleSignUp}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
