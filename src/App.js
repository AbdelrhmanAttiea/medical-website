// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './Views/Users';
import Home from './Views/Home';
import About_us from './Views/About_us';
import Contact_us from './Views/Contact_us';
import Login_page from './Views/Login_page';
import Sign_up from './Views/Sign_up';
import Register_page from './Views/Register_page';
import Page_notfound from './Views/Page_notfound';
import Profile_view from './Views/Profile_view';
import Friend_list from './Views/Friend_list';
import Chat from './Views/Chat';
import Chat_list from './Views/Chat_list';
import FriendRequestsPage from './Views/FriendRequestsPage';
import Hero_section from './component/Hero_section';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'animate.css';
import 'remixicon/fonts/remixicon.css';
const App = () => {
  return (

    
    <Router>
      <div>
        {/* Your other components or layout */}
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/home" element={<Home/>}/>
          <Route path='/about' element ={<About_us/>} />
          <Route path='/contact' element ={<Contact_us/>} />
          <Route path='/login' element ={<Login_page/>} />
          <Route path='/sign_up' element ={<Sign_up/>} />
		  <Route path='/register' element ={<Register_page/>} />
          <Route path='/profile_view/:id' element ={<Profile_view/>} />
          <Route path='/friends' element ={<Friend_list/>} />
          <Route path='/chat/:id' element ={<Chat/>} />
          <Route path='/chat_list/:id' element ={<Chat_list/>} />
          <Route path='/' Component ={Hero_section} />
		   <Route path='/friendrequests' element ={<FriendRequestsPage/>} />
          <Route path='*' element ={<Page_notfound/>} />
          {/* Add more routes for other pages */}
        </Routes>
      </div>
  
    </Router>

    
  );
};

export default App;
