import React from 'react'

function Search({searchTerm,setSearchTerm}) {
  return (
    <div className='search'>
        <div>
            <img src='./search.svg' alt='search'/>

            <input
            type="text"
            placeholder='Search through thoushands of movies'
            onChange={(e)=>{setSearchTerm(e.target.value)}}

            />
        </div>
    </div>
  )
}

export default Search
