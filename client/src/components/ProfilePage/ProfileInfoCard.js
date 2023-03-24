import React from 'react'
import { useLogout } from '../../hooks/useLogout';
import ProfilePageButton from '../Miscellanous/ProfilePageButton';
import './ProfilePage.css'

function ProfileInfoCard(props) {
    const name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : null;
    const image = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).picture : null;
    const username = 'shutkone';

    const { logout } = useLogout();

    return (
        <div className='profileinfocard flex'>
        <div>
            <div className='user flex'>
                <div className='user-info flex'>
                    <div className='user-image' style={{backgroundImage: 'url(' + image + ')'}}></div>
                    <div>
                        <p className='name'>{name}</p>
                        <p className='username'>@{username}</p>
                    </div>
                </div>
                <div className='edit-btn flex'>
                    <img src='../../../assets/pen-icon.svg' alt='edit' />
                </div>
            </div>
        </div>
        <div>
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
