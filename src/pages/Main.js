import { useContext, useState, useEffect } from 'react';
import ReviewList from '../components/ReviewList';
import { ReviewStateContext } from '../App';
import styles from './styles/Main.module.css';
import { useNavigate } from 'react-router-dom';

//header
const Main = () => {
  const data = useContext(ReviewStateContext);
  const [searchText, setSearchText] = useState(''); //검색어
  const [sortType, setSortType] = useState(); //정렬
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  //logo 이미지 2초마다 변경
  useEffect(() => {
    console.log(data);
    const images = [
      '/resources/images/id1.jpg',
      '/resources/images/id2.jpg',
      '/resources/images/id3.jpg',
      '/resources/images/id4.jpg',
    ];
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []); //빈 배열을 전달해서 컴포넌트가 첫 렌더링 될 때만 useEffect 실행

  //검색어 저장
  const handleSearchInputChange = e => {
    console.log(e.target.value);
    console.log(e.target.value.length);
    setSearchText(e.target.value);
  };

  //정렬값 저장
  const onChangeSortType = e => {
    setSortType(e.target.value);
  };

  //리뷰 정렬해주는 함수
  const getSortedDate = () => {
    return data.review.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return Number(new Date(a.createdDate).getTime()) - Number(new Date(b.createdDate).getTime()); //오름차순(오래된 날짜부터)
      } else {
        //내림차순
        return Number(new Date(b.createdDate).getTime()) - Number(new Date(a.createdDate).getTime());
      }
    });
  };

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
          backgroundImage: `url(/resources/images/id${currentImageIndex + 1}.jpg)`,
        }}
      >
        {/* 이미지를 넣어야 함 */}
      </section>

      <section className={styles.searchContainer}>
        <input
          type='text'
          className={styles.searchInput}
          placeholder=' ... 어떤 여행을 찾아볼까요?'
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
