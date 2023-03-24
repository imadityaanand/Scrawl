import React from 'react'
import NotesCardHome from '../HomePage/NotesCardHome'
import Navbar from '../Navbar/Navbar'

function LikedPage() {
  return (
    <div className='likedpage'>
        <Navbar />
        <div className='main-container'>
            <h1>Liked Notes</h1>
            <div className='flex cards-container'>
              <NotesCardHome
                image = '../../../assets/notes1.png'
                title = 'Alternating current | Class 12 Physics | Sample Notes'
                username = 'shutkone'
                pages = '3'
              />
              <NotesCardHome
                image = '../../../assets/notes1.png'
                title = 'Alternating current | Class 12 Physics | Sample Notes'
                username = 'shutkone'
                pages = '3'
              />
              <NotesCardHome
                image = '../../../assets/notes1.png'
                title = 'Alternating current | Class 12 Physics | Sample Notes'
                username = 'shutkone'
                pages = '3'
              />
            </div>
        </div>
    </div>
  )
}

export default LikedPage
