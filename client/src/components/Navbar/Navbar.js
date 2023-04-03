import React, { useState } from 'react'
import './Navbar.css';
import Navbutton from './Navbutton';
import ProfileButton from './ProfileButton';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isActive, setActive] = useState(window.location.pathname.slice(1, window.location.pathname.length));
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
    const navigate = useNavigate();

    const name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : null;
    const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    const picture = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).picture : null;

    function HandleClick(set) {
        setActive(set);
        navigate('/' + set);
        window.scrollTo(0, 0);
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
                    {
                        window.location.pathname === '/requests'
                        ? <Link to='/submitrequest'><div className='upload-button'>Submit your Request</div></Link>
                        : <Link to='/createpost'><div className='upload-button'>Upload your Notes</div></Link>
                    }
                    <ProfileButton
                        image={picture ? picture : '../../../assets/defaultuserpic.svg'}
                        name={name}
                        username={username}
                        click={() => {HandleClick('profile')}}
                        active={isActive === 'profile' ? 'active' : null}
                    />
                </div>
            </div>
        )    
    } else {
        return (
            <>  
                {
                    window.location.pathname === '/requests'
                    ? <Link to='/submitrequest'><div className='upload-button'>Submit your Request</div></Link>
                    : <Link to='/createpost'><div className='upload-button'>Upload your Notes</div></Link>
                }
                <div className='navbar'>
                    <Navbutton icon='../../../assets/home-icon.svg' name='Home' active={isActive === 'home' ? 'active' : null} click={() => {HandleClick('home')}} />
                    <Navbutton icon='../../../assets/requests-icon.svg' name='Requests' active={isActive === 'requests' ? 'active' : null} click={() => {HandleClick('requests')}} />
                    <Navbutton icon='../../../assets/bell-icon.svg' name='Notifications' active={isActive === 'notifications' ? 'active' : null} click={() => {HandleClick('notifications')}} />
                    {/* <ProfileButton image='../../../assets/aditya.png' name='Aditya Anand' username='imadityaanand' /> */}
                    <Navbutton icon={picture ? picture : '../../../assets/defaultuserpic.svg'} name='Profile' active={isActive === 'profile' ? 'active' : null} click={() => {HandleClick('profile')}} class='profile-pic' />
                </div>
            </> 
        )
    }
}

export default Navbar
