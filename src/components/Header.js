import styles from './styles/Header.module.css';
import { ReactComponent as SideBarButton } from '../assets/icon/Group 4.svg';
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div>로고</div>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <div>
            <button src={SideBarButton} alt='SideBar Button' />
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
