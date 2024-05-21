import { useContext, useState, useEffect } from 'react';
import { ReviewSetStateContext, ReviewStateContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles/Detail.module.css';
import { getReviewOne } from '../api/reviewApi';

const Detail = () => {
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const { id } = useParams();
  const nav = useNavigate();
  const [review, setReview] = useState(null); // 기본값을 null로 설정

  const handleDelete = () => {
    const updateData = data.review.filter(item => item.id !== parseInt(id));
    setData({ ...data, review: updateData });
    nav('/');
  };

  useEffect(() => {
    getReviewOne(id)
      .then(data => {
        console.log(data);
        setReview(data); // 데이터를 review 상태로 설정
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]); // id가 변경될 때마다 useEffect 실행

  if (!review) {
    return <div>Loading...</div>; // review가 null인 경우 로딩 중을 나타내거나 아무것도 표시하지 않음
  }

  return (
    <div className={styles.Detail}>
      <div className={styles.detail_header}>
        <h4 className={styles.DateText}>작성일 : {new Date(review.createdDate).toLocaleDateString()}</h4>
        <h2 className={styles.TitleText}>{review.title}</h2>
        <div className={styles.btn}>
          <button className={styles.edit_button} onClick={() => nav(`/edit/${id}`)}>
            수정
          </button>
          <button className={styles.delete_button} onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <div className={styles.detail_viewer}>
        <div>
          <img src={'http://localhost:8080/image/' + review.imgName} alt='이미지'></img>
        </div>
        <div className={styles.rating}>평점 : {review.rating}</div>
        <div className={styles.detail_content}>{review.content}</div>
      </div>
    </div>
  );
};

export default Detail;
