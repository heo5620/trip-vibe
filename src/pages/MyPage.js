import { useState, useEffect } from 'react';
import styles from './styles/Mypage.module.css';
import { getMemberOne } from '../api/memberApi';
import { useParams } from 'react-router-dom';

const MyPage = () => {
  const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState([]);

  //회원 1명 조회
  useEffect(() => {
    getMemberOne(id).then((data) => {
      setMemberInfo(data);
      console.log(data);
    });
  }, [id]);

  //사용자 프로필 이미지
  const [profileImage, setProfileImage] = useState(null);

  return (
    <>
      <div className={styles.container}>
      <h1 className={styles.headerText}>My Page</h1>
        <div className={styles.picture}>
          <img
            className={styles.profile}
            src={profileImage || '/resources/images/unnamed.jpg'} 
            // profileImage가 null이면 기본이미지가 나옴
            alt="프로필 사진"
          />
        </div>
        <div style={{
          fontWeight: 'bold',
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '12px'
        }}>
          ✨{memberInfo.memberId}
        </div>

        <div className={styles.infoText}>
          {memberInfo.email} <br></br>
          {memberInfo.gender} <br></br>
          {memberInfo.mbti}
          </div>
        
        
        
        <button className={styles.editButton} onClick={handlePage}>
          내 정보 수정
        </button>
        <button className={styles.editButton}>내 글 목록</button>
        

        

        
      </div>
    </>
  );
};

export default MyPage;
