import { useNavigate } from 'react-router-dom';
import styles from './styles/ReviewItem.module.css';

const ReviewItem = ({ id, title, imgName, createdDate }) => {
  const nav = useNavigate();

  return (
    <div className={styles.ReviewItem}>
      <div className={styles.review_img} onClick={() => nav(`/detail/${id}`)}>
        <img
          src={'http://localhost:8080/image/' + imgName}
          alt="reivew 이미지"
          width="300"
          height="300"
        ></img>
      </div>
      <div className={styles.title} onClick={() => nav(`/detail/${id}`)}>
        {title}
      </div>
      <div className={styles.created_date} onClick={() => nav(`/detail/${id}`)}>
        {new Date(createdDate).toLocaleDateString()}{' '}
      </div>
    </div>
  );
};

export default ReviewItem;
