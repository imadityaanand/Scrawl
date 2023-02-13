import React from 'react'
import { Link } from 'react-router-dom';
import './LoginPage.css';

function SignupPage() {
  return (
    <div className='login'>
      <Link to='/' style={{ color: 'black' }}>
        <div className='logo'>
            <img src='../../../assets/logo-black.svg' alt='logo' />
            Scrawl
        </div>
      </Link>

      <div className='login-container'>
        <h1>Sign Up</h1>
        <form action="http://localhost:4000/auth/google">
            <p>Name*</p>
            <input placeholder='Name' />
            <p>Email*</p>
            <input placeholder='mail@website.com' />
            <p>Password*</p>
            <input placeholder='Password' type='password' />

            <div className='loginpage-btn'>Sign Up</div>
            <div className='or-div'>
                <div className='line'></div>
                or Sign Up with Google
                <div className='line'></div>
            </div>
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
