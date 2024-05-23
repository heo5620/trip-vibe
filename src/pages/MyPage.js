import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './styles/Mypage.module.css';
import { getMemberFromSession } from '../api/memberApi';

const MyPage = () => {
  // const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState({});
  const navigate = useNavigate();
  // //회원 1명 조회
  // useEffect(() => {
  //   getMemberOne(id).then(data => {
  //     setMemberInfo(data);
  //     console.log(data);
  //   });
  // }, [id]);

  const handleReviewPage = e => {
    navigate(`/mypage/review/`);
  };

  // 회원 정보 조회 및 세션 확인
  useEffect(() => {
    getMemberFromSession()
      .then(data => {
        setMemberInfo(data);
        console.log(data);
      })
      .catch(error => {
        navigate('/signin'); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
      });
  }, [navigate]);

  const handlePage = e => {
    e.preventDefault();
    navigate(`/mypage/edit/${memberInfo.id}`);
  };

  // const handlePage = (e) => {

  //   navigate(`/mypage/edit/${id}`);
  // };

  //사용자 프로필 이미지
  const [profileImage, setProfileImage] = useState(null);

  return (
    <form onSubmit={handlePage}>
      <div className={styles.myContainer}>
        <div className={styles.myContent}>
          <h1 className={styles.BodyTopText}>My Page</h1>
          <div className={styles.myPicture}>
            <img
              className={styles.profile}
              src={profileImage || '/resources/images/unnamed.jpg'}
              // profileImage가 null이면 기본이미지가 나옴
              alt='프로필 사진'
            />
          </div>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '24px',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            ✨{memberInfo.memberId}
          </div>

          <table className={styles.infoTable}>
            <tr>
              <td> Email</td>
              <td>{memberInfo.email}</td>
            </tr>
            <tr>
              <td> Gender</td>
              <td>{memberInfo.gender}</td>
            </tr>
            <tr>
              <td> Mbti</td>
              <td>{memberInfo.mbti}</td>
            </tr>
          </table>

          <button className={styles.editButton} onClick={handlePage}>
            내 정보 수정
          </button>
          <button className={styles.reviewButton} onClick={handleReviewPage}>
            내 글 목록
          </button>
        </div>
      </div>
    </form>
  );
};

export default MyPage;
