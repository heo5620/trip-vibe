import React, { useRef, useEffect, useState } from 'react';
import { ReactComponent as ExitButton } from './styles/icon/Group 3.svg';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Sidebar.module.css';

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = e => {
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
    navigate('/SignIn');
    setIsOpen(false);
  };

  return (
    <div className={styles.SideBarContainer}>
      <div id='sidebar' ref={outside} className={`${styles.SideBarWrap} ${isOpen ? styles.open : ''}`}>
        <ExitButton className={`${styles.button}`} onClick={toggleSidebar} />
        <ul>
          <div className={styles.Menu} onClick={goMypage}>
            마이페이지
          </div>
          <div className={styles.Menu} onClick={goSignin}>
            로그인
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
