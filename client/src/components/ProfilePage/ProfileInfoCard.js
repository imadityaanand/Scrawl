import React from 'react'
import { useLogout } from '../../hooks/useLogout';
import ProfilePageButton from '../Miscellanous/ProfilePageButton';
import AchievementsCard from './AchievementsCard';
import './ProfilePage.css'

function ProfileInfoCard(props) {
    const name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : null;
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    const image = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).picture : null;

    const { logout } = useLogout();

    return (
        <div className='profileinfocard flex'>
        <div>
            <div className='user flex'>
                <div className='user-info flex'>
                    {image
                        ? <div className='user-image' style={{backgroundImage: 'url(' + image + ')'}}></div>
                        : <div className='user-image' style={{backgroundImage: 'url(../../../assets/defaultuserpic.svg)'}}></div>
                    }
                    <div>
                        <p className='name'>{name}</p>
                        <p className='username'>@{username}</p>
                    </div>
                </div>
                <div className='edit-btn flex'>
                    <img src='../../../assets/pen-icon.svg' alt='edit' />
                </div>
            </div>
            <AchievementsCard
              coins={20}
              likes={120}
              submissions={5}
            />
        </div>
        <div>
            <ProfilePageButton
                icon='../../../assets/blackscrawlcoin-icon.svg'
                name='Redeem your coins'
            />
            <ProfilePageButton
                icon='../../../assets/signout-icon.svg'
                name='Log Out'
                color='red'
                click={logout}
            />
        </div>
        </div>
    )
}

export default ProfileInfoCard
