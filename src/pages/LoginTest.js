import axios from 'axios';
import React, { useState } from 'react';
import { signIn } from '../api/memberApi';

const LoginTest = () => {
  // const [credentials, setCredentials] = useState({
  //   memberId: '',
  //   pw: '',
  // });

  const [memberId, setMemberId] = useState('');
  const [pw, setPw] = useState('');

  const handleMemberId = (e) => {
    setMemberId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  // const handleChange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(memberId);
    console.log(pw);

    signIn(memberId, pw)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input type="text" value={memberId} onChange={handleMemberId} />
        </div>
        <div>
          <input type="password" value={pw} onChange={handlePw} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginTest;
