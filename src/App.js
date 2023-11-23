import { useState } from 'react';
import './App.css';
import './style.scss';
import './media-query.css';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { Roles } from './pages/Roles';
import AddEditCrud from './pages/AddEditCrud';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  const  [active, setActive] = useState("home");

  return (
    <div className="App">
      <Navbar setActive={setActive} active={active}/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/roles' element={<Roles/>}/>
        <Route path='/create' element={<AddEditCrud/>}/>
        <Route path='/update/:id' element={<AddEditCrud/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
