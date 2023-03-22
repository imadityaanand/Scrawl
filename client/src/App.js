import './App.css';
import {Route, Routes} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginSignupPage/LoginPage';
import SignupPage from './components/LoginSignupPage/SignupPage';
import UploadNotes from './components/CreatePostPage/UploadNotes';
import HomePage from './components/HomePage/HomePage';
import ViewPage from './components/PdfNotes/ViewPage';
import RequestsPage from './components/RequestsPage/RequestsPage';
import NotificationsPage from './components/NotificationsPage/NotificationsPage';
import SavedPage from './components/SavedPage/SavedPage';
import LikedPage from './components/LikedPage/LikedPage';
import { useEffect } from 'react';

function App() {

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: ", response.credential);
  }

  // useEffect(() => {
  //   // Global Google
  //   google.accounts.id.initialize({
  //     client_id: process.env.REACT_APP_CLIENT_ID,
  //     callback: handleCallbackResponse
  //   })
  // })

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/createpost' element={<UploadNotes />} />
      <Route path='/requests' element={<RequestsPage />} />
      <Route path='/notifications' element={<NotificationsPage />} />
      <Route path='/saved' element={<SavedPage />} />
      <Route path='/liked' element={<LikedPage />} />
      <Route path='/pdf/:id' element={<ViewPage />} />
    </Routes>
  );
}

export default App;
