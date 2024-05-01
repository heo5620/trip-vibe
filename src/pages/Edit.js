import { ReviewSetStateContext, ReviewStateContext } from '../App';
import { useContext, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles/Edit.module.css';

const Edit = () => {
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const params = useParams();
  const navigate = useNavigate();

  //기존 데이터를 불러옴.
  const oldReview = data.review.find((item) => item.id === parseInt(params.id));

  const [title, setTitle] = useState(oldReview.title);
  const [rating, setRating] = useState(oldReview.rating);
  const [newImg, setNewImg] = useState(`/${oldReview.img}`); //기존 이미지로 초기화
  const [content, setcontent] = useState(oldReview.content);
  const [hovering, setHovering] = useState(false);
  const fileInputRef = useRef(null);

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
    console.log(data.review); //변경된 데이터 확인용 (지우지 마세요!)
    navigate(`/detail/${params.id}`); //완료 후, 상세 페이지로 이동.
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewImg(reader.result); //파일 읽기 작업이 완료되면 업로드한 이미지를 newImg에 넣기.
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.Edit}>
      <div className={styles.edit_img_content}>
        <input
          type="file"
          id="imageUpload"
          style={{ display: 'none' }}
          ref={fileInputRef} // img를 클릭하면 대신해서 input이 클릭됨
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div
          className={styles.edit_img_wrapper}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <img
            className={styles.edit_image}
            src={newImg}
            alt="이미지"
            onClick={() => fileInputRef.current.click()}
            width="400"
            height="400"
          />

          {hovering && (
            <div
              className={styles.edit_img_editText}
              onClick={() => fileInputRef.current.click()}
            >
              사진 수정
            </div>
          )}
        </div>
      </div>
      <div className={styles.edit_title_rating}>
        <input
          type="text"
          className={styles.edit_title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          type="text"
          className={styles.edit_rating}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        ></input>
      </div>
      <div className={styles.edit_review_container}>
        <textarea
          className={styles.edit_text}
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.edit_button_container}>
        <button className={styles.edit_cancelBtn} onClick={handleCancel}>
          취소하기
        </button>
        <button className={styles.edit_completeBtn} onClick={handleUpdate}>
          작성완료
        </button>
      </div>
    </div>
  );
};

export default Edit;
