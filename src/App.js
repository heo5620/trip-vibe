import './App.css';
import { Routes, Route } from 'react-router-dom';
import { createContext, useRef, useState } from 'react';
import MockData from './components/MockData';
//import Dummy from './components/MockData copy.json';
import Main from './pages/Main';
import New from './pages/New';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Layout from './components/Layout';
import MyPage from './pages/MyPage';
import SignIn from './pages/SignIn';

export const ReviewStateContext = createContext();
export const ReviewSetStateContext = createContext();

function App() {
  const [data, setData] = useState(MockData);
  //const [dummy, setDummy] = useState(Dummy);
  const idRef = useRef(5);
  //레이아웃을 최상단으로 빼고 나머지 페이지를 밑으로 변경
  return (
    <ReviewStateContext.Provider value={data}>
      <ReviewSetStateContext.Provider value={setData}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </ReviewSetStateContext.Provider>
    </ReviewStateContext.Provider>
  );
}

export default App;
