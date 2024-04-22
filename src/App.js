import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import New from './pages/New';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<Layout />} />
        <Route path='/' element={<Main />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/new' element={<New />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
