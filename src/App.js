import './App.css';
import { Routes, Route } from 'react-router-dom';
import { createContext, useRef, useState } from 'react';
import MockData from './components/MockData';
import Main from './pages/Main';
import New from './pages/New';
import Detail from './pages/Detail';
import Edit from './pages/Edit';

export const ReviewStateContext = createContext();

function App() {
  const [data, setData] = useState(MockData);
  const idRef = useRef(5);
  return (
    <>
      <h1>app</h1>

      {/*context는 여러번 거쳐서 말고 전역적으로 데이터 공급 가능
      data는 아래 페이지에서 전부 사용 가능*/}
      <ReviewStateContext.Provider value={data}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </ReviewStateContext.Provider>
    </>
  );
}

export default App;
