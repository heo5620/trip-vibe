import { useContext, useRef, useState } from 'react';
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
} from './styles/Newcss';
import { ReviewSetStateContext, ReviewStateContext } from '../App';

const New = () => {
  const navigate = useNavigate();
  const params = useParams();
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isWritingComplete, setIsWritingComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleFinish = () => {
    const updateData = data.filter(item => item.id !== parseInt(params.id));
    setData(updateData);
    navigate('/');
  };

  const handleDiaryChange = event => {
    setReviewText(event.target.value);
    setIsWritingComplete(!!event.target.value);
  };

  const handleDiaryTitleChange = event => {
    setReviewTitle(event.target.value);
  };

  // 게시글 작성 완료 눌렀을 때 통신
  // const handleWritingComplete = async event => {
  //   event.preventDefault();
  //   setIsWritingComplete(prevIsWritingComplete => !prevIsWritingComplete);
  //   const formData = new FormData();
  //   const request = {
  //     title: reviewTitle,
  //     content: reviewText,
  //   };
  //   formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
  //   formData.append('image', selectedImage);

  //   try {
  //     const res = await axios.post('/api/post', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/formData',
  //       },
  //     });
  //     navigate('/MainHomePage');
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

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
      <ReviewContainer>
        <TitleInput type='text' placeholder='제목' value={reviewTitle} onChange={handleDiaryTitleChange} />
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
