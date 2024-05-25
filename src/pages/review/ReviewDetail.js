import { ReviewStateContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewOne } from '../../api/reviewApi';
import { checkLoginStatus } from '../../api/memberApi';
import styles from '../styles/ReviewDetail.module.css';

const Detail = () => {
  const data = useContext(ReviewStateContext);
  const { id } = useParams();
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

  useEffect(() => {
    getReviewOne(id)
      .then((data) => {
        console.log(data);
        setReview(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        <div className={styles.btn}></div>
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

export default Detail;
