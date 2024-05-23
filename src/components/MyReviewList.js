import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import { getReviewsByUserId } from '../api/reviewApi'; // 사용자 리뷰를 가져오는 API 함수
// import styles from './styles/MyReviewList.module.css';

const MyReviewList = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviewsByUserId(id)
      .then(data => {
        setReviews(data);
      })
      .catch(error => console.log(error));
  }, [id]);

  return (
    <div>
      <h1>내 글 목록</h1>
      <ReviewList sortedData={reviews} searchText='' />
    </div>
  );
};

export default MyReviewList;
