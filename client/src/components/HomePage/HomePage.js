import React, { useEffect, useState } from 'react'
import './HomePage.css'
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import NotesCardHome from './NotesCardHome';
import PdfList from '../PdfNotes/PdfList';
import { useNavigate } from 'react-router-dom';
import PdfCard from '../PdfNotes/PdfCard';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();
  const [samplePdf, setSamplePdf] = useState([]);

  useEffect(() => {
    if(!localStorage.getItem('user')) {
      navigate('/login');
    }
  });

  useEffect(() => {
    const fetchPdfs = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER + 'pdf/64205ae89def82fa6cc5df71');
        setSamplePdf(response.data);
    }
    fetchPdfs();
}, []);

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

        <h6>SAMPLE NOTES</h6>
        {!samplePdf[0] ? <h2>Loading</h2> :<PdfCard key={samplePdf[0]._id} pdf={samplePdf[0]} image='../../../assets/notes1.png' />}

        <h6>RECENTLY UPLOADED</h6>
        <div className='flex cards-container'>
          <PdfList />
        </div>

        {/* <h6>PHYSICS</h6>
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
        </div> */}

        {/* <div className='sample-bg'></div>
        <img className='sample' src='../../../assets/notes1.png' alt='notes-sample' /> */}
      </div>
    </div>
  )
}

export default HomePage
