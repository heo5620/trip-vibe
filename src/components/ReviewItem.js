import { useNavigate } from 'react-router-dom';
import styles from './styles/ReviewItem.module.css';

const ReviewItem = ({ id, title, imgName, createdDate }) => {
  const nav = useNavigate();

  return (
    <div className={styles.ReviewItem}>
      <div className={styles.review_img} onClick={() => nav(`/myreviewdetail/${id}`)}>
        <img src={'http://localhost:8080/image/' + imgName} alt='reivew 이미지' width='300' height='300'></img>
      </div>
      <div className={styles.title} onClick={() => nav(`/myreviewdetail/${id}`)}>
        {title}
      </div>
      <div className={styles.created_date} onClick={() => nav(`/myreviewdetail/${id}`)}>
        {new Date(createdDate).toLocaleDateString()}{' '}
      </div>
    </div>
  );
};

export default ReviewItem;
