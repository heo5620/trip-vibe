import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReviewSetStateContext, ReviewStateContext } from '../App';
import './Edit.css';

//Main - ReviewItem - Detail - Edit
const Edit = () => {
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const params = useParams();
  const nav = useNavigate();

  //기존 데이터를 불러옴.
  const oldReview = data.review.find(item => item.id === parseInt(params.id));

  const [title, setTitle] = useState(oldReview.title);
  const [rating, setRating] = useState(oldReview.rating);
  const [newImg, setImg] = useState(`/${oldReview.img}`);
  const [uploadedImg, setUploadedImg] = useState(null); // 업로드된 이미지 상태 추가
  const [content, setcontent] = useState(oldReview.content);

  //수정 완료 버튼 누를 때
  const handleUpdate = () => {
    //params.id === itme.id 리뷰 데이터를 새로운 리뷰데이터로 변경 후, 나머지는 그대로 newReview에 담기.
    const newReview = data.review.map(item => {
      if (item.id === parseInt(params.id)) {
        return {
          ...item,
          title: title,
          rating: rating,
          img: uploadedImg ? uploadedImg : newImg,
          content: content,
        };
      } else {
        return item;
      }
    });
    setData({ ...data, review: newReview }); //기존의 데이터 유지. 리뷰 데이터만 변경.
    nav(`/detail/${params.id}`); //완료 후, 상세 페이지로 이동.
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImg(reader.result); // 업로드된 이미지 상태 업데이트
      setImg(reader.result); // 미리보기 이미지 업데이트
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='Edit'>
      <div className='edit_img_content'>
        <input type='file' id='imageUpload' accept='image/*' onChange={handleImageUpload} />
        <img src={newImg} alt='이미지' width='200' height='200'></img>
      </div>
      <div className='edit_title_rating'>
        {/* 제목 :{' '} */}
        <input type='text' className='edit_title' value={title} onChange={e => setTitle(e.target.value)}></input>
        {/* 평점 :{' '} */}
        <input type='text' className='edit_rating' value={rating} onChange={e => setRating(e.target.value)}></input>
      </div>
      <textarea className='edit_text' value={content} onChange={e => setcontent(e.target.value)}></textarea>
      <button onClick={handleUpdate}>작성완료</button>
    </div>
  );
};

export default Edit;
