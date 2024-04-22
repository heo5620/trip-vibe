// import styles from './styles/Header.module.css';
// import { ReactComponent as SideBarButton } from '../assets/icon/Group 4.svg';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();

//   const goMain = () => {
//     navigate('/');
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.contents}>
//         <div onClick={goMain}>로고</div>
//       </div>
//       <nav className={styles.navigation}>
//         <ul>
//           <div>
//             <SideBarButton />
//           </div>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import styles from './styles/Header.module.css';
import { ReactComponent as SideBarButton } from '../assets/icon/Group 4.svg';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const goMain = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
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
      {isOpen && <Sidebar setIsOpen={setIsOpen} />}
    </header>
  );
};

export default Header;
