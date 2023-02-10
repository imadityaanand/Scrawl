import React from 'react'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className='landingpage'>
      <div className='logo'>
        <img src='../../../assets/logo-black.svg' alt='logo' />
        Scrawl
      </div>
      <div className='landing-content flex'>
        <div>
          <h1>From Classroom to Community, <br /> Notes at Your Fingertips</h1>
          <p>Connect with a community of students, upload and access quality  handwritten notes. Effortlessly browse, share and like notes, all in one place.</p>

          <div className='flex'>
            <button className='login-btn'>Log In</button>
            <button className='signup-btn'>Sign Up</button>
          </div>

          <div className='flex pbcc'>
            <img src='../../../assets/cubecrate-black.svg' alt='cubecrate' />
            Powered by CubeCrate
          </div>
        </div>
        <img className='illustration' src='../../../assets/landing-illustration.svg' alt='dev-illustraion' />
      </div>
      
    </div>
  )
}

export default LandingPage
