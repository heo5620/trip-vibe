import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SignUp.css'; 

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateUserId() && validatePassword() && validateConfirmPassword() && validateGender()) {
      console.log('회원가입 성공!');
      navigate('/');
    }
  };

  const validateUserId = () => {
    const regex = /^[a-z0-9]{4,12}$/;
    if (!regex.test(userId)) {
      setUserIdError('아이디는 영소문자와 숫자를 포함하여 4~12자로만 입력해주세요.');
      return false;
    }
    setUserIdError('');
    return true;
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@!_])[A-Za-z\d@!_]{8,20}$/;
    if (!regex.test(password)) {
      setPasswordError('비밀번호는 영문 소문자, 숫자, 특수문자(@, !, _)를 포함하여 8~20자로만 입력해주세요.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validateGender = () => {
    if (gender === '') {
      setGenderError('성별을 선택해주세요.');
      return false;
    }
    setGenderError('');
    return true;
  };

  return (
    <div className="container">
      <div className="content">
        <h1 style={{ textAlign: 'center' }}>회원가입</h1>
        <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                validateUserId(); // 입력이 변경될 때마다 유효성 검사
              }}
              className="input-field"
              required
            />
            {userIdError && <div className="error-message">{userIdError}</div>}
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => {
                {
                  setPassword(e.target.value);
                  validatePassword();
                }
              }}    
              className="input-field"
              required
            />
           {passwordError && <div className="error-message">{passwordError}</div>}
           <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(); // 비밀번호 확인 입력이 변경될 때마다 실행
                }}
                className="input-field"
                required
              />
          {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
          <div className="gender-container">
            <label>
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              여성
            </label>
          </div>
          {genderError && <div className="error-message">{genderError}</div>}
          <button type="submit" style={{ display: 'block', margin: '10px auto 0' }}>가입하기</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
