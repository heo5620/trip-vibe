import { useState } from 'react';
import MockData from '../components/MockData';
import './mypage.css';

const MyPage = () => {

  const [info] = useState(MockData);

  return (
    <div className="container">
      <div className="profile-picture">
        <img className="profile" src={require('./../assets/image/unnamed.jpg')} alt="프로필 사진" />
        {/* unnamed.jpg는 임시파일 */}
      </div>
      <div className="info">
        {info[1].username}
      </div>
      <div className="info">
        {info[1].mbti}
      </div>
      <div className="info">
      {info[1].gender}
      </div>
    </div>
  );
};

export default MyPage;