import React from 'react'
import './PageNotFound.css'
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className='pagenotfound flex'>
      <img src='../../../assets/pagenotfound.svg' alt='404' />
      <p>The page you are looking for doesn’t exist or an other error occurred.</p>
      <div className='category-button' onClick={() => navigate('/home')}>Back to Home</div>
    </div>
  )
}

export default PageNotFound
