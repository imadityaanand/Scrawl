import React from 'react'
import './RequestsPage.css'

function RequestCard(props) {
  return (
    <div className='requestcard flex'>
      <div className='flex categories-container'>
        {props.categories.map(function(category) {
          return <div className='category-button'>{category}</div>
        })}
      </div>

      <div className='flex request-content'>
        <div className='left-div'>
          <div className='user-image' style={{backgroundImage: 'url(' + props.image + ')'}}>
          </div>
        </div>

        <div className='right-div flex'>
          <div className='request-text'>
              <span className='username'>@{props.username} </span>
              <span>{props.text}</span>
          </div>
          <div className='request-info flex'>
            <p>{props.date}</p>
            <p>{props.submissions} Submissions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestCard
