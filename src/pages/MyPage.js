import { useState } from 'react';
import MockData from '../components/MockData';
import styles from './styles/Mypage.module.css';

const MyPage = () => {

  const [info] = useState(MockData);

  return (
    <div className={styles.container}>
      <div className={styles.picture}>
        <img className={styles.profile} src={require('./../assets/image/unnamed.jpg')} alt="프로필 사진" />
        {/* unnamed.jpg는 임시 샘플파일임 */}
      </div>
      <div className={styles.info}>
        {info[1].username}
      </div>
      <div className={styles.info}>
        {info[1].mbti}
      </div>
      <div className={styles.info}>
      {info[1].gender}
      </div>
    </div>
  );
};

export default MyPage;