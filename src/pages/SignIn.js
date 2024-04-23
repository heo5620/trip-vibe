import React, { useState, useContext } from 'react';
import { ReviewStateContext } from '../App';
import MockData from '../components/MockData';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import '../SignIn.css';

const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const data = useContext(ReviewStateContext);
  const navigate = useNavigate(); // useNavigate 초기화

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('아이디:', userId);
    console.log('비밀번호:', password);

    if (validateUserId() && validatePassword()) {
      const user = MockData.find((user) => user.username === userId);
      if (user && user.pw === password) {
        console.log('로그인 성공'); // 로그인 성공 메시지
        navigate('Main'); // 로그인 성공 시 Main 페이지로 이동
      } else {
        console.log('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  };

  const validateUserId = () => {
    const regex = /^[a-z0-9]{6,18}$/;
    if (!regex.test(userId)) {
      alert('영소문자와 숫자를 포함하여 6~18자로만 입력해주세요');
      //return false;
    } else if (!isUsernameAvailable(userId)) {
      alert('존재하지 않는 아이디 입니다.');
      //return false;
    }
    return true;
  };

  const validatePassword = () => {
    const regex = /^[a-zA-Z0-9!@_]{8,20}$/;
    if (!regex.test(password)) {
      alert(
        '비밀번호는 영문, 숫자, 특수문자(!,@,_)를 포함하여 8~20자로만 입력해주세요'
      );
      return false;
    } else if (!isUserpwAvailable(password)) {
      alert('비밀번호가 다릅니다.');
      return false;
    }
    return true;
  };

  const isUsernameAvailable = (username) => {
    return MockData.some((user) => user.username === username);
  };

  const isUserpwAvailable = (password) => {
    return MockData.some((user) => user.pw === password);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 style={{ textAlign: 'center' }}>로고</h1>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onBlur={validateUserId} // 아이디 입력 후 유효성 검사
            className="input-field"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword} // 비밀번호 입력 후 유효성 검사
            className="input-field"
          />
          <button type="submit" style={{ display: 'block', margin: '0 auto' }}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
