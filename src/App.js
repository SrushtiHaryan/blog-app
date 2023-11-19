import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import BlogModal from './components/CreateBlog/CreateModal';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    
    <Router>
    <main>
    <div className="App">
    <Navbar></Navbar>
      

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<BlogModal/>}/>
        {/* <Route path='/checkout' element={<CheckoutPage/>}/> */}
      </Routes>
      
    </div>
    
     

      
      
    </main>
    </Router>
  );
}

export default App;
