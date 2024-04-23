import { useState } from 'react';
import MockData from '../components/MockData';
import styles from './styles/Mypage.module.css';

const MyPage = () => {
  const [info, setInfo] = useState(MockData);
  
  // editingMbti : MBTI를 수정중인지 여부. 수정중 = true, 아닐때 = false
  const [editingMbti, setEditingMbti] = useState(false);

  // newMbti : 수정된 MBTI값 임시저장
  const [newMbti, setNewMbti] = useState('');

  // idEditingNow : 수정버튼을 누르면 수정중이니까 editingMbti를 true로 설정
  const idEditingNow = () => {
    setEditingMbti(true);
  };

  // confirmEdit : MBTI 수정 후 확인 누를 때 호출
  const confirmEdit = () => {
    setEditingMbti(false); // 수정중이 아니므로 false
    setInfo(copiedInfo => ({...copiedInfo, // 이전 정보를 copiedInfo로 복사(원본유지)
      [1]: {...copiedInfo[1], // 이전 정보가 1인 항목 복사. *** 추후 변경 ***
      mbti: newMbti.toUpperCase} // mbti를 newMbti(수정된 MBTI)로 변경
    }));
  };

  // cancelEdit : 수정중이 아니게 되므로 editingMbti = false
  const cancelEdit = () => {
    setEditingMbti(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.picture}>
        <img className={styles.profile} src={require('./../assets/image/unnamed.jpg')} alt="프로필 사진" />
        {/* unnamed.jpg는 임시 샘플파일임 */}
      </div>
      <div className={styles.info}>
        {info[1].username}
      </div>
      <div className={styles.info}>
        {editingMbti ? (
          <>
          {/* 수정중일 때 */}
            <input
              type="text"
              value={newMbti}
              onChange={e => setNewMbti(e.target.value)}
            />
            <button onClick={confirmEdit}>확인</button>
            <button onClick={cancelEdit}>취소</button>
          </>
        ) : (
          <>
          {/* 수정중이 아닐 때(기본상태) */}
            {info[1].mbti.toUpperCase()}
            <button onClick={idEditingNow}>수정</button>
          </>
        )}
      </div>
      <div className={styles.info}>
        {info[1].gender === 'male' ? '남자' : '여자'}
      </div>
    </div>
  );
};

export default MyPage;
