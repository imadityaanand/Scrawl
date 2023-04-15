import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import jwt_decode from 'jwt-decode';
import './LoginPage.css';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useSignup();
  const navigate = useNavigate();

  async function HandleSubmit(e) {
    e.preventDefault();
    
    await signup(name, email, password);
  }

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: ", response.credential);
  //   const userObject = jwt_decode(response.credential);
  //   console.log(userObject);

  //   if(userObject) {
  //     setGoogleUser(userObject);
  //     localStorage.setItem('user', JSON.stringify(userObject));
  //     navigate('/home');
  //   }
  // }
  async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: ", response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);

    if(userObject) {
      const googleId = userObject.sub;
      const { name, email, picture } = userObject;
      const token = response.credential;


      const res = await fetch(process.env.REACT_APP_SERVER + 'api/user/googlesignin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, picture, googleId, token})
      });

      const json = await res.json();

      localStorage.setItem('user', JSON.stringify(json));

      if(!res) {
        console.log("User data not sent to MongoDB");
        console.log(json.error);
      } else {
        console.log("User data saved successfully");
      }
      
      navigate('/home');
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse
    })


    google.accounts.id.renderButton(
      document.getElementById('google-signin'),
      {
        theme: 'none',
        size: 'medium'
      }
    );
  }, [])

  return (
    <div className='login'>
      <Link to='/' style={{ color: 'black' }}>
        <div className='logo'>
            <img src='../../../assets/logo2-black.svg' alt='logo' />
        </div>
      </Link>

      <div className='login-container'>
        <h1>Sign Up</h1>
        {/* <form action="http://localhost:4000/signup" method='POST'> */}
        <form onSubmit={HandleSubmit}>
            <p>Name*</p>
            <input placeholder='Name' name='name' value={name} onChange={(e) => {setName(e.target.value)}} />
            <p>Email*</p>
            <input placeholder='mail@website.com' name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <p>Password*</p>
            <input placeholder='Password' type='password' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />

            <button className='loginpage-btn' type='submit' disabled={isLoading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}
            <div className='or-div'>
                <div className='line'></div>
                or Sign In with Google
                <div className='line'></div>
            </div>
        </form>
        <form>
            <button className='loginpage-btn google' id='google-signin' type='submit'>
                <img src='../../../assets/googlelogo.svg' alt='google'/>
                Sign Up with Google
            </button>

            <p>Already have an account? <Link to='/login' style={{color: '#055FFC'}}>Log In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
