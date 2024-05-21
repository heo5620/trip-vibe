import { ReviewStateContext, ReviewSetStateContext } from '../App';
import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from './styles/EditMyPage.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { getMemberOne } from '../api/memberApi';
import { useParams } from 'react-router-dom';



const EditMyPage = () =>{

const navigate = useNavigate();

const { id } = useParams();
const [memberInfo, setMemberInfo] = useState([]);
  //회원 1명 조회
    useEffect(() => {
      getMemberOne(id).then((data) => {
        setMemberInfo(data);
        console.log(data);
      });
    }, [id]);
    

    
const data = useContext(ReviewStateContext);
const setData = useContext(ReviewSetStateContext); 

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



const handleEditMyPage = (e) => {
    e.preventDefault(); 

    if (
        validatePassword(password) &&
        validateEmail(email) &&
        validatePhone(phone) &&
        validateGender(gender) &&
        validateMbti(mbti)
    ) {
        
        Swal.fire({
            icon: 'success',
            title: '회원정보수정이 완료되었습니다!',
            text: '메인 페이지로 이동합니다.',
            showCancelButton: false,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((res) => {
            
            if (res.isConfirmed) {
                const member = {
                    pw: password,
                    email: email,
                    phone: phone,
                    gender: gender,
                    mbti: mbti,
                };

            
            navigate('/');
            console.log('회원가입 성공');
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


  //사용자 프로필 수정
  const [profileImage, setProfileImage] = useState(null);

  const fileInputRef = useRef(null);

  const [hovering, setHovering] = useState(false);


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
          <h1 className={styles.headerText}>🔐My Profile</h1>
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
        <>
        {/*로그인 한 user id 표시 div  */}
        </>
        <>
        {/* 수정할 수 있는 데이터 input div 시작 */}
        </>
        
        <div className={styles.content}>
            <form onSubmit={handleEditMyPage}>
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
                <Button type='submit' className={styles.editButton}>수정 완료</Button>
            </form>
        </div> 
        {/* input div 끝 */}
    
      </div>
    </>
  );
};



export default EditMyPage;
