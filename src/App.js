import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import FindPwd from './pages/FindPwd';
import Main from './pages/Main';
import History from './pages/History';
import Position from './pages/Position';
import Goodin from './pages/Goodin';
import Warehousing from './pages/Warehousing';
import Inventory from './pages/Inventory';
import Release from './pages/Release';
import Salelist from './pages/Salelist';
import Myshop from './pages/Myshop';
import Register from './pages/Register';
import View from './pages/View';
import Store from './pages/Store';
import SearchList from './pages/SearchList';
import Sort from './pages/Sort';
import Storageproduct from './pages/Storageproduct';
import ViewManager from './pages/ViewManager';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/find' element={<FindPwd/>}/>
        <Route path='/Main' element={<Main/>}/>
        <Route path='/set_position' element={<Position/>}/>
        <Route path='/view_position' element={<Storageproduct/>}/>
        <Route path='/history' element={<History />}/>
        <Route path='/warehousing' element={<Warehousing />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/view' element={<View />}/>
        <Route path='/store' element={<Store />}/>
        <Route path='/inventory' element={<Inventory />}/>
        <Route path='/release' element={<Release />}/>
        <Route path='/salelist' element={<Salelist />}/>
        <Route path='/myshop' element={<Myshop />}/>
        <Route path='/searchlist' element={<SearchList />}/>
        <Route path='/sort' element={<Sort />}/>
        <Route path='/view_manager' element={<ViewManager />} />
      </Routes>
    </>
  );
}

export default App;
