import styles from './styles/Header.module.css';
import { ReactComponent as SideBarButton } from '../assets/icon/Group 4.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div onClick={goMain}>로고</div>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <div>
            <SideBarButton />
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
