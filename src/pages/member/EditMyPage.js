import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMemberFromSession, editMember } from '../../api/memberApi';
import Button from 'react-bootstrap/Button';
import styles from '../styles/EditMyPage.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const EditMyPage = () => {
  const [hovering, setHovering] = useState(false);
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
  const [previewImg, setPreviewImg] = useState(null);
  const fileInputRef = useRef(null);
  const [newImg, setNewImg] = useState(null);

  //에러 관리
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [mbtiError, setMbtiError] = useState('');

  //회원 1명 조회
  const [memberInfo, setMemberInfo] = useState([]);

  useEffect(() => {
    getMemberFromSession().then(data => {
      setMemberInfo(data);
      setPassword(data.pw);
      setEmail(data.email);
      setPhone(data.phone);
      setGender(data.gender);
      setMbti(data.mbti);
      console.log(data);
    });
  }, [id]);

  //새 이미지 저장
  const handleImg = e => {
    const file = e.target.files[0];
    setNewImg(file);

    const reader = new FileReader();
    reader.readAsDataURL(file); //파일 데이터를 url로 바꿔서 저장

    reader.onload = () => {
      //파일을 성공적으로 읽어오면
      setPreviewImg(reader.result); //preview에 저장
    };
  };

  //회원 정보 수정
  const handleEditMyPage = e => {
    e.preventDefault();

    if (
      //유효성 검사
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
      formData.append('img', newImg);

      editMember(id, formData).catch(error => {
        //회원 정보 수정 api 호출
        console.log(error);
      });

      Swal.fire({
        icon: 'success',
        title: '회원정보수정이 완료되었습니다!',
        text: '마이 페이지로 이동합니다.',
        showCancelButton: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(res => {
        if (res.isConfirmed) {
          navigate(`/mypage/${id}`);
          console.log('회원정보수정 성공');
        }
      });
    }
  };

  //정보수정 유효성 검사
  //비밀번호 유효성 검사
  const handlePasswordChange = e => {
    setPassword(e.target.value);
    const isValid = validatePassword(e.target.value);
    if (!isValid) {
      setPasswordError('소문자, 숫자, 특수문자(@, !, _)를 포함하여 8~20자로 입력하세요');
    } else {
      setPasswordError('');
    }
  };

  const validatePassword = password => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@!_])[a-z\d@!_]{8,20}$/;
    return regex.test(password);
  };

  // 이메일 유효성 검사
  const handleEmailChange = e => {
    setEmail(e.target.value);
    const isValid = validateEmail(e.target.value);
    if (!isValid) {
      setEmailError('올바른 이메일 주소를 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const validateEmail = email => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handlePhoneChange = e => {
    setPhone(e.target.value);
    validatePhone(e.target.value);
  };

  const validatePhone = phone => {
    const regex = /^\d{3}-\d{4}-\d{4}$/;
    if (!regex.test(phone)) {
      setPhoneError('전화번호는 010-xxxx-xxxx 형식으로 입력하세요.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  //성별 유효성 검사
  const validateGender = gender => {
    if (gender === '') {
      setGenderError('성별을 선택해주세요.');
      return false;
    }
    setGenderError('');
    return true;
  };

  //mbti 유효성 검사
  const validateMbti = mbti => {
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

  const handleGenderChange = e => {
    setGender(e.target.value);
  };

  return (
    <div className={styles.editContainer}>
      <div className={styles.editContent}>
        <h1 className={styles.BodyTopText}>🔐My Page</h1>
        <div className={styles.edit_img_content}>
          <div className={styles.myPicture}>
            <input
              type='file'
              id='imageUpload'
              name='img'
              style={{ display: 'none' }}
              ref={fileInputRef}
              accept='image/*'
              onChange={handleImg}
            />
            <div
              className={styles.edit_img_wrapper}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <img
                className={styles.profile}
                src={previewImg || 'http://localhost:8080/image/' + memberInfo.imgName}
                alt='이미지'
                onClick={() => fileInputRef.current.click()}
                width='400'
                height='400'
              />
              {hovering && (
                <div className={styles.edit_img_editText} onClick={() => fileInputRef.current.click()}>
                  사진 수정
                </div>
              )}
            </div>
          </div>
        </div>

        <table className={styles.info_edit_table}>
          <tbody>
            <tr>
              <td>비밀번호</td>
              <td>
                <input
                  className={styles.inputField}
                  placeholder='수정할 비밀번호를 입력하세요'
                  type='password'
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <div>{passwordError}</div>
              </td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>
                <input
                  className={styles.inputField}
                  placeholder='변경할 이메일을 입력하세요'
                  type='text'
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <div>{emailError}</div>
              </td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
                <input
                  className={styles.inputField}
                  placeholder='변경할 전화번호를 입력하세요'
                  type='text'
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
                <div>{phoneError}</div>
              </td>
            </tr>
            <tr>
              <td>성별</td>
              <td>
                <div className={styles.radioContainer}>
                  <label>
                    <input
                      type='radio'
                      name='gender'
                      checked={gender === 'male'}
                      value='male'
                      onChange={handleGenderChange}
                    />
                    male
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='gender'
                      checked={gender === 'female'}
                      value='female'
                      onChange={handleGenderChange}
                    />
                    female
                  </label>
                </div>

                <div>{genderError}</div>
              </td>
            </tr>
            <tr>
              <td>MBTI</td>
              <td>
                <input
                  className={styles.inputField}
                  placeholder='변경할 MBTI를 입력하세요'
                  type='text'
                  value={mbti}
                  onChange={e => setMbti(e.target.value)}
                  required
                />
                <div>{mbtiError}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <Button onClick={handleEditMyPage} className={styles.editButton}>
          수정 완료
        </Button>
        <Button className={styles.cancelButton} onClick={handleCancel}>
          뒤로 가기
        </Button>
      </div>
    </div>
  );
};

export default EditMyPage;
