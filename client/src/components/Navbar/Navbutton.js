import React from 'react'
import './Navbar.css'
import { useMediaQuery } from 'react-responsive';

function Navbutton(props) {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

    if(!isMobile) {
        return (
            <div className={`navbutton ${props.active}`} onClick={props.click}>
                <img src={props.icon} alt='icon' />
                {props.name}
            </div>
        )
    } else {
        return (
            <div className='nav-button-parent'>
                <div className={`navbutton ${props.active}`} onClick={props.click}>
                    <img src={props.icon} alt='icon' className={props.class} />
                </div>
                {props.name}
            </div>
        )
    }
}

export default Navbutton
