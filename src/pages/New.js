import { ReviewSetStateContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/New.module.css';
import { saveReview } from '../api/reviewApi';
import { checkLoginStatus } from '../api/memberApi';

const New = () => {
  const setData = useContext(ReviewSetStateContext);
  const nav = useNavigate();

  const [privewImg, setPreviewImg] = useState(null);
  const [review, setReview] = useState({ title: '', content: '', rating: '' });
  const [img, setImg] = useState(null);
  const [currentMember, setCurrentMember] = useState();

  useEffect(() => {
    checkLoginStatus()
      .then((data) => {
        if (data.status === 'success') {
          console.log('로그인 상태:', data.memberInfo);
          setCurrentMember(data.memberInfo); //현재 로그인한 멤버의 고유 아이디
        } else {
          console.log('로그인 상태 아님');
        }
      })
      .catch((error) => {
        console.error('세션 상태 확인 중 오류 발생:', error);
      });
  }, []);

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

  //작성완료(새로고침 문제 수정 중)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('review', JSON.stringify(review));
    formData.append('img', img);
    formData.append('id', currentMember);

    //리뷰 등록
    try {
      const response = await saveReview(formData);
      setData((prevData) => [...prevData, response]);
      nav('/');
    } catch (error) {
      console.log(error);
    }
    // saveReview(formData).catch(error => console.log(error));
    // nav('/');
  };

  const handleCancel = () => {
    nav('/');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.imagecontainer}>
          <label htmlFor="imageUpload">
            +
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
