import React, { useState, useContext } from 'react';
import { ReviewStateContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SignLogo } from '../components/styles/icon/Group 8.svg';
import styles from './styles/SignIn.module.css';
import Swal from 'sweetalert2';

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
  const handleSignIn = e => {
    e.preventDefault(); //기본 동작 x

    // 입력받은 값이 유효성 검사에 맞지 않을 때,
    if (!validateUserId() || !validatePassword()) {
      setLoginError('아이디와 비밀번호를 올바르게 입력하세요.');
      return;
    }

    // 유저 정보 확인
    const user = data.user.find(user => user.username === userId);

    //입력 받은 값이 data 안에서 없거나, 일치 하지 않을 때
    if (!user || user.pw !== password) {
      setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 로그인 성공
    /* alert('로그인 성공! 메인 페이지로 이동합니다'); */
    Swal.fire({
      icon: 'success',
      title: '로그인 성공!',
      text: `메인 페이지로 이동합니다`,
      showCancelButton: false,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(res => {
      /* 확인 버튼 클릭 시, 메인 페이지로 이동 */
      if (res.isConfirmed) {
        navigate('/');
      }
      console.log('로그인 성공');
    });
    /* navigate('/'); */
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
    <div className={styles.container}>
      <SignLogo className={styles.signlogo} />
      <div className={styles.content}>
        <h1 className={styles.heading}>Welcome!</h1>
        <form onSubmit={handleSignIn}>
          <input
            type='text'
            placeholder='아이디를 입력하세요'
            value={userId}
            onChange={e => setUserId(e.target.value)}
            className={styles.inputIdField}
            required
          />
          <input
            type='password'
            placeholder='비밀번호를 입력하세요'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            className={styles.inputPwField}
            required
          />
          {loginError && <div className={styles.errorMessage}>{loginError}</div>}
          <div className={styles.buttonContainer}>
            <button type='submit' className={styles.signinButton}>
              로그인
            </button>
            <div type='submit' className={styles.signupButton} onClick={handleSignUp}>
              회원가입
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
