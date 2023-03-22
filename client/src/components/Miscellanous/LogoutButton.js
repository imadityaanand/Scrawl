import React from 'react'
import './Miscellanous.css'

function LogoutButton(props) {
  return (
    <div className='logout-btn' onClick={props.click}>
        Log Out
    </div>
  )
}

export default LogoutButton
