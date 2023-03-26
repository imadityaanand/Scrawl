import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import jwt_decode from 'jwt-decode';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();
  const [googleUser, setGoogleUser] = useState({});
  const navigate = useNavigate();

  async function HandleSubmit(e) {
    e.preventDefault();

    await login(email, password);
  }

  // async function HandleGoogleLogin(e) {
  //   e.preventDefault();

  //   try {
  //     const { data } = await axios.get('http://localhost:4000/auth/google', {
  //       "headers": {
  //         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  //         "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
  //         "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
  //         "sec-ch-ua-mobile": "?0",
  //         "sec-ch-ua-platform": "\"macOS\"",
  //         "sec-fetch-dest": "document",
  //         "sec-fetch-mode": "navigate",
  //         "sec-fetch-site": "same-site",
  //         "sec-fetch-user": "?1",
  //         "upgrade-insecure-requests": "1"
  //       },
  //       "referrer": "http://localhost:3000/",
  //       "referrerPolicy": "strict-origin-when-cross-origin",
  //       "body": null,
  //       "method": "GET",
  //       "mode": "cors",
  //       "credentials": "omit"
  //     });
  //     // setGoogleUserData(data);
  //     // setToken(data.token);
  //     console.log(data);
  //   } catch(err) {
  //     console.error(err);
  //   }   
  // }



  async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: ", response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);

    if(userObject) {
      setGoogleUser(userObject);
      localStorage.setItem('user', JSON.stringify(userObject));

      const googleId = userObject.sub;
      const { name, email, picture } = userObject;
      const token = response.credential;


      const res = await fetch('http://localhost:4000/api/user/googlesignin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, picture, googleId, token})
      });

      const json = await res.json();

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
  })

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
                or Sign In with Google
                <div className='line'></div>
            </div>
        </form>
        {/* <form action="http://localhost:4000/auth/google"> */}
        {/* <form onSubmit={HandleGoogleLogin}> */}
        <form>
            <button className='loginpage-btn google' id='google-signin' type='submit'>
                <img src='../../../assets/googlelogo.svg' alt='google'/>
                Sign In with Google
            </button>
            <div></div>

            <p>Don't have an account? <Link to='/signup' style={{color: '#055FFC'}}>Sign Up</Link></p>
        </form>

        
      </div>
    </div>
  )
}

export default LoginPage
