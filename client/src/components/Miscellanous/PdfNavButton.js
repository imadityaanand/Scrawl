import React from 'react'
import './Miscellanous.css';

function PdfNavButton(props) {
  return (
    <div className={`pdfnavbutton ${props.disabled}`} onClick={props.disabled === 'disabled' ? null : props.click}>
      {props.theme === 'light'
        ? props.type === 'left' ? <img src='../../../assets/arrow-icon2.svg' className='left' alt='left' /> : <img src='../../../assets/arrow-icon2.svg' alt='right' />
        : props.type === 'left' ? <img src='../../../assets/arrow-dark-icon2.svg' className='left' alt='left' /> : <img src='../../../assets/arrow-dark-icon2.svg' alt='right' />
      }
    </div>
  )
}

export default PdfNavButton
