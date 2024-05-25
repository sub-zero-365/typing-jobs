import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { cn } from '../../lib/utils'
import debounce from '../../utils/debounce'
import { useFilter } from '../../hooks/CustomLinkFilterHook'
interface iCustomSelect {
    values: string[],
    containerClassName?: string,
    className?: string,
    defaultValue?: string,
    selectLabel?: string,
    searchKey: string
}
const CustomSelect = ({ className,
    values, defaultValue, selectLabel, searchKey }: iCustomSelect) => {
    const { handleFilterChange } = useFilter()
    const debouncedHandleChange = debounce((e: string) => handleFilterChange({ key: searchKey, value: e }), 500);

    return (
        <div> <Select onValueChange={debouncedHandleChange}>
            <SelectTrigger className={cn("w-[180px]",
                className)} >
                <SelectValue placeholder={defaultValue} />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup >
                    <SelectLabel>{selectLabel || ''}</SelectLabel>
                    {
                        values.map((value) => <SelectItem value={value} key={value}>{value}</SelectItem>)
                    }
                </SelectGroup>
            </SelectContent>
        </Select></div>
    )
}

export default CustomSelect