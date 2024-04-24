import React, { useState } from 'react';
import { useContext } from 'react';
import { ReviewStateContext, ReviewSetStateContext } from '../App';
import styles from './styles/SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {
  const setData = useContext(ReviewSetStateContext);
  const data = useContext(ReviewStateContext);

  //입력 받을 id,pw,gender,mbti
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [mbti, setMbti] = useState('');

  //에러 관리
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [mbtiError, setMbtiError] = useState('');
  
  const navigate = useNavigate();

  // 회원 가입 버튼 클릭
  const handleSignUp = (e) => {
    e.preventDefault(); // 기본 동작 중단
  
    // 입력값의 유효성 검사
    if (
      validateUserId(userId) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword) &&
      validateGender(gender) &&
      validateMbti(mbti)
    ) {
      // 회원가입 성공 팝업
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공!',
        text: '메인 페이지로 이동합니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then((res) => {
        // 확인 버튼을 클릭했을 때 조건이 맞으면 메인 페이지로 이동
        if (res.isConfirmed) {
          // 기존 정보에 새 데이터를 추가
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
          /* console.log('data.user');
          console.log('아이디 유효성 검사 결과:', validateUserId(userId));
          console.log('비밀번호 유효성 검사 결과:', validatePassword(password));
          console.log('비밀번호 확인 유효성 검사 결과:', validateConfirmPassword(confirmPassword));
          console.log('성별 유효성 검사 결과:', validateGender());
          console.log('MBTI 유효성 검사 결과:', validateMbti()); */
          
          // 메인 페이지로 이동
          navigate('/');
          
          console.log('회원가입 성공');
        }
      });
    }
  };


  //아이디 유효성 검사
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    const isValid = validateUserId(e.target.value);
    if (!isValid) {
      setUserIdError(
        '아이디는 영소문자와 숫자를 포함하여 4~12자로만 입력해주세요.'
      );
    } else {
      setUserIdError('');
    }
  };

  const validateUserId = (userId) => {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,12}$/;
    return regex.test(userId);
  };

  //비밀번호 유효성 검사
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const isValid = validatePassword(e.target.value);
    if (!isValid) {
      setPasswordError(
        '비밀번호는 영문 소문자, 숫자, 특수문자(@, !, _)를 포함하여 8~20자로만 입력해주세요.'
      );
    } else {
      setPasswordError('');
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@!_])[a-z\d@!_]{8,20}$/;
    return regex.test(password);
  };

  //비밀번호 확인 검사
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(e.target.value);
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  //성별 유효성 검사
  const validateGender = (gender) => {
    if (gender === '') {
      setGenderError('성별을 선택해주세요.');
      return false;
    }
    setGenderError('');
    return true;
  };

  //mbti 유효성 검사
  const validateMbti = (mbti) => {
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
        <h1 className={styles.heading}>Sign up</h1>
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
            onChange={handlePasswordChange}
            className={styles.inputField}
            required
            
          />
          <div>{passwordError}</div>
          <input
            type="password"
            placeholder="비밀번호를 확인하세요"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
            <label className={styles.radioMaleLabel}>
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
            <label className={styles.radioFemalLabel}>
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
