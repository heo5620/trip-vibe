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
import { checkLoginStatus } from './api/memberApi';
import MyReviewList from './pages/MyReviewList';
import MyReviewDetail from './pages/MyReviewDetail';

export const ReviewStateContext = createContext();
export const ReviewSetStateContext = createContext();
// export const IsLoggedInContext = createContext(); // isLoggedIn 상태를 위한 Context 생성
// export const SetIsLoggedInContext = createContext();

function App() {
  const [data, setData] = useState([]);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  //리뷰 목록 불러와서 context로.
  useEffect(() => {
    getReviewList()
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.log(error));
  }, []);

  //레이아웃을 최상단으로 빼고 나머지 페이지를 밑으로 변경
  return (
    <ReviewStateContext.Provider value={data}>
      <ReviewSetStateContext.Provider value={setData}>
        {/* <IsLoggedInContext.Provider value={isLoggedIn}>
          <SetIsLoggedInContext.Provider value={setIsLoggedIn}> */}
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Main />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/new' element={<New />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/mypage/*' element={<MyPage />} />
            <Route path='/mypage/edit/:id' element={<EditMyPage />} />
            <Route path='/myreviewlist/:id' element={<MyReviewList />} />
            <Route path='/myreviewdetail/:id' element={<MyReviewDetail />} />
          </Route>
        </Routes>
        {/* </SetIsLoggedInContext.Provider>
        </IsLoggedInContext.Provider> */}
      </ReviewSetStateContext.Provider>
    </ReviewStateContext.Provider>
  );
}

export default App;
