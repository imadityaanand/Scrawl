import React from 'react'

function ProfilePageButton(props) {
  return (
    <div className={`profilepage-btn ${props.color}`} onClick={props.click}>
      <img src={props.icon} alt={props.alt} />
      {props.name}
    </div>
  )
}

export default ProfilePageButton
