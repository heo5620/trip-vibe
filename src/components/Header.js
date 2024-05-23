import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Header.module.css';
import Sidebar from './Sidebar';
import { ReactComponent as SideBarButton } from './styles/icon/Group 4.svg';
import { ReactComponent as Logo } from './styles/icon/Group 6.svg';
import { checkLoginStatus } from '../api/memberApi';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, []);

  const goMain = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.contents}>
        <Logo className={styles.logo} onClick={goMain} />
      </div>
      <nav className={styles.navigation}>
        <ul>
          <div>
            <SideBarButton className={styles.logo} onClick={toggleSidebar} />
          </div>
        </ul>
      </nav>
      {isOpen && <Sidebar setIsOpen={setIsOpen} headerHeight={headerHeight} />}
    </header>
  );
};

export default Header;
