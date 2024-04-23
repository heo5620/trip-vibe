import { useContext } from 'react';
import { ReviewSetStateContext, ReviewStateContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css';

//Main - ReviewItem - Detail
const Detail = () => {
  const params = useParams();
  const nav = useNavigate();
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  //params.id와 data(Main에서 context로 받은 data)의 id가 같은 item 추출
  const review = data.find((item) => item.id === parseInt(params.id));

  const handleDelete = () => {
    const updateData = data.filter((item) => item.id !== parseInt(params.id));
    setData(updateData);
    nav('/');
  };
  return (
    <div className="Detail">
      <div className="detail_header">
        <h4>작성일 : {new Date(review.createdDate).toLocaleDateString()}</h4>
        <h2>{review.title}</h2>
        <div className="btn">
          <button
            className="edit_button"
            onClick={() => nav(`/edit/${params.id}`)}
          >
            수정
          </button>
          <button className="delete_button" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <div className="detail_viewer">
        <div>
          <img src={review.img} alt="이미지"></img>
        </div>
        <div>평점 : {review.rating}</div>
        <div className="detail_content">{review.content}</div>
      </div>
    </div>
  );
};

export default Detail;
