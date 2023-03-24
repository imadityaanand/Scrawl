import React from 'react'
import './ProfilePage.css'
import Navbar from '../Navbar/Navbar'
import ProfileInfoCard from './ProfileInfoCard'

function ProfilePage() {
  return (
    <div className='profilepage'>
      <Navbar />
        <div className='main-container'>
            <h1>Profile Page</h1>
            <ProfileInfoCard />
        </div>
    </div>
  )
}

export default ProfilePage
