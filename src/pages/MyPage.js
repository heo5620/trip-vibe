import { useRef, useState } from 'react';
import MockData from '../components/MockData';
import styles from './styles/Mypage.module.css';

const MyPage = () => {
  const [info] = useState(MockData);

  return (
    <div className={styles.container}>
      <div className={styles.picture}>
<<<<<<< HEAD
        <img
          className={styles.profile}
          src="/resources/images/unnamed.jpg"
          alt="프로필 사진"
        />
=======
      <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef} // img를 클릭하면 대신해서 input이 클릭됨
          onChange={changeImage}
          accept="image/*"
        />
        <img 
        className={styles.profile} 
        src={profileImage || require('./../assets/image/unnamed.jpg')} // profileImage가 null이면 기본이미지가 나옴
        alt="프로필 사진" 
        onClick={() => fileInputRef.current.click()}/>
>>>>>>> a0ee01b257dbf5b26ff20ad7aa4229bff7d48e3f
        {/* unnamed.jpg는 임시 샘플파일임 */}
      </div>
      <div className={styles.info}>{info[1].username}</div>
      <div className={styles.info}>
        {editingMbti ? (
          <>
            {/* 수정중일 때 */}
            <input
              type="text"
              value={newMbti}
              onChange={(e) => setNewMbti(e.target.value)}
            />
            <button onClick={confirmEdit}>확인</button>
            <button onClick={cancelEdit}>취소</button>
          </>
        ) : (
          <>
            {/* 수정중이 아닐 때(기본상태) */}
            {info[1].mbti.toUpperCase()}
            <button onClick={idEditingNow}>수정</button>
          </>
        )}
      </div>
      <div className={styles.info}>
        {info[1].gender === 'male' ? '남자' : '여자'}
      </div>
    </div>
  );
};

export default MyPage;
