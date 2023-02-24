import React from 'react'
import './HomePage.css'
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import NotesCardHome from './NotesCardHome';

function HomePage() {
  return (
    <div className='homepage'>
      <Navbar />
      <div className='main-container'>
        <SearchBar />

        <h6>POPULAR CATEGORIES</h6>
        <div className='flex categories-container'>
          <div className='category-button'>Physics</div>
          <div className='category-button'>Chemistry</div>
          <div className='category-button'>Maths</div>
        </div>

        <h6>RECENTLY UPLOADED</h6>
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
          <NotesCardHome
            image = '../../../assets/notes1.png'
            title = 'Alternating current | Class 12 Physics | Sample Notes'
            username = 'shutkone'
            pages = '3'
          />
        </div>

        <h6>RECENTLY VIEWED</h6>
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
          <NotesCardHome
            image = '../../../assets/notes1.png'
            title = 'Alternating current | Class 12 Physics | Sample Notes'
            username = 'shutkone'
            pages = '3'
          />
        </div>

        <h6>PHYSICS</h6>
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

export default HomePage
