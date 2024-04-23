import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SideBarContainer = styled.div`
  position: fixed;
  padding: 0px auto;
  max-width: 980px;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;

  &.open {
    z-index: 10;
  }
`;

const SideBarWrap = styled.div`
  z-index: 10;
  padding: 12px;
  border-radius: 15px 0 0 15px;
  background-color: gray;
  height: 100%;
  width: 55%;
  right: -15%;
  top: 0;
  position: absolute;
  transition: 0.5s ease;

  &.open {
    position: absolute;
    right: 0;
    transition: 0.5s ease;
  }
`;

const Menu = styled.li`
  margin: 30px 8px;
`;

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
  };
  const goSignin = () => {
    navigate('/SignIn');
  };

  return (
    <SideBarContainer>
      <SideBarWrap id='sidebar' ref={outside} className={isOpen ? 'open' : ''}>
        <button onClick={toggleSidebar}>닫기</button>
        <ul>
          <Menu onClick={goMypage}>마이페이지</Menu>
          <Menu onClick={goSignin}>로그인</Menu>
        </ul>
      </SideBarWrap>
    </SideBarContainer>
  );
}

export default Sidebar;
