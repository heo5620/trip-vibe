import { ReviewSetStateContext } from '../App';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/SignUp.module.css';
import { ReactComponent as SignLogo } from '../components/styles/icon/Group 8.svg';
import Swal from 'sweetalert2';
import { joinMember } from '../api/memberApi';

const SignUp = () => {
  const setData = useContext(ReviewSetStateContext);

  //입력 받을 id,pw,gender,mbti
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [mbti, setMbti] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  //에러 관리
  const [memberIdError, setmemberIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [mbtiError, setMbtiError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthError, setBirthError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const navigate = useNavigate();

  // 회원 가입 버튼 클릭
  const handleSignUp = (e) => {
    e.preventDefault(); // 기본 동작 중단

    // 입력값의 유효성 검사
    if (
      validateMemberId(memberId) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword) &&
      validateGender(gender) &&
      validateMbti(mbti) &&
      validateEmail(email) &&
      validateBirth(birth) &&
      validatePhone(phone)
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
          const member = {
            memberId: memberId,
            pw: password,
            email: email,
            phone: phone,
            gender: gender,
            birth: birth,
            mbti: mbti,
          };

          joinMember(member).catch((error) => {
            console.log(error);
          });

          // 메인 페이지로 이동
          navigate('/');

          console.log('회원가입 성공');
        }
      });
    }
  };

  //아이디 유효성 검사
  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value);
    const isValid = validateMemberId(e.target.value);
    if (!isValid) {
      setmemberIdError(
        '아이디는 영소문자와 숫자를 포함하여 4~12자로만 입력해주세요.'
      );
    } else {
      setmemberIdError('');
    }
  };

  const validateMemberId = (memberId) => {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,12}$/;
    return regex.test(memberId);
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

  // 이메일 유효성 검사
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const isValid = validateEmail(e.target.value);
    if (!isValid) {
      setEmailError('올바른 이메일 주소를 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleBirthChange = (e) => {
    setBirth(e.target.value);
    validateBirth(e.target.value);
  };

  const validateBirth = (birth) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(birth)) {
      setBirthError('생일은 YYYY-MM-DD 형식으로 입력하세요.');
      return false;
    }
    setBirthError('');
    return true;
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    validatePhone(e.target.value);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{3}-\d{4}-\d{4}$/;
    if (!regex.test(phone)) {
      setPhoneError('전화번호는 010-xxxx-xxxx 형식으로 입력하세요.');
      return false;
    }
    setPhoneError('');
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
    const mbtiTypes = [
      'ENFP',
      'ENFJ',
      'ENTP',
      'ENTJ',
      'ESFP',
      'ESFJ',
      'ESTP',
      'ESTJ',
      'INFP',
      'INFJ',
      'INTP',
      'INTJ',
      'ISFP',
      'ISFJ',
      'ISTP',
      'ISTJ',
    ];

    if (mbti === '') {
      setMbtiError('MBTI를 입력해주세요.');
      return false;
    }

    if (mbti.length !== 4 || !mbtiTypes.includes(mbti.toUpperCase())) {
      setMbtiError('유효한 MBTI를 입력해주세요.');
      return false;
    }

    setMbtiError('');
    return true;
  };

  return (
    <div className={styles.container}>
      <SignLogo className={styles.signlogo} />
      <div className={styles.content}>
        <h1 className={styles.heading}>Let's Start!</h1>
        <h1 className={styles.BodyTopText}>Let's Start!</h1>
        <form>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={memberId}
            name="id"
            onChange={handleMemberIdChange}
            className={styles.inputField}
            required
          />
          <div>{memberIdError}</div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            name="pw"
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
            type="email"
            placeholder="이메일을 입력하세요"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.inputField}
            required
          />
          <div>{emailError}</div>
          <input
            type="text"
            placeholder="전화번호를 입력하세요 (010-xxxx-xxxx)"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            className={styles.inputField}
            required
          />
          <div>{phoneError}</div>
          <input
            type="text"
            placeholder="생년월일을 입력하세요 (YYYY-MM-DD)"
            name="birth"
            value={birth}
            onChange={handleBirthChange}
            className={styles.inputField}
            required
          />
          <div>{birthError}</div>
          <div className={styles.mgContainer}>
            <div className={styles.mbtiContainer}>
              <input
                type="text"
                placeholder="MBTI를 입력하세요"
                name="mbti"
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
                required
                className={styles.mbtiContainer}
              />
            </div>
            <div>{mbtiError}</div>

            <div className={styles.genderContainer}>
              <button
                className={`${styles.genderButton}
              ${styles.maleButton} 
              ${gender === 'male' ? styles.selected : ''}`}
                onClick={() => setGender(gender === 'male' ? '' : 'male')}
                type="button"
              >
                남성
              </button>
              <button
                className={`${styles.genderButton}
              ${styles.femaleButton} 
              ${gender === 'female' ? styles.selected : ''}`}
                onClick={() => setGender(gender === 'female' ? '' : 'female')}
                type="button"
              >
                여성
              </button>
            </div>
          </div>{' '}
          {/* mgContainer 끝 */}
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
