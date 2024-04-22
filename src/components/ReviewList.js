import ReviewItem from './ReviewItem';

//리뷰 아이템들로 구성된 리뷰 리스트
const ReviewList = ({ data }) => {
  return (
    <div className="ReviewList">
      <h3>Review</h3>
      <div className="list_wrapper">
        {data.map((item) => (
          <ReviewItem key={item.id} {...item}></ReviewItem>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
