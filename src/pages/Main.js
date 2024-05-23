import { ReviewStateContext } from '../App';
import { IsLoggedInContext } from '../App';
import { SetIsLoggedInContext } from '../App';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import styles from './styles/Main.module.css';
import { getReviewList } from '../api/reviewApi';
import { checkLoginStatus, logout } from '../api/memberApi';

//header
const Main = () => {
  const data = useContext(ReviewStateContext);
  // const isLoggedIn = useContext(IsLoggedInContext);
  // const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const navigate = useNavigate();
  const [review, setReview] = useState(data); //빈 배열에서 data로 변경
  const [searchText, setSearchText] = useState(''); //검색어
  const [sortType, setSortType] = useState(); //정렬
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  //새로 고침 이 부분 추가
  useEffect(() => {
    setReview(data);
  }, [data]);

  useEffect(() => {
    getReviewList()
      .then((data) => {
        console.log(data);
        setReview(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // useEffect(() => {
  //   getReviewList()
  //     .then((data) => {
  //       console.log(data);
  //       setReview(data);
  //     })
  //     .catch((error) => console.log(error));

  //   if (sessionStorage.getItem('memberId') === null) {
  //     console.log('isLogin ?? :: ', isLogin);
  //   } else {
  //     setIsLogin(true);
  //     console.log('isLogin ?? :: ', isLogin);
  //   }
  // }, []);

  //logo 이미지 3초마다 변경
  useEffect(() => {
    console.log(data);
    const images = [
      '/resources/images/logo1.jpg',
      '/resources/images/logo2.jpg',
      '/resources/images/logo3.jpg',
    ];
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []); //빈 배열을 전달해서 컴포넌트가 첫 렌더링 될 때만 useEffect 실행

  //검색어 저장
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  //정렬값 저장
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  //리뷰 정렬해주는 함수(새로고침 부분 수정 중)
  const getSortedDate = () => {
    return review.sort((a, b) => {
      if (sortType === 'oldest') {
        return (
          Number(new Date(a.createdDate).getTime()) -
          Number(new Date(b.createdDate).getTime())
        ); //오름차순(오래된 날짜부터)
      } else {
        //내림차순
        return (
          Number(new Date(b.createdDate).getTime()) -
          Number(new Date(a.createdDate).getTime())
        );
      }
    });
  };

  // const logout = () => {
  //   logout().then((data) => console.log(data));
  // };

  //리뷰 정렬된 데이터
  const sortedData = getSortedDate();

  //글쓰기 버튼 클릭 시, 리뷰 작성 페이지로 이동
  const goNew = () => {
    navigate('/new');
  };

  return (
    <div className={styles.main}>
      <section
        className={styles.imageSection}
        style={{
          backgroundImage: `url(/resources/images/logo${
            currentImageIndex + 1
          }.jpg)`,
        }}
      ></section>

      <section className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="   어떤 여행을 찾아볼까요?"
          value={searchText}
          onChange={handleSearchInputChange}
        />
      </section>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewText}>Review</div>
        <div className={styles.sortSelector}>
          <select onChange={onChangeSortType}>
            <option value={'latest'}>최신순</option>
            <option value={'oldest'}>오래된순</option>
          </select>
        </div>
        <div>
          <button onClick={logout}>로그아웃</button>
        </div>
        <button className={`${styles.writeButton}`} onClick={goNew}>
          글쓰기
        </button>
      </div>

      <section className={styles.reviewSection}>
        <ReviewList sortedData={sortedData} searchText={searchText} />
      </section>
    </div>
  );
};

export default Main;
