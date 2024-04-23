import React, { useState, useContext } from 'react';
import { ReviewStateContext } from '../App';
import MockData from '../components/MockData';
import { useNavigate } from 'react-router-dom'; 
import '../SignIn.css';

const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const data = useContext(ReviewStateContext);
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate(); // useNavigate 초기화

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('아이디:', userId);
    console.log('비밀번호:', password);

    if (validateUserId() && validatePassword()) {
      const user = MockData.find((user) => user.username === userId);
      if (user && user.pw === password) {
        console.log('로그인 성공'); // 로그인 성공 메시지
        navigate('/');  // 로그인 성공 시 Main 페이지로 이동
      } 
    }
  };

  const validateUserId = () => {
    const regex = /^[a-z0-9]{6,18}$/;
    if (!regex.test(userId)) {
      setUserIdError('영소문자와 숫자를 포함하여 4~18자로만 입력해주세요');
      return false;
    } else if (!isUsernameAvailable(userId)) {
      setUserIdError('존재하지 않는 아이디입니다.');
      return false;
    } else {
      setUserIdError('');
    }
    return true;
  };

  const validatePassword = () => {
    const regex = /^[a-zA-Z0-9!@_]{8,20}$/;
    if (!regex.test(password)) {
      setPasswordError('비밀번호는 영문, 숫자, 특수문자(!,@,_)를 포함하여 8~20자로만 입력해주세요');
      return false;
    } else if (!isUserpwAvailable(password)) {
      setPasswordError('비밀번호가 다릅니다.');
      return false;
    } else {
      setPasswordError('');
    }
    return true;
  };

  const isUsernameAvailable = (username) => {
    return MockData.some((user) => user.username === username);
  };

  const isUserpwAvailable = (password) => {
    return MockData.some((user) => user.pw === password);
  };

  //회원가입 페이지로 이동
  const handleSignUp= () =>{
    navigate('/SignUp');
  }

  return (
    <div className="container">
      <div className="content">
        <h1 style={{ textAlign: 'center'}}>로그인</h1>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="input-field"
            required
          />
          {userIdError && <div className="error-message">{userIdError}</div>}
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
         {passwordError && <div className="error-message">{passwordError}</div>}
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className='signin-button'>로그인</button> 
            <button type="submit" className='signup-button' onClick={handleSignUp}>회원가입</button> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
