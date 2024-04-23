import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'; // axios import 추가

const New = () => {
  const navigate = useNavigate();
  const [writeTitle, setWriteTitle] = useState('');
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryText, setDiaryText] = useState('');
  const [writeText, setWriteText] = useState('');
  const [isWritingComplete, setIsWritingComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleDiaryChange = event => {
    setWriteText(event.target.value);
    setIsWritingComplete(!!event.target.value);
  };

  const handleDiaryTitleChange = event => {
    setDiaryTitle(event.target.value);
  };

  // 게시글 작성 완료 눌렀을 때 통신
  const handleWritingComplete = async event => {
    event.preventDefault();
    setIsWritingComplete(prevIsWritingComplete => !prevIsWritingComplete);
    const formData = new FormData();
    const request = {
      title: diaryTitle,
      content: diaryText,
    };
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    formData.append('image', selectedImage);

    try {
      const res = await axios.post('/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/formData',
        },
      });
      navigate('/MainHomePage');
    } catch (error) {
      console.error('Error:', error);
    }
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
      <WritingTitle>게시글 작성</WritingTitle>
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
      <DiaryContainer>
        <TitleInput type='text' placeholder='제목' value={diaryTitle} onChange={handleDiaryTitleChange} />
        <DiaryInput type='text' value={diaryText} onChange={handleDiaryChange} placeholder='내용을 입력해주세요!' />
        <DiaryButtonContainer>
          <CancelButton onClick={handleCancel} isWritingComplete={isWritingComplete}>
            취소하기
          </CancelButton>
          <CompleteButton
            onClick={event => {
              handleWritingComplete(event);
            }}
            isWritingComplete={isWritingComplete}
          >
            작성완료
          </CompleteButton>
        </DiaryButtonContainer>
      </DiaryContainer>
    </Container>
  );
};

export default New;

const Container = styled.div`
  border: 3px solid black;
  width: 800px;
  height: 1000px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WritingTitle = styled.div`
  width: 700px;
  height: 60px;
  border: 2px solid black;
  margin-top: 30px;
  font-size: large;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  border: 2px solid black;
  width: 700px;
  height: 500px;
  margin-top: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

const SelectedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

//모달 창 안에 버튼 묶음 박스
const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ModalImageButton = styled.button`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;
`;

const ModalButton = styled.button`
  cursor: pointer;
  font-size: large;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 30px;
  width: 100px;
  /* &:hover {
    background-color: lightgray; */
  //}
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 500px;
  height: 600px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  z-index: 1;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 400px;
`;

//이미지 추가하기 버튼
const UploadButton = styled.button`
  cursor: pointer;
  font-size: large;
  border-radius: 8px;
  /* display: flex;
  justify-content: center; */
  align-items: center;
  margin-top: 10px;
  height: 30px;
  width: 150px;
  &:hover {
    background-color: lightgray;
  }
`;
const StateButtonContainer = styled.div`
  width: 700px;
  height: 30px;
  display: flex;
  margin-top: 20px;
  position: relative;
  /* border: 1px solid black; */
`;

const DiaryContainer = styled.div`
  margin-top: 20px;
  /* border: 1px solid black; */
  width: 700px;
`;

const TitleInput = styled.input`
  border: 2px solid black;
  width: 700px;
  height: 50px;
  margin-bottom: 15px;
  padding-left: 10px;
`;

const DiaryInput = styled.input`
  border: 2px solid black;
  /* border-radius: 8px; */
  width: 700px;
  height: 180px;
  padding-left: 10px;
`;

const DiaryButtonContainer = styled.div`
  width: 700px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  cursor: pointer;
  font-size: large;
  background-color: ${({ isWritingComplete }) => (isWritingComplete ? 'gray' : 'transparent')};
  color: ${({ isWritingComplete }) => (isWritingComplete ? 'white' : 'black')};
  transition: background-color 0.3s, transform 0.3s;
  transform: ${({ isWritingComplete }) => (isWritingComplete ? 'scaleX(1.2)' : 'scaleX(1)')};
`;

const CompleteButton = styled.button`
  cursor: pointer;
  font-size: large;
  background-color: ${({ isWritingComplete }) => (isWritingComplete ? 'gray' : 'transparent')};
  color: ${({ isWritingComplete }) => (isWritingComplete ? 'white' : 'black')};
  transition: background-color 0.3s, transform 0.3s;
  transform: ${({ isWritingComplete }) => (isWritingComplete ? 'scaleX(1.2)' : 'scaleX(1)')};
`;
