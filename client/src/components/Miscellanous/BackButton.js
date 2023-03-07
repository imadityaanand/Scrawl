import React from 'react'
import './Miscellanous.css';
import { useNavigate } from 'react-router-dom'

function BackButton(props) {
    const navigate = useNavigate();

    function HandleClick() {
        navigate(-1);
    }

    return (
        <div className='backbutton' onClick={HandleClick}>
            {props.color === 'white' ? <img src='../../../assets/arrow-white-icon.svg' alt='back' /> : <img src='../../../assets/arrow-icon.svg' alt='back' />}
        </div>
    )
}

export default BackButton
