import { useContext } from 'react';
import ReviewList from '../components/ReviewList';
import { ReviewStateContext } from '../App';

//header
//ReviewList
const Main = () => {
  const data = useContext(ReviewStateContext);
  return (
    <div className="main">
      헤더
      <section>이미지, 검색</section>
      <section>
        <ReviewList data={data}></ReviewList>
      </section>
    </div>
  );
};

export default Main;
