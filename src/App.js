import './App.css';
import { Routes, Route } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import Main from './pages/Main';
import NewReview from './pages/review/NewReview';
import ReviewDetail from './pages/review/ReviewDetail';
import EditReview from './pages/review/EditReview';
import Layout from './components/Layout';
import MyPage from './pages/member/MyPage';
import SignIn from './pages/member/SignIn';
import SignUp from './pages/member/SignUp';
import EditMyPage from './pages/member/EditMyPage';
import { getReviewList } from './api/reviewApi';
import MyReviews from './pages/review/MyReviews';
import MyReviewDetail from './pages/review/MyReviewDetail';

export const ReviewStateContext = createContext();
export const ReviewSetStateContext = createContext();

function App() {
  const [data, setData] = useState([]);

  //리뷰 목록 불러와서 context로.
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
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/mypage/edit/:id" element={<EditMyPage />} />
            <Route path="/new" element={<NewReview />} />
            <Route path="/detail/:id" element={<ReviewDetail />} />
            <Route path="/myreviewlist/:id" element={<MyReviews />} />
            <Route path="/myreviewdetail/:id" element={<MyReviewDetail />} />
            <Route path="/edit/:id" element={<EditReview />} />
          </Route>
        </Routes>
      </ReviewSetStateContext.Provider>
    </ReviewStateContext.Provider>
  );
}

export default App;
