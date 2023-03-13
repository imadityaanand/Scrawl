import React from 'react'

function ThemeButton(props) {
  return (
    <div className='themebutton' onClick={props.click}>
      {props.icon === 'sun' ? <img src='../../../assets/sun-icon.svg' alt='light' /> : <img src='../../../assets/moon-icon.svg' alt='dark' />}
    </div>
  )
}

export default ThemeButton
