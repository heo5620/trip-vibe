import React, { useRef, useEffect, useState } from 'react';
import { ReactComponent as ExitButton } from './styles/icon/Group 3.svg';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Sidebar.module.css';
import { checkLoginStatus, logout } from '../api/memberApi';

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    checkLoginStatus().then((data) => {
      if (data.status == 'success') {
        //로그인 했을 때
        setIsLoggedIn(true);
      }
    });
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  //로그아웃을 눌렀을 때
  const handleLogout = () => {
    logout().then(setIsLoggedIn(false));
    setIsOpen(false);
    navigate('/');
  };

  const handleOutsideClick = (e) => {
    if (!outside.current.contains(e.target)) {
      toggleSidebar();
    }
  };

  const toggleSidebar = () => {
    setIsOpen(isOpen);
  };

  const navigate = useNavigate();
  const goMypage = () => {
    navigate('/mypage');
    setIsOpen(false);
  };
  const goSignin = () => {
    navigate('/signin');
    setIsOpen(false);
  };

  return (
    <div className={styles.SideBarContainer}>
      <div
        id="sidebar"
        ref={outside}
        className={`${styles.SideBarWrap} ${isOpen ? styles.open : ''}`}
      >
        <ExitButton className={`${styles.button}`} onClick={toggleSidebar} />
        <ul>
          {isLoggedIn ? ( //로그인 상태이면 로그아웃, 마이페이지 보여주기
            <>
              <div className={styles.Menu} onClick={handleLogout}>
                로그아웃
              </div>
              <div className={styles.Menu} onClick={goMypage}>
                마이페이지
              </div>
            </>
          ) : (
            //로그아웃 상태이면 로그인 보여주기
            <div className={styles.Menu} onClick={goSignin}>
              로그인
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
