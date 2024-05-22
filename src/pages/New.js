import { ReviewSetStateContext } from '../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/New.module.css';
import { saveReview } from '../api/reviewApi';

const New = () => {
  const setData = useContext(ReviewSetStateContext);
  const nav = useNavigate();

  const [privewImg, setPreviewImg] = useState(null);
  const [review, setReview] = useState({ title: '', content: '', rating: '' });
  const [img, setImg] = useState(null);

  const handleReview = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
      createdDate: new Date(),
    });
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    setImg(file);

    const reader = new FileReader(); //파일 읽을 수 있는 객체
    reader.readAsDataURL(file); //file을 읽어서 url로 변경

    reader.onload = () => {
      //파일을 성공적으로 읽은 경우
      setPreviewImg(reader.result); //미리보기 이미지 변경
    };
  };

  //작성완료
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('review', JSON.stringify(review));
    formData.append('img', img);

    //리뷰 등록
    // try {
    //   const response = await saveReview(formData);
    //   setData((prevData) => [...prevData, response]);
    //   nav('/');
    // } catch (error) {
    //   console.log(error);
    // }
    saveReview(formData).catch((error) => console.log(error));
    nav('/');
  };

  const handleCancel = () => {
    nav('/');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.imagecontainer}>
          <label htmlFor="imageUpload">
            
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              name="img"
              onChange={handleImg}
              style={{ display: 'none' }}
            />
          </label>
          {privewImg && (
            <div>
              <img
                className={styles.modalimage}
                src={privewImg}
                alt="미리보기"
              />
            </div>
          )}
        </div>
        <input
          className={styles.titleinput}
          type="text"
          placeholder="제목"
          name="title"
          value={review.title}
          onChange={handleReview}
        />
        <input
          className={styles.ratinginput}
          type="text"
          placeholder="평점"
          name="rating"
          value={review.rating}
          onChange={handleReview}
        />
        <div className={styles.reviewcontainer}>
          <input
            className={styles.reviewinput}
            name="content"
            value={review.content}
            placeholder="내용을 입력해주세요"
            onChange={handleReview}
          />
          <div className={styles.reviewbuttoncontainer}>
            <button className={styles.cancelbutton} onClick={handleCancel}>
              뒤로 가기
            </button>
            <button className={styles.completebutton} type="submit">
              작성 완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default New;
