import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/Header.module.css';
import { ReactComponent as SideBarButton } from './styles/icon/Group 4.svg';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

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
        <div onClick={goMain}>로고</div>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <div>
            <SideBarButton onClick={toggleSidebar} />
          </div>
        </ul>
      </nav>
      {isOpen && <Sidebar setIsOpen={setIsOpen} headerHeight={headerHeight} />}
    </header>
  );
};

export default Header;
