import { ReviewStateContext, ReviewSetStateContext } from '../App';
import { useRef, useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import styles from './styles/Mypage.module.css';
import 'react-toastify/dist/ReactToastify.css';

const MyPage = () => {
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext);

  // MBTI를 수정중인지 여부.
  const [editingMbti, setEditingMbti] = useState(false);

  //수정된 MBTI값 임시저장
  const [newMbti, setNewMbti] = useState('');

  //사용자 프로필 이미지
  const [profileImage, setProfileImage] = useState(null);

  // 파일 업로드 input 요소 참조
  const fileInputRef = useRef(null);

  //프로필 이미지 위에 마우스 호버링
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
      toast.warning('올바른 MBTI를 입력하세요', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setEditingMbti(false); // 수정중이 아니므로 false
    setData((data) => ({
      ...data, // 이전 정보를 copiedInfo로 복사(원본유지)
      user: data.user.map((item, index) =>
        index === 1 ? { ...item, mbti: newMbti } : item
      ), // mbti를 newMbti(수정된 MBTI)로 변경
    }));
  };

  // MBTI 제대로 썼는지 검사
  const isValidMbti = (mbti) => {
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

  // cancelEdit : MBTI 수정중이 아니게 되므로 editingMbti = false
  const cancelEdit = () => {
    setEditingMbti(false);
  };

  // 프로필 사진 수정
  const changeImage = (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져옴
    const reader = new FileReader(); // FileReader 객체 생성, 파일을 URL로 읽어옴

    reader.onloadend = () => {
      // 파일 작업이 완료되면
      setProfileImage(reader.result); // reder.result : 파일 데이터 URL(바꿀 이미지)
    };

    if (file) {
      // 선택된 파일이 있을 경우에만 수행
      reader.readAsDataURL(file); // 파일 내용을 읽고 URL로 변환, 뭔지 잘 모름
    }
  };

  return (
    <>
      <div className={styles.container}>
        <>
          <ToastContainer
            position="top-right" // 알람 위치 지정
            autoClose={2000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss={false} // 화면을 벗어나면 알람 정지
            draggable // 드래그 가능
            pauseOnHover // 마우스를 올리면 알람 정지
            theme="light"
          />
        </>
        <div className={styles.picture}>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef} // img를 클릭하면 대신해서 input이 클릭됨
            onChange={changeImage}
            accept="image/*" // 모든 이미지 파일 허용. 유저가 이미지파일만 선택할 수 있도록 함
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
              alt="프로필 사진"
            />
            {/* unnamed.jpg는 임시 샘플파일임 */}

            {hovering && ( // 이미지 위에 마우스가 올라가면 수정하기 글씨가 나옴
              <div
                className={styles.editText}
                onClick={() => fileInputRef.current.click()}
              >
                업로드
              </div>
            )}
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <div className={styles.idbox}>
              <h4>ID</h4>
              {/* *** 추후 변경 *** */}
              {data.user[1].username}
            </div>
          </div>
          <div className={styles.info}>
            {editingMbti ? (
              <>
                {/* 수정중일 때 */}
                <input
                  type="text"
                  value={newMbti}
                  onChange={(e) => setNewMbti(e.target.value)}
                />
                <Button variant="success" onClick={confirmEdit}>
                  확인
                </Button>
                <Button variant="outline-success" onClick={cancelEdit}>
                  취소
                </Button>
              </>
            ) : (
              <>
                {/* 수정중이 아닐 때(기본상태) */}
                <div className={styles.mbtibox}>
                  <div className={styles.mbtitextbox}>
                    <h4>MBTI</h4>
                    {/* *** 추후 변경 *** */}
                    {data.user[1].mbti.toUpperCase()}
                  </div>
                  <Button variant="outline-success" onClick={idEditingNow}>
                    수정
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className={styles.info}>
            <div className={styles.genderbox}>
              <h4>GENDER</h4>

              {/* *** 추후 변경 *** */}
              {data.user[1].gender === 'male' ? '남자' : '여자'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
