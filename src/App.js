import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import MockData from './components/MockData.json';
import Main from './pages/Main';
import New from './pages/New';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Layout from './components/Layout';
import MyPage from './pages/MyPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditMyPage from './pages/EditMyPage';
import { getReviewList } from './api/reviewApi';

export const ReviewStateContext = createContext();
export const ReviewSetStateContext = createContext();

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getReviewList()
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //레이아웃을 최상단으로 빼고 나머지 페이지를 밑으로 변경
  return (
    <ReviewStateContext.Provider value={data}>
      <ReviewSetStateContext.Provider value={setData}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/mypage/:id" element={<MyPage />} />
            <Route path="/mypage/edit/:id" element={<EditMyPage />} />
          </Route>
        </Routes>
      </ReviewSetStateContext.Provider>
    </ReviewStateContext.Provider>
  );
}

export default App;
