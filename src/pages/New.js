import { ReviewSetStateContext, ReviewStateContext } from '../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/New.module.css';

const New = () => {
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [uploadedImg, setUploadedImg] = useState(null); // 업로드된 이미지 상태 추가
  const [rating, setRating] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // 새 리뷰 생성
    const newReview = {
      id: data.review.length + 1,
      createdDate: new Date(),
      title,
      content,
      img: uploadedImg ? uploadedImg : img,
      rating,
    };
    // 새 리뷰 추가
    setData(prevData => ({
      ...prevData,
      review: [...prevData.review, newReview],
    }));
    // 리뷰 작성 후 홈페이지로 이동
    navigate('/');
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

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        {/* 이미지 선택을 위한 input 요소 */}
        <div className={styles.imagecontainer}>
          {' '}
          <label htmlFor='imageUpload'>
            +
            <input
              type='file'
              id='imageUpload'
              accept='image/*'
              onChange={handleImageUpload}
              style={{ display: 'none' }} // input 요소를 숨김
            />
          </label>
          {/* 이미지 미리보기 */}
          <div onClick={() => document.getElementById('imageUpload').click()}>
            <img className={styles.modalimage} src={img} />
          </div>
        </div>
        <input
          className={styles.titleinput}
          type='text'
          placeholder='제목'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className={styles.ratinginput}
          type='text'
          placeholder='평점'
          value={rating}
          onChange={e => setRating(parseInt(e.target.value))}
        />{' '}
        <div className={styles.reviewcontainer}>
          <input
            className={styles.reviewinput}
            value={content}
            placeholder='내용을 입력해주세요'
            onChange={e => setContent(e.target.value)}
          />
          <div className={styles.reviewbuttoncontainer}>
            <button className={styles.cancelbutton} onClick={handleCancel}>
              뒤로 가기
            </button>
            <button className={styles.completebutton} type='submit'>
              작성 완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default New;
