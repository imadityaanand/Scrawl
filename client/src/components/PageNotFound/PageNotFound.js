import React from 'react'
import './PageNotFound.css'

function PageNotFound() {
  return (
    <div className='pagenotfound flex'>
      <img src='../../../assets/pagenotfound.svg' alt='404' />
      <p>The page you are looking for doesn’t exist or an other error occurred.</p>
    </div>
  )
}

export default PageNotFound
