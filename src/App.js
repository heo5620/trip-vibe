import './App.css';
import { Routes, Route } from 'react-router-dom';
import { createContext, useRef, useState } from 'react';
import MockData from './components/MockData';
import Main from './pages/Main';
import New from './pages/New';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Layout from './components/Layout';

export const ReviewStateContext = createContext();

function App() {
  const [data, setData] = useState(MockData);
  const idRef = useRef(5);
  return (
    <>
      <ReviewStateContext.Provider value={data}>
        <Routes>
          <Route path='/' element={<Layout />} />
          <Route path='' element={<Main />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </ReviewStateContext.Provider>
    </>
  );
}

export default App;
