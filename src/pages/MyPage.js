import { useRef, useState } from 'react';
import { useContext } from 'react';
import { ReviewStateContext, ReviewSetStateContext } from '../App';
import MockData from '../components/MockData';
import styles from './styles/Mypage.module.css';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyPage = () => {
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

  const [hovering, setHovering] = useState(false);

  // idEditingNow : 수정버튼을 누르면 수정중인상태 -> editingMbti를 true로 설정
  const idEditingNow = () => {
    setEditingMbti(true);
  };

  // confirmEdit : MBTI 수정 후 확인 누를 때 호출
  const confirmEdit = () => {
    // 아무것도 입력하지 않고 확인 누르면 생기는 일
    if (!newMbti.trim()) {
      // 입력값이 비어 있는지 확인
      toast.error('MBTI를 입력하세요', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    // MBTI가 아닌 다른 알파벳 조합일 때
    if (!isValidMbti(newMbti)) {
      toast.warning('올바른 MBTI를 입력하세요', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    setEditingMbti(false); // 수정중이 아니므로 false
    setInfo(copiedInfo => ({
      ...copiedInfo, // 이전 정보를 copiedInfo로 복사(원본유지)
      [1]: {
        ...copiedInfo[1], // 이전 정보가 1인 항목 복사. *** 추후 변경 ***
        mbti: newMbti,
      }, // mbti를 newMbti(수정된 MBTI)로 변경
    }));
  };

  // MBTI 제대로 썼는지 검사
  const isValidMbti = mbti => {
    if (mbti.length !== 4) {
      return false;
    }

    const mbtiTypes = [
      'ENFP',
      'ENFJ',
      'ENTP',
      'ENTJ',
      'ESFP',
      'ESFJ',
      'ESTP',
      'ESTJ',
      'INFP',
      'INFJ',
      'INTP',
      'INTJ',
      'ISFP',
      'ISFJ',
      'ISTP',
      'ISTJ',
    ];

    // 입력한 MBTI가 맞는 유형인지?
    return mbtiTypes.includes(mbti.toUpperCase());
  };

  // cancelEdit : 수정중이 아니게 되므로 editingMbti = false
  const cancelEdit = () => {
    setEditingMbti(false);
  };

  // 프로필 사진 수정
  const changeImage = e => {
    const file = e.target.files[0]; // 선택된 파일 가져옴
    const reader = new FileReader();

    reader.onloadend = () => {
      // 파일 작업이 완료되면
      setProfileImage(reader.result); // reder.result : 파일 데이터 URL(바꿀 이미지)
    };

    if (file) {
      // 선택된 파일이 있을 경우에만 수행
      reader.readAsDataURL(file); // 파일 내용을 읽고 URL로 변환, 뭔지 잘 모름
    }
  };

  // 알림창
  const notify = () => toast.error('toastify test!');

  return (
    <>
      <h1>my page</h1>

      <div className={styles.container}>
        <>
          <ToastContainer
            position='top-right' // 알람 위치 지정
            autoClose={2000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss={false} // 화면을 벗어나면 알람 정지
            draggable // 드래그 가능
            pauseOnHover // 마우스를 올리면 알람 정지
            theme='light'
            // limit={1} // 알람 개수 제한
          />
        </>

        <div className={styles.picture}>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={fileInputRef} // img를 클릭하면 대신해서 input이 클릭됨
            onChange={changeImage}
            accept='image/*'
          />

          <div
            className={styles.profileWrapper}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <img
              className={styles.profile}
              src={profileImage || '/resources/images/unnamed.jpg'} // profileImage가 null이면 기본이미지가 나옴
              onClick={() => fileInputRef.current.click()}
              alt='프로필 사진'
            />
            {/* unnamed.jpg는 임시 샘플파일임 */}

            {hovering && ( // 이미지 위에 마우스가 올라가면 수정하기 글씨가 나옴
              <div className={styles.editText} onClick={() => fileInputRef.current.click()}>
                업로드
              </div>
            )}
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <h4>아이디</h4>
          </div>
          <span className={styles.idInfo}>
            {/* *** 추후 변경 *** */}
            {info[1].username}
          </span>
        </div>
        <div className={styles.info}>
          {editingMbti ? (
            <>
              {/* 수정중일 때 */}
              <input type='text' value={newMbti} onChange={e => setNewMbti(e.target.value)} />
              <Button variant='success' onClick={confirmEdit}>
                확인
              </Button>
              <Button variant='outline-success' onClick={cancelEdit}>
                취소
              </Button>
            </>
          ) : (
            <>
              {/* 수정중이 아닐 때(기본상태) */}
              <div className={styles.mbtiHeader}>
                <h4>MBTI</h4>
              </div>
              <span className={styles.mbtiInfo}>
                {/* *** 추후 변경 *** */}
                {info[1].mbti.toUpperCase()}
              </span>
              <span>
                <Button variant='outline-success' onClick={idEditingNow}>
                  수정
                </Button>
              </span>
            </>
          )}
        </div>
        <div className={styles.info}>
          <div>
            <h4>성별</h4>
          </div>
          <span className={styles.genderInfo}>
            {/* *** 추후 변경 *** */}
            {info[1].gender === 'male' ? '남자' : '여자'}
          </span>
        </div>
      </div>
    </>
  );
};

export default MyPage;
