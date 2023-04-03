import React from 'react'
import './ProfilePage.css'

function AchievementsCard(props) {
  return (
    <div className='achievementscard flex'>
      <div className='achievement flex coins'>
        <img src='../../../assets/scrawlcoin-icon.svg' alt='coins'/>
        <p className='achievement-score'>{props.coins}</p>
        <p className='score-desc'>Total Coins</p>
      </div>
      <div className='achievement flex likes'>
        <img src='../../../assets/whiteheart-icon.svg' alt='coins'/>
        <p className='achievement-score'>{props.likes}</p>
        <p className='score-desc'>Total Likes</p>
      </div>
      <div className='achievement flex submissions'>
        <img src='../../../assets/whitenotes-icon.svg' alt='coins'/>
        <p className='achievement-score'>{props.submissions}</p>
        <p className='score-desc'>Submissions</p>
      </div>
    </div>
  )
}

export default AchievementsCard
