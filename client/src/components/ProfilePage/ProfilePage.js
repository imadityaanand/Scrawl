import React from 'react'
import './ProfilePage.css'
import Navbar from '../Navbar/Navbar'
import ProfileInfoCard from './ProfileInfoCard'

function ProfilePage() {
  return (
    <div className='profilepage'>
      <Navbar />
        <div className='main-container'>
          <h6>YOUR ACTIVITY</h6>
          <div className='profileactivity flex'>
            <h1>Features Coming Soon</h1>
          </div>
          <ProfileInfoCard />
        </div>
    </div>
  )
}

export default ProfilePage
