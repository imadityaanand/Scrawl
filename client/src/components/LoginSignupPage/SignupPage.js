import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import './LoginPage.css';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useSignup();

  async function HandleSubmit(e) {
    e.preventDefault();
    
    await signup(name, email, password);
  }

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
                or Sign Up with Google
                <div className='line'></div>
            </div>
        </form>
        <form action="http://localhost:4000/auth/google">
            <button className='loginpage-btn google' type='submit'>
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
