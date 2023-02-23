import React from 'react'
import { Link } from 'react-router-dom';
import './LoginPage.css';

function SignupPage() {
  return (
    <div className='login'>
      <Link to='/' style={{ color: 'black' }}>
        <div className='logo'>
            <img src='../../../assets/logo2-black.svg' alt='logo' />
        </div>
      </Link>

      <div className='login-container'>
        <h1>Sign Up</h1>
        <form action="http://localhost:4000/signup" method='POST'>
            <p>Name*</p>
            <input placeholder='Name' name='name' />
            <p>Email*</p>
            <input placeholder='mail@website.com' name='email' />
            <p>Password*</p>
            <input placeholder='Password' type='password' name='password' />

            <button className='loginpage-btn' type='submit'>Sign Up</button>
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
