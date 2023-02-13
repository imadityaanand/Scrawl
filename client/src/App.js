import './App.css';
import {Route, Routes} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginSignupPage/LoginPage';
import SignupPage from './components/LoginSignupPage/SignupPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<h1>Home</h1>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  );
}

export default App;
