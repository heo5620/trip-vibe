import { useContext, useState, useEffect } from 'react';
import { ReviewSetStateContext, ReviewStateContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles/Detail.module.css';
import { deleteReview, getReviewOne } from '../api/reviewApi';

const Detail = () => {
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const { id } = useParams();
  const nav = useNavigate();
  const [review, setReview] = useState(null); // 기본값을 null로 설정

  const handleDelete = async () => {
    // const updateData = data.review.filter((item) => item.id !== parseInt(id));
    // setData({ ...data, review: updateData });
    deleteReview(id)
      .then((data) => {
        console.log('삭제된 데이터 : ' + data);
      })
      .catch((error) => {
        console.log(error);
      });
    nav('/');
  };

  useEffect(() => {
    //params.id와 data(Main에서 context로 받은 data)의 id가 같은 item 추출
    // const updateReview = data.review.find((item) => item.id === parseInt(id));
    // //id에 해당하는 리뷰가 있으면, review에 저장.
    // if (updateReview) {
    //   setReview(updateReview);
    // }

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

export default Detail;
