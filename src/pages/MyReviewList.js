import { useEffect, useState } from 'react';
import styles from './styles/MyReviewList.module.css';
import ReviewList from '../components/ReviewList';
import { checkLoginStatus } from '../api/memberApi';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Warning } from '../components/styles/icon/Group 10.svg';
import { getMyReviewList } from '../api/reviewApi';
import MyReviewListEdit from '../components/MyReviewListEdit';

const MyReviewList = () => {
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [review, setReview] = useState([]);
  const navigate = useNavigate();

  const myReviewAdd = () => {
    navigate('/new');
  };

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
      {review.length > 0 ? (
        <>
          <div className={styles.MyReviewListTitle}>My Review</div>
          <section className={styles.reviewSection}>
            <MyReviewListEdit sortedData={review} />
          </section>
        </>
      ) : (
        <div className={styles.noReviewMessage}>
          <Warning className={styles.Warning} />
          <h1>이런! 아직 등록하신 리뷰가 없네요!</h1>
          <button className={styles.goReview} onClick={myReviewAdd}>
            리뷰 등록하러 가기
          </button>
        </div>
      )}
    </>
  );
};

export default MyReviewList;
