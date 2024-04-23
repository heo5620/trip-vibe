import { useRef, useState } from 'react';
import MockData from '../components/MockData';
import styles from './styles/Mypage.module.css';
// import '../../public/assets/resources/image/unnamed.jpg'

const MyPage = () => {
<<<<<<< HEAD
  const [info] = useState(MockData);
=======
  // 목데이터
  const [info, setInfo] = useState(MockData);
  
  // editingMbti : MBTI를 수정중인지 여부. 수정중 = true, 아닐때 = false
  const [editingMbti, setEditingMbti] = useState(false);

  // newMbti : 수정된 MBTI값 임시저장
  const [newMbti, setNewMbti] = useState('');

  // profileImage : 사용자 프로필 이미지
  const [profileImage, setProfileImage] = useState(null);

  // 파일 업로드 input 요소 참조
  const fileInputRef = useRef(null);

  // idEditingNow : 수정버튼을 누르면 수정중인상태 -> editingMbti를 true로 설정
  const idEditingNow = () => {
    setEditingMbti(true);
  };

  // confirmEdit : MBTI 수정 후 확인 누를 때 호출
  const confirmEdit = () => {
    setEditingMbti(false); // 수정중이 아니므로 false
    setInfo(copiedInfo => ({...copiedInfo, // 이전 정보를 copiedInfo로 복사(원본유지)
      [1]: {...copiedInfo[1], // 이전 정보가 1인 항목 복사. *** 추후 변경 ***
      mbti: newMbti} // mbti를 newMbti(수정된 MBTI)로 변경
    }));
  };

  // cancelEdit : 수정중이 아니게 되므로 editingMbti = false
  const cancelEdit = () => {
    setEditingMbti(false);
  };
>>>>>>> a0ee01b257dbf5b26ff20ad7aa4229bff7d48e3f

  const changeImage = (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져옴
    const reader = new FileReader();

    reader.onloadend = () => { // 파일 작업이 완료되면
      setProfileImage(reader.result); // reder.result : 파일 데이터 URL(바꿀 이미지)
    };

    if(file) { // 선택된 파일이 있을 경우에만 수행
      reader.readAsDataURL(file); // 파일 내용을 읽고 URL로 변환, 뭔지 잘 모름
    }
  }





  return (
    <div className={styles.container}>
      <div className={styles.picture}>
<<<<<<< HEAD
        <img
          className={styles.profile}
          src={'../../public/assets/resources/image/unnamed.jpg'}
          alt="프로필 사진"
        />
=======
      <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef} // img를 클릭하면 대신해서 input이 클릭됨
          onChange={changeImage}
          accept="image/*"
        />
        <img 
        className={styles.profile} 
        src={profileImage || require('./../assets/image/unnamed.jpg')} // profileImage가 null이면 기본이미지가 나옴
        alt="프로필 사진" 
        onClick={() => fileInputRef.current.click()}/>
>>>>>>> a0ee01b257dbf5b26ff20ad7aa4229bff7d48e3f
        {/* unnamed.jpg는 임시 샘플파일임 */}
      </div>
      <div className={styles.info}>{info[1].username}</div>
      <div className={styles.info}>{info[1].mbti}</div>
      <div className={styles.info}>{info[1].gender}</div>
    </div>
  );
};

export default MyPage;
