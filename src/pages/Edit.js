import { useParams } from 'react-router-dom';
import { useContext, useState, useRef } from 'react';
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
  const oldReview = data.review.find((item) => item.id === parseInt(params.id));

  const [title, setTitle] = useState(oldReview.title);
  const [rating, setRating] = useState(oldReview.rating);
  const [newImg, setNewImg] = useState(`/${oldReview.img}`); //기존 이미지로 초기화
  const [content, setcontent] = useState(oldReview.content);

  //수정 완료 버튼 누를 때
  const handleUpdate = () => {
    //params.id === itme.id 리뷰 데이터를 새로운 리뷰데이터로 변경 후, 나머지는 그대로 newReview에 담기.
    const newReview = data.review.map((item) => {
      if (item.id === parseInt(params.id)) {
        return {
          ...item,
          title: title,
          rating: rating,
          img: newImg,
          content: content,
        };
      } else {
        return item;
      }
    });
    setData({ ...data, review: newReview }); //기존의 데이터 유지. 리뷰 데이터만 변경.
    console.log(data.review);
    nav(`/detail/${params.id}`); //완료 후, 상세 페이지로 이동.
  };

  const handleCancel = () => {
    nav(-1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      //파일 읽기 작업이 완료되면 업로드한 이미지를 newImg에 넣기.
      setNewImg(reader.result);
    };
    reader.readAsDataURL(file);
    //파일을 Base64 형식으로 읽기..???ㅠㅠ
  };

  // 사진수정기능////////////////////
  //프로필 이미지 위에 마우스 호버링
  const [hovering, setHovering] = useState(false);

  // 파일 업로드 input 요소 참조
  const fileInputRef = useRef(null);

  return (
    <div className="Edit">
      <div className="edit_img_content">
        <input
          type="file"
          id="imageUpload"
          style={{ display: 'none' }}
          ref={fileInputRef} // img를 클릭하면 대신해서 input이 클릭됨
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div
          className="edit_img_wrapper"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <img
            className="edit_image"
            src={newImg}
            alt="이미지"
            onClick={() => fileInputRef.current.click()}
            width="400"
            height="400"
          />

          {hovering && (
            <div
              className="edit_img_editText"
              onClick={() => fileInputRef.current.click()}
            >
              사진 수정
            </div>
          )}
        </div>
      </div>
      <div className="edit_title_rating">
        <input
          type="text"
          className="edit_title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          type="text"
          className="edit_rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        ></input>
      </div>
      <div className="edit_review_container">
        <textarea
          className="edit_text"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        ></textarea>
      </div>

      <div className="edit_button_container">
        <button className="edit_cancelBtn" onClick={handleCancel}>
          취소하기
        </button>
        <button className="edit_completeBtn" onClick={handleUpdate}>
          작성완료
        </button>
      </div>
    </div>
  );
};

export default Edit;
