import React, { useState } from 'react';
import { useContext } from 'react';
import { ReviewStateContext, ReviewSetStateContext } from '../App';
import styles from './styles/SignUp.module.css';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const setData = useContext(ReviewSetStateContext);
  const data = useContext(ReviewStateContext);

  //입력 받을 id,pw,gender,mbti
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [mbti, setMbti] = useState('');

  //에러 관리
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [mbtiError, setMbtiError] = useState('');

  const navigate = useNavigate();

  //회원 가입 버튼 클릭
  const handleSignUp = (e) => {
    // e.preventDefault();
    if (
      //유효성 검사가 모두 올바른지 확인
      validateUserId() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validateGender() &&
      validateMbti()
    ) {
      console.log('회원가입 성공!');
      console.log(userId, password, gender, mbti);
      //기존 정보에 새 정보 추가
      setData((data) => ({
        ...data,
        user: [
          ...data.user,
          {
            id: data.user.length + 1,
            username: userId,
            pw: password,
            gender: gender,
            mbti: mbti,
          },
        ],
      }));
      console.log(data.user);
      navigate('/');
    }
  };

  //아이디 유효성 검사
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    const isValid = validateUserId(e.target.value);
    if (!isValid) {
      setUserIdError('아이디는 영소문자와 숫자를 포함하여 4~12자로만 입력해주세요.');
    } else {
      setUserIdError('');
    }
  };
  
  const validateUserId = (userId) => {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,12}$/;
    return regex.test(userId);
  }; 


  //비밀번호 유효성 검사
  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@!_])[A-Za-z\d@!_]{8,20}$/;
    if (!regex.test(password)) {
      setPasswordError(
        '비밀번호는 영문 소문자, 숫자, 특수문자(@, !, _)를 포함하여 8~20자로만 입력해주세요.'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  //비밀번호가 일치하는지 확인
  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  //성별 유효성 검사
  const validateGender = () => {
    if (gender === '') {
      setGenderError('성별을 선택해주세요.');
      return false;
    }
    setGenderError('');
    return true;
  };

  //mbti 유효성 검사
  const validateMbti = () => {
    if (mbti === '') {
      setMbtiError('MBTI를 입력해주세요.');
      return false;
    }
    setMbtiError('');
    return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>회원가입</h1>
        <form>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={handleUserIdChange}
            className={styles.inputField}
            required
          />
          <div>{userIdError}</div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword();
            }}
            className={styles.inputField}
            required
          />
          <div>{passwordError}</div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword();
            }}
            className={styles.inputField}
            required
          />
          <div>{confirmPasswordError}</div>
          <input
            type="text"
            placeholder="MBTI를 입력하세요"
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            className={styles.inputField}
            required
          />
          <div>{mbtiError}</div>
          <div className={styles.genderContainer}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                required
                className={styles.radioInput}
              />
              남성
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                required
                className={styles.radioInput}
              />
              여성
            </label>
          </div>
          <div>{genderError}</div>

          <button
            type="submit"
            className={styles.signupButton}
            onClick={handleSignUp}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
