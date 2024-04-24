import { useContext, useState, useEffect } from 'react';
import ReviewList from '../components/ReviewList';
import { ReviewStateContext } from '../App';
import styles from './styles/Main.module.css';
import { useNavigate } from 'react-router-dom';

//header
const Main = () => {
  const data = useContext(ReviewStateContext);
  const [searchText, setSearchText] = useState(''); //검색어
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    setSearchText(e.target.value);
  };

  const navigate = useNavigate();
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
        <button className={`${styles.writeButton}`} onClick={goNew}>
          글쓰기
        </button>
      </div>

      <section className={styles.reviewSection}>
        {searchText ? <ReviewList data={data} searchText={searchText} /> : <ReviewList data={data} />}
      </section>
    </div>
  );
};

export default Main;
