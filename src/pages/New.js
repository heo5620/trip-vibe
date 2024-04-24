import React, { useContext, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // axios import 추가
import {
  CancelButton,
  CompleteButton,
  Container,
  ReviewButtonContainer,
  ReviewContainer,
  ReviewInput,
  ImageContainer,
  ImageModal,
  ModalButton,
  ModalButtonContainer,
  ModalContent,
  ModalImage,
  ModalImageButton,
  SelectedImage,
  TitleInput,
  UploadButton,
  RatingInput, // 추가한 평점 입력 칸
} from './styles/Newcss';
import { ReviewSetStateContext, ReviewStateContext } from '../App';

const New = () => {
  const navigate = useNavigate();
  const params = useParams();
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [isWritingComplete, setIsWritingComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleFinish = () => {
    // 새로운 리뷰 데이터 생성
    const newReview = {
      id: data.review.length + 1, // 새로운 리뷰의 ID는 현재 데이터 길이 + 1로 설정
      title: reviewTitle,
      content: reviewText,
      rating: rating,
      image: selectedImage, // 선택한 이미지도 추가할 수 있습니다
      createdDate: new Date().toISOString(), // 현재 날짜와 시간으로 생성일 설정
    };

    // 기존 데이터에 새로운 리뷰 추가
    setData({ ...data, review: [...data.review, newReview] });

    // 메인 페이지로 이동
    navigate('/');
  };

  const handleDiaryChange = event => {
    setReviewText(event.target.value);
    setIsWritingComplete(!!event.target.value);
  };

  const handleDiaryTitleChange = event => {
    setReviewTitle(event.target.value);
  };

  const handleImageSelect = event => {
    setSelectedImage(event.target.files[0]);
    setIsModalOpen(true);
  };

  const handleImageConfirm = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const plusImageButton = () => {
    setVisible(!visible);
    fileInputRef.current.click();
  };

  return (
    <Container>
      <ImageContainer>
        {selectedImage && (
          <>
            <ModalImageButton onClick={() => setIsModalOpen(true)}>
              <SelectedImage src={URL.createObjectURL(selectedImage)} alt='Selected Image' />
            </ModalImageButton>
            <ImageModal style={{ display: isModalOpen ? 'flex' : 'none' }}>
              <ModalContent>
                <ModalImage src={URL.createObjectURL(selectedImage)} />
                <ModalButtonContainer>
                  <ModalButton onClick={() => fileInputRef.current.click()}>수정 </ModalButton>
                  <ModalButton onClick={handleImageConfirm}>확인</ModalButton>
                </ModalButtonContainer>
              </ModalContent>
            </ImageModal>
          </>
        )}
        <input
          type='file'
          accept='image/jpg, image/jpeg, image/png'
          ref={fileInputRef}
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
        {visible ? '' : <UploadButton onClick={plusImageButton}>이미지 추가하기</UploadButton>}
      </ImageContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {' '}
        <TitleInput type='text' placeholder='제목' value={reviewTitle} onChange={handleDiaryTitleChange} />
        <RatingInput type='text' placeholder='평점' value={rating} onChange={e => setRating(e.target.value)} />{' '}
      </div>
      <ReviewContainer>
        <ReviewInput type='text' value={reviewText} onChange={handleDiaryChange} placeholder='내용을 입력해주세요!' />
        <ReviewButtonContainer>
          <CancelButton onClick={handleCancel} isWritingComplete={isWritingComplete}>
            취소하기
          </CancelButton>
          <CompleteButton className='finish_button' onClick={handleFinish} isWritingComplete={isWritingComplete}>
            작성완료
          </CompleteButton>
        </ReviewButtonContainer>
      </ReviewContainer>
    </Container>
  );
};

export default New;
