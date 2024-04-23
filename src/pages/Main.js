import { useContext, useState,useEffect } from 'react';
import ReviewList from '../components/ReviewList';
import { ReviewStateContext } from '../App';
import styles from './styles/Main.module.css';


//header
const Main = () => {
  const data = useContext(ReviewStateContext);
  const [searchText, setSearchText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const images = [
    '/resources/images/id1.jpg', 
    '/resources/images/id2.jpg', 
    '/resources/images/id3.jpg', 
    '/resources/images/id4.jpg'];
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []); //빈 배열을 전달해서 컴포넌트가 첫 렌더링 될 때만 useEffect 실행

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };
  
  //엔터로 검색
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // 아마도 검색동작기능
    console.log('검색어:', searchText);
  };

  return (
    <div className={styles.main}>
      <section className={styles.imageSection} 
      style={{ backgroundImage: `url(/resources/images/id${currentImageIndex + 1}.jpg)` }}>
        {/* 이미지를 넣어야 함 */}
      </section>

      <section className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder=" ... 어떤 여행을 찾아볼까요?"
        value={searchText}
        onChange={handleSearchInputChange}
        onKeyPress={handleKeyPress} /*엔터로 검색기능*/
      />
      </section>

      
      <section className={styles.reviewSection}>
        <ReviewList data={data}></ReviewList>
      </section>
    </div>
  );
};

export default Main;
