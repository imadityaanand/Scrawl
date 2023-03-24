import React from 'react'
import './Navbar.css';
import { useMediaQuery } from 'react-responsive';

function ProfileButton(props) {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    if(!isMobile) {
        return (
            <div className={`profile-button ${props.active}`} onClick={props.click}>
                <div className='profile-pic' style={{backgroundImage: 'url(' + props.image + ')'}}></div>
                <div className='profile-info'>
                    <p className='name'>{props.name}</p>
                    <p className='username'>@{props.username}</p>
                </div>
                <p className='label'>Profile</p>
            </div>
        )
    } else {
        return (
            <div className='profile-button-parent'>
                <div className='profile-button'>
                    <div className='profile-pic' style={{backgroundImage: 'url(' + props.image + ')'}}></div>
                    <div className='profile-info'>
                        <p className='name'>{props.name}</p>
                        <p className='username'>@{props.username}</p>
                    </div>
                </div>
                <p className='label'>Profile</p>
            </div>
        )
    }   
}

export default ProfileButton
