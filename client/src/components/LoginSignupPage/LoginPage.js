import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();

  const [googleUserData, setGoogleUserData] = useState(null);
  const [token, setToken] = useState(null);

  async function HandleSubmit(e) {
    e.preventDefault();

    await login(email, password);
  }

  async function HandleGoogleLogin(e) {
    e.preventDefault();

    try {
      const { data } = await axios.get('http://localhost:4000/auth/google', {
        headers: {
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      });
      setGoogleUserData(data);
      setToken(data.token);
      console.log(data);
    } catch(err) {
      console.error(err);
    }   
  }

  return (
    <div className='login'>
      <Link to='/' style={{ color: 'black' }}>
        <div className='logo'>
          <img src='../../../assets/logo2-black.svg' alt='logo' />
        </div>
      </Link>

      <div className='login-container'>
        <h1>Log In</h1>
        {/* <form action="http://localhost:4000/login" method='POST'> */}
        <form onSubmit={HandleSubmit}>
            <p>Email*</p>
            <input placeholder='mail@website.com' name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <p>Password*</p>
            <input placeholder='Password' type='password' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />

            <button className='loginpage-btn' type='submit' disabled={isLoading}>Log In</button>
            {error && <div className='error'>{error}</div>}
            <div className='or-div'>
                <div className='line'></div>
                or Log In with Google
                <div className='line'></div>
            </div>
        </form>
        {/* <form action="http://localhost:4000/auth/google"> */}
        <form onSubmit={HandleGoogleLogin}>
            <button className='loginpage-btn google' type='submit'>
                <img src='../../../assets/googlelogo.svg' alt='google'/>
                Log In with Google
            </button>

            <p>Don't have an account? <Link to='/signup' style={{color: '#055FFC'}}>Sign Up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
