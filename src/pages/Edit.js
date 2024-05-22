import { ReviewSetStateContext, ReviewStateContext } from '../App';
import { useContext, useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles/Edit.module.css';
import { getReviewOne, updateReview } from '../api/reviewApi';

const Edit = () => {
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [rating, setRating] = useState();
  const [imgName, setImgName] = useState(); //기존 이미지로 초기화
  const [content, setContent] = useState();
  const [hovering, setHovering] = useState(false);
  const [newImg, setNewImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const fileInputRef = useRef(null);

  //기존 데이터 불러오기
  useEffect(() => {
    getReviewOne(id)
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setContent(data.content);
        setRating(data.rating);
        setImgName(data.imgName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  //새 이미지 저장
  const handleImg = (e) => {
    const file = e.target.files[0];
    setNewImg(file);

    const reader = new FileReader();
    reader.readAsDataURL(file); //파일 데이터를 url로 바꿔서 저장

    reader.onload = () => {
      //파일을 성공적으로 읽어오면
      setPreviewImg(reader.result); //preview에 저장
    };
  };

  //수정 완료 버튼 누를 때
  const handleUpdate = () => {
    const newReview = {
      //새 리뷰 데이터
      title: title,
      content: content,
      rating: rating,
      createdDate: new Date(),
    };

    console.log(newReview);

    const formData = new FormData(); //리뷰를 담을 폼
    formData.append('review', JSON.stringify(newReview));
    if (newImg) {
      formData.append('img', newImg);
    }

    updateReview(id, formData) //아이디와 폼 보내기
      .catch((error) => {
        console.log(error);
      });
    navigate(`/detail/${id}`); //완료 후, 상세 페이지로 이동.
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.Edit}>
      <div className={styles.edit_img_content}>
        <input
          type="file"
          id="imageUpload"
          name="img"
          style={{ display: 'none' }}
          ref={fileInputRef} // img를 클릭하면 대신해서 input이 클릭됨
          accept="image/*"
          onChange={handleImg}
        />
        <div
          className={styles.edit_img_wrapper}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <img
            className={styles.edit_image}
            src={previewImg || 'http://localhost:8080/image/' + imgName} //prview가 있다면 보여주기.
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
          name="title"
          value={title}
          onChange={handleTitle}
        ></input>
        <input
          type="text"
          className={styles.edit_rating}
          content="rating"
          value={rating}
          onChange={handleRating}
        ></input>
      </div>
      <div className={styles.edit_review_container}>
        <textarea
          className={styles.edit_text}
          name="content"
          value={content}
          onChange={handleContent}
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
