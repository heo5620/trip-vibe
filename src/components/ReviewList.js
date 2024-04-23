import { useNavigate } from 'react-router-dom';
import ReviewItem from './ReviewItem';

//리뷰 아이템들로 구성된 리뷰 리스트
const ReviewList = ({ data, searchText }) => {
  // 배열을 3개씩 자르고 그룹화하는 함수
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const navigate = useNavigate();

  const goNew = () => {
    navigate('/new');
  };
  // 검색어가 입력되었을 때 필터링하여 해당하는 리뷰만 표시
  const filteredData = searchText
    ? data.review.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
    : data.review;

  // 데이터를 3개씩 자르고 그룹화
  const chunkedData = chunkArray(filteredData, 3);

  return (
    <div className='ReviewList'>
      <h3>Review</h3>
      <button onClick={goNew}>글쓰기</button>
      <div className='list_wrapper'>
        {/* 각 그룹을 출력 */}
        {chunkedData.map((group, index) => (
          <div key={index} className='review_group'>
            {group.map(item => {
              return <ReviewItem key={item.id} img={item.img} {...item} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
