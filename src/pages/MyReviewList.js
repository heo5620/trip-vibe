import { useEffect, useState } from 'react';
import styles from './styles/MyReviewList.module.css';
import ReviewList from '../components/ReviewList';
import { checkLoginStatus } from '../api/memberApi';
import { useNavigate, useParams } from 'react-router-dom';
import { getMyReviewList } from '../api/reviewApi';
import MyReviewListEdit from '../components/MyReviewListEdit';

const MyReviewList = () => {
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [review, setReview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus()
      .then(data => {
        if (data.status === 'fail') {
          //로그아웃 상태이면
          setIsLoggedIn(false);
          navigate('/signin');
        } else {
          //로그인 상태이면 리뷰 목록 불러오기
          getMyReviewList(id).then(data => {
            console.log(data);
            setReview(data);
          });
        }
      })
      .catch(error => {
        console.error('Error checking login status:', error);
      });
  }, [isLoggedIn]);

  return (
    <>
      <div className={styles.MyReviewListTitle}>내 리뷰</div>
      <section className={styles.reviewSection}>
        <MyReviewListEdit sortedData={review} />
      </section>
    </>
  );
};

export default MyReviewList;