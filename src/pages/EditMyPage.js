import { ReviewStateContext, ReviewSetStateContext } from '../App';
import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from './styles/EditMyPage.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { getMemberOne } from '../api/memberApi';
import { useParams } from 'react-router-dom';
import { editMember } from '../api/memberApi';



const EditMyPage = () =>{
  const [hovering, setHovering] = useState(false);
  const data = useContext(ReviewStateContext);
  const setData = useContext(ReviewSetStateContext); 
  const { id } = useParams();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };
 
    
//수정할 수 있는 pw,email,gender,mbti,...
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [gender, setGender] = useState('');
const [mbti, setMbti] = useState('');


//에러 관리
const [passwordError, setPasswordError] = useState('');
const [emailError, setEmailError] = useState('');
const [phoneError, setPhoneError] = useState('');
const [genderError, setGenderError] = useState('');
const [mbtiError, setMbtiError] = useState('');
 

//회원 1명 조회
  const [memberInfo, setMemberInfo] = useState([]);
      useEffect(() => {
        getMemberOne(id).then((data) => {
          setMemberInfo(data); 
          console.log(data);
        });
      }, [id]);



const handleEditMyPage = (e) => {
    e.preventDefault(); 

    if (
        validatePassword(password) &&
        validateEmail(email) &&
        validatePhone(phone) &&
        validateGender(gender) &&
        validateMbti(mbti)
    ) {
        
          const editMemberData = {
            pw: password,
            email: email,
            phone: phone,
            gender: gender,
            mbti: mbti,
          };
          console.log(editMemberData);

          const formData = new FormData();
          formData.append('member', JSON.stringify(editMemberData));
          editMember(id, formData) 
          .catch((error) => {
            console.log(error);
          });
          
        Swal.fire({
            icon: 'success',
            title: '회원정보수정이 완료되었습니다!',
            text: '메인 페이지로 이동합니다.',
            showCancelButton: false,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((res) => {
            if (res.isConfirmed) {   
            navigate('/');
            console.log('회원정보수정 성공');
            }
        });
    
  }
};

//정보수정 유효성 검사
//비밀번호 유효성 검사
const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const isValid = validatePassword(e.target.value);
    if (!isValid) {
      setPasswordError(
        '비밀번호는 영문 소문자, 숫자, 특수문자(@, !, _)를 포함하여 8~20자로만 입력해주세요.'
      );
    } else {
      setPasswordError('');
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@!_])[a-z\d@!_]{8,20}$/;
    return regex.test(password);
  };


  // 이메일 유효성 검사
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const isValid = validateEmail(e.target.value);
    if (!isValid) {
      setEmailError('올바른 이메일 주소를 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };


  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    validatePhone(e.target.value);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{3}-\d{4}-\d{4}$/;
    if (!regex.test(phone)) {
      setPhoneError('전화번호는 010-xxxx-xxxx 형식으로 입력하세요.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  //성별 유효성 검사
  const validateGender = (gender) => {
    if (gender === '') {
      setGenderError('성별을 선택해주세요.');
      return false;
    }
    setGenderError('');
    return true;
  };

  //mbti 유효성 검사
  const validateMbti = (mbti) => {
    const mbtiTypes = [
        'ENFP', 'ENFJ', 'ENTP', 'ENTJ',
        'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
        'INFP', 'INFJ', 'INTP', 'INTJ',
        'ISFP', 'ISFJ', 'ISTP', 'ISTJ',
    ];

    if (mbti === '') {
        setMbtiError('MBTI를 입력해주세요.');
        return false;
    }

    if (mbti.length !== 4 || !mbtiTypes.includes(mbti.toUpperCase())) {
        setMbtiError('유효한 MBTI를 입력해주세요.');
        return false;
    }

    setMbtiError('');
    return true;
  };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };


  return (
      <div className={styles.editContainer}>
        <div className={styles.editContent}>
          <h1 className={styles.BodyTopText}>🔐My Page</h1>
        
        
        {/*로그인 한 user id 표시 div  */}
        {/* 수정할 수 있는 데이터 input div 시작 */}
        <div >
            
                <input className={styles.inputField}
                    placeholder="수정할 비밀번호를 입력하세요"
                    type = "password"
                    defaultValue={memberInfo.pw}
                    onChange={handlePasswordChange}
                    required
                />
                <div>{passwordError}</div>

                <input className={styles.inputField}
                    placeholder="변경할 이메일을 입력하세요"
                    type = "text"
                    defaultValue={memberInfo.email}
                    onChange={handleEmailChange}
                    required
                />
                <div>{emailError}</div>

                <input className={styles.inputField}
                    placeholder="변경할 전화번호를 입력하세요"
                    type="text"
                    defaultValue={memberInfo.phone}
                    onChange={handlePhoneChange}
                    required
                />
                <div>{phoneError}</div>

                <input className={styles.inputField}
                placeholder="변경할 성별을 입력하세요"
                type="text"
                defaultValue={memberInfo.gender}
                onChange={handleGenderChange}
                required
                />
                <div>{genderError}</div>

                <input className={styles.inputField}
                    placeholder="변경할 MBTI를 입력하세요"
                    type="text"
                    defaultValue={memberInfo.mbti}
                    onChange={(e) => setMbti(e.target.value)}
                    required
                />
                <div>{mbtiError}</div>
                {/* 수정 완료 버튼 */}
                <Button onClick={handleEditMyPage} className={styles.editButton}>수정 완료</Button>
                <Button className={styles.cancelButton} onClick={handleCancel}>뒤로 가기</Button>

            
        </div> 
        {/* 수정할 수 있는 데이터 input div 끝 */}
    
      </div>
      {/* content의 끝 */}
      </div>
      /* container의 끝 */
 
  );
};



export default EditMyPage;
