import React from 'react'
import './NotesCardHome.css';

function NotesCardHome(props) {
  return (
    <div className='notescard-home'>
      <div className='notes-thumb' style={{backgroundImage: 'url(' + props.image + ')'}}></div>
      <p className='title'>{props.title}</p>
      <div className='flex info'>
        <p className='username'>@{props.username}</p>
        <p className='pages'>{props.pages} pages</p>
      </div>
    </div>
  )
}

export default NotesCardHome
