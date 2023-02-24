import React, { useState } from 'react'
import './Navbar.css';
import Navbutton from './Navbutton';
import ProfileButton from './ProfileButton';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isActive, setActive] = useState("home");
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    function HandleClick(set) {
        setActive(set);
    }

    if(!isMobile){
        return (
            <div className='navbar'>
                <div>
                    <div className='logo'>
                        <img src='../../../assets/logo2-black.svg' alt='logo' />
                    </div>
                    <Navbutton icon='../../../assets/home-icon.svg' name='Home' active={isActive === 'home' ? 'active' : null} click={() => {HandleClick('home')}} />
                    <Navbutton icon='../../../assets/requests-icon.svg' name='Requests' active={isActive === 'requests' ? 'active' : null} click={() => {HandleClick('requests')}} />
                    <Navbutton icon='../../../assets/bell-icon.svg' name='Notifications' active={isActive === 'notifications' ? 'active' : null} click={() => {HandleClick('notifications')}} />
                    <Navbutton icon='../../../assets/saved-icon.svg' name='Saved Notes' active={isActive === 'saved' ? 'active' : null} click={() => {HandleClick('saved')}} />
                    <Navbutton icon='../../../assets/heart-icon.svg' name='Liked Notes' active={isActive === 'liked' ? 'active' : null} click={() => {HandleClick('liked')}} />
                </div>
                <div>
                    <Link to='/createpost'><div className='upload-button'>Upload your Notes</div></Link>
                    <ProfileButton image='../../../assets/aditya.png' name='Aditya Anand' username='imadityaanand' />
                </div>
            </div>
        )    
    } else {
        return (
            <>
                <Link to='/createpost'><div className='upload-button'>Upload your Notes</div></Link>
                <div className='navbar'>
                    <Navbutton icon='../../../assets/home-icon.svg' name='Home' active={isActive === 'home' ? 'active' : null} click={() => {HandleClick('home')}} />
                    <Navbutton icon='../../../assets/requests-icon.svg' name='Requests' active={isActive === 'requests' ? 'active' : null} click={() => {HandleClick('requests')}} />
                    <Navbutton icon='../../../assets/bell-icon.svg' name='Notifications' active={isActive === 'notifications' ? 'active' : null} click={() => {HandleClick('notifications')}} />
                    {/* <ProfileButton image='../../../assets/aditya.png' name='Aditya Anand' username='imadityaanand' /> */}
                    <Navbutton icon='../../../assets/aditya.png' name='Profile' active={isActive === 'profile' ? 'active' : null} click={() => {HandleClick('profile')}} class='profile-pic' />
                </div>
            </> 
        )
    }
}

export default Navbar
