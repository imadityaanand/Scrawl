import './App.css';
import {Route, Routes} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginSignupPage/LoginPage';
import SignupPage from './components/LoginSignupPage/SignupPage';
import UploadNotes from './components/CreatePostPage/UploadNotes';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/createpost' element={<UploadNotes />} />
    </Routes>
  );
}

export default App;
