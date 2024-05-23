import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getMemberFromSession } from '../api/memberApi';
import { deleteMember } from '../api/memberApi';
import styles from './styles/Mypage.module.css';
import Swal from 'sweetalert2';

const MyPage = () => {
  // const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState({});
  const navigate = useNavigate();

  // 회원 정보 조회 및 세션 확인
  useEffect(() => {
    getMemberFromSession()
      .then((data) => {
        setMemberInfo(data);
        console.log(data);
      })
      .catch((error) => {
        navigate('/signin'); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
      });
  }, [navigate]);

  //내 정보 수정 페이지로 이동
  const goToEditMyPage = () => {
    navigate(`/mypage/edit/${memberInfo.id}`);
  };

  //내 글 목록 보러가기 페이지로 이동
  const goToMyReviewList = () => {
    navigate(`/myreviewlist/${memberInfo.id}`);
  };

  const handleDeleteMember = async () => {
    // Swal.fire를 사용하여 사용자에게 확인을 요청하는 메시지를 표시
    Swal.fire({
      icon: 'question',
      title: '회원 탈퇴',
      text: '정말로 회원 탈퇴를 하시겠습니까?🥲',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 사용자가 확인을 클릭한 경우 회원 탈퇴를 진행
          await deleteMember(memberInfo.id);
          // 회원 탈퇴 성공 메시지 표시
          Swal.fire({
            icon: 'success',
            title: '회원 탈퇴가 완료되었습니다.',
            text: '메인 페이지로 이동합니다.',
            confirmButtonText: '확인',
          }).then((res) => {
            if (res.isConfirmed) {
              navigate('/');
            }
          });
        } catch (error) {
          // 회원 탈퇴 실패 시 에러 메시지 표시
          console.error('회원 탈퇴 실패:', error);
          Swal.fire({
            icon: 'error',
            title: '회원 탈퇴 실패',
            text: '회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.',
            confirmButtonText: '확인',
          });
        }
      }
    });
  };

  return (
    <div className={styles.myContainer}>
      <div className={styles.myContent}>
        <h1 className={styles.BodyTopText}>My Page</h1>
        <div className={styles.myPicture}>
          <img
            className={styles.profile}
            src={
              'http://localhost:8080/image/' + memberInfo.imgName ||
              '/resources/images/unnamed.jpg'
            }
            // profileImage가 null이면 기본이미지가 나옴
            alt="프로필 사진"
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

        <button className={styles.editButton} onClick={goToEditMyPage}>
          내 정보 수정
        </button>
        <button className={styles.reviewButton} onClick={goToMyReviewList}>
          내 글 목록
        </button>
        <button className={styles.deleteButton} onClick={handleDeleteMember}>
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
