import React, { useState } from 'react'
import './SearchBar.css';

function SearchBar() {
    const [searchText, setSearchText] = useState('');
    function HandleSearch() {
        if(searchText !== '') {
            console.log('Searched:', searchText);
        }
    }

    return (
        <div className='searchbar'>
            <img className='icon' src='../../../assets/search-icon.svg' alt='icon' onClick={HandleSearch} />
            <input
                placeholder='Search'
                onChange={(e) => {setSearchText(e.target.value)}}
            />
        </div>
    )
}

export default SearchBar
