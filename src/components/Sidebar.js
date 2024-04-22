// const Sidebar = () => {
//   return <div>사이드바</div>;
// };

// export default Sidebar;
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  background-color: lightgray;
  height: 100%;
  width: 15%;
  top: 0;
  right: 23.8%;
  position: fixed;
  transition: 0.5s ease;

  &.open {
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

  return (
    <SideBarWrap id='sidebar' ref={outside} className={isOpen ? 'open' : ''}>
      <button onClick={toggleSidebar}>닫기</button>
      <ul>
        <Menu>마이페이지</Menu>
        <Menu>로그인</Menu>
      </ul>
    </SideBarWrap>
  );
}

export default Sidebar;
