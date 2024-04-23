import ReviewItem from './ReviewItem';

//리뷰 아이템들로 구성된 리뷰 리스트
const ReviewList = ({ data }) => {
  // 배열을 3개씩 자르고 그룹화하는 함수
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  // 데이터를 3개씩 자르고 그룹화
  const chunkedData = chunkArray(data, 3);
  console.log(chunkedData);

  return (
    <div className="ReviewList">
      <h3>Review</h3>
      <div className="list_wrapper">
        {/* 각 그룹을 출력 */}
        {chunkedData.map((group, index) => (
          <div key={index} className="review_group">
            {group.map((item) => {
              console.log(item.img);
              return <ReviewItem key={item.id} img={item.img} {...item} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
