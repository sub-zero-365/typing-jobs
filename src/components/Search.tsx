import { Search } from 'lucide-react'
import React from 'react'

function SearchComponent() {
    return (
        <div className='flex items-stretch h-10 parent border-secondary rounded-lg cursor-pointer border-[3px]'>
            <input
                className='flex-1 h-full
        border-none
        outline-none
        text-sm
        pl-4
        
        '
                placeholder='Search...'
            ></input>
            <span className='flex-none flex justify-center items-center'>
                <Search/>
            </span>
        </div>
    )
}

export default SearchComponent