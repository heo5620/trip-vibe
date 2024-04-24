import { useContext, useState, useEffect } from 'react';
import { ReviewSetStateContext, ReviewStateContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css';

//Main - ReviewItem - Detail
const Detail = () => {
  const params = useParams();
  const nav = useNavigate();
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const [review, setReview] = useState(null);
  console.log(data.review);

  const handleDelete = () => {
    const updateData = data.review.filter(item => item.id !== parseInt(params.id));
    setData({ ...data, review: updateData });
    nav('/');
  };

  //렌더링 될때마다
  useEffect(() => {
    //params.id와 data(Main에서 context로 받은 data)의 id가 같은 item 추출
    const updateReview = data.review.find(item => item.id === parseInt(params.id));
    //id에 해당하는 리뷰가 있으면, review에 저장.
    if (updateReview) {
      setReview(updateReview);
    }
  }, [data.review, params.id]); //data.review와 params.id가 변경될 때마다 useEffect

  if (!review) {
    return <div>Loading...</div>; // review가 null인 경우 로딩 중을 나타내거나 아무것도 표시하지 않음
  }

  return (
    <div className='Detail'>
      <div className='detail_header'>
        <h4>작성일 : {new Date(review.createdDate).toLocaleDateString()}</h4>
        <h2>{review.title}</h2>
        <div className='btn'>
          <button className='edit_button' onClick={() => nav(`/edit/${params.id}`)}>
            수정
          </button>
          <button className='delete_button' onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <div className='detail_viewer'>
        <div>
          <img src={`/${review.img}`} alt='이미지'></img>
        </div>
        <div>평점 : {review.rating}</div>
        <div className='detail_content'>{review.content}</div>
      </div>
    </div>
  );
};

export default Detail;
