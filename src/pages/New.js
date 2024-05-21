import { ReviewSetStateContext } from '../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/New.module.css';
import { saveReview } from '../api/reviewApi';

const New = () => {
  const setData = useContext(ReviewSetStateContext);
  const navigate = useNavigate();

  const [privewImg, setPreviewImg] = useState(null);
  const [review, setReview] = useState({ title: '', content: '', rating: '' });
  const [img, setImg] = useState(null);

  const handleReview = e => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
      createdDate: new Date(),
    });
  };

  const handleImg = e => {
    const file = e.target.files[0];
    setImg(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreviewImg(reader.result);
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('review', JSON.stringify(review));
    formData.append('img', img);

    try {
      const data = await saveReview(formData);

      // 새로운 리뷰로 컨텍스트 상태 업데이트
      setData(prevData => ({
        ...prevData,
        review: [...prevData.review, data],
      }));

      setReview({ title: '', content: '', rating: '' });
      setImg(null);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.imagecontainer}>
          <label htmlFor='imageUpload'>
            +
            <input
              type='file'
              id='imageUpload'
              accept='image/*'
              name='img'
              onChange={handleImg}
              style={{ display: 'none' }}
            />
          </label>
          {privewImg && (
            <div>
              <img className={styles.modalimage} src={privewImg} alt='미리보기' />
            </div>
          )}
        </div>
        <input
          className={styles.titleinput}
          type='text'
          placeholder='제목'
          name='title'
          value={review.title}
          onChange={handleReview}
        />
        <input
          className={styles.ratinginput}
          type='text'
          placeholder='평점'
          name='rating'
          value={review.rating}
          onChange={handleReview}
        />
        <div className={styles.reviewcontainer}>
          <input
            className={styles.reviewinput}
            name='content'
            value={review.content}
            placeholder='내용을 입력해주세요'
            onChange={handleReview}
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
