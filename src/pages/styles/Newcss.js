import styled from 'styled-components';

export const Container = styled.div`
  /* border: 3px solid black; */
  width: 800px;
  height: 900px;
  margin: auto;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  border: 2px solid black;
  width: 700px;
  height: 500px;
  margin-top: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  /* position: relative; */
`;

export const SelectedImage = styled.img`
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
export const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ModalImageButton = styled.button`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const ModalButton = styled.button`
  cursor: pointer;
  font-size: large;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 30px;
  width: 100px;
`;

export const ImageModal = styled.div`
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

export const ModalContent = styled.div`
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

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 400px;
`;

//이미지 추가하기 버튼
export const UploadButton = styled.button`
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
export const StateButtonContainer = styled.div`
  width: 700px;
  height: 30px;
  display: flex;
  margin-top: 20px;
  position: relative;
`;

export const ReviewContainer = styled.div`
  margin-top: 20px;
  width: 700px;
`;

export const TitleInput = styled.input`
  border: 2px solid black;
  width: 600px;
  height: 50px;
  padding-left: 10px;
  margin-top: 20px;
`;

export const ReviewInput = styled.input`
  border: 2px solid black;
  width: 700px;
  height: 180px;
  padding-left: 10px;
`;

export const ReviewButtonContainer = styled.div`
  width: 700px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const CancelButton = styled.button`
  cursor: pointer;
  font-size: large;
`;

export const CompleteButton = styled.button`
  cursor: pointer;
  font-size: large;
`;

export const RatingInput = styled.input`
  width: 90px;
  height: 50px;
  margin-left: 10px;
  font-size: 16px;
  margin-top: 20px;
  padding-left: 10px;
  border: 2px solid black;
`;
