import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFilter } from '../hooks/CustomLinkFilterHook'
import { useSearchParams } from 'react-router-dom'
import debounce from '../utils/debounce'
import { cn } from '../lib/utils'
interface iSearch
    extends React.InputHTMLAttributes<HTMLInputElement> {

}

function SearchComponent({
    ...props
}: iSearch) {
    const { handleFilterChange } = useFilter()
    const handleChange = (event) => {
        handleFilterChange({
            key: "search",
            value: event.target.value
        })
    };
    const debouncedHandleChange = debounce(handleChange, 500);
    const [sp] = useSearchParams();
    const searchVal = sp.get("search")
    useEffect(() => {
        if (typeof searchVal == "string" && searchVal.length < 1) {
            handleFilterChange({
                key: "search"
            })
        }
    }, [searchVal])
    return (
        <div className='flex max-w-2xl w-full my-4 mx-auto items-stretch h-10 parent  rounded-lg cursor-pointer border-[3px]'>
            <input
                className={
                    cn(`flex-1 h-full
                border-none
                outline-none
                text-sm
                pl-4
                
                `)
                }
                defaultValue={searchVal || ""}
                onChange={debouncedHandleChange}
                // onChange={(e) => handleFilterChange({ key: "search", value: e.target.value })}
                placeholder='Search...'

                {...props}
            ></input>
            <span className='flex-none flex justify-center items-center'>
                <Search />
            </span>
        </div>
    )
}

export default SearchComponent