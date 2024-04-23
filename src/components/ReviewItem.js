import { useNavigate } from 'react-router-dom';
import './ReviewItem.css';

//리뷰 리스트를 구성하는 리뷰 아이템
//id, title, img, createdDate 받아와서 출력
//이미지, 제목, 날짜를 클릭하면 상세 페이지로 이동.
const ReviewItem = ({ id, title, img, createdDate }) => {
  const nav = useNavigate();
  console.log(img);
  return (
    <div className="ReviewItem">
      <div className="review_img" onClick={() => nav(`/detail/${id}`)}>
        <img src={img} alt="reivew 이미지" width="300" height="300"></img>
      </div>
      <div className="title" onClick={() => nav(`/detail/${id}`)}>
        {title}
      </div>
      <div className="created_date" onClick={() => nav(`/detail/${id}`)}>
        {new Date(createdDate).toLocaleDateString()}{' '}
      </div>
    </div>
  );
};

export default ReviewItem;
