import { ReviewSetStateContext, ReviewStateContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import { deleteReview, getReviewOne } from '../../api/reviewApi';
import { checkLoginStatus } from '../../api/memberApi';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/ReviewDetail.module.css';

const MyReviewDetail = () => {
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const { id } = useParams();
  const nav = useNavigate();
  const [review, setReview] = useState(null); // 기본값을 null로 설정

  useEffect(() => {
    checkLoginStatus()
      .then((data) => {
        if (data.status === 'fail') {
          console.log('로그인 상태 아님(세션체크)');
        } else {
          console.log('로그인 상태입니다.(세션체크)');
        }
      })
      .catch((error) => {
        console.error('Error checking login status:', error);
      });
  }, [data.status]);

  const handleDelete = async () => {
    //새로고침 부분 코드 수정 부분
    try {
      await deleteReview(id);
      setData((prevData) =>
        prevData.filter((item) => item.id !== parseInt(id))
      );
      nav('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviewOne(id)
      .then((data) => {
        console.log(data);
        setReview(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //data.review와 params.id가 변경될 때마다 useEffect

  if (!review) {
    return <div>Loading...</div>; // review가 null인 경우 로딩 중을 나타내거나 아무것도 표시하지 않음
  }

  return (
    <div className={styles.Detail}>
      <div className={styles.detail_header}>
        <h4 className={styles.DateText}>
          작성일 : {new Date(review.createdDate).toLocaleDateString()}
        </h4>
        <h2 className={styles.TitleText}>{review.title}</h2>
        <div className={styles.btn}>
          <button
            className={styles.edit_button}
            onClick={() => nav(`/edit/${id}`)}
          >
            수정
          </button>
          <button className={styles.delete_button} onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <div className={styles.detail_viewer}>
        <div>
          <img
            src={'http://localhost:8080/image/' + review.imgName}
            alt="이미지"
          ></img>
        </div>
        <div className={styles.rating}>평점 : {review.rating}</div>
        <div className={styles.detail_content}>{review.content}</div>
      </div>
    </div>
  );
};

export default MyReviewDetail;
