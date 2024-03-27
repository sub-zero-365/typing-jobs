import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.js"
// import { ThemeConsumer } from 'styled-components'
import { Button } from './ui/button.js'
import { LucideIcon, Sun, SunMoon } from 'lucide-react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store.js'
import { setActionTheme } from '../actions/themeSlice.js'
export const Theme = () => {
    const defaultTheme = useSelector((state: RootState) => state.theme.theme) ?? "light";
    const themes: {
        name: "dark" | "light",
        icon: LucideIcon
    }[] = [
            {
                name: "dark",
                icon: SunMoon
            },
            {
                name: "light",

                icon: Sun
            },

        ]
    const [theme, setTheme] = useState<typeof themes[number]>(themes.find(v => v.name == defaultTheme));
    const dispatch = useDispatch()
    
    // useEffect(()=>{
    //     // dispatch(setActionTheme("light"))
    // },[defaultTheme])
  

    const MyButton = motion(Button)
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MyButton
                        variant="outline"
                        key={theme.name}
                    >{theme.name} <theme.icon></theme.icon> </MyButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10} className="w-10">
                    <DropdownMenuGroup>
                        {
                            themes.map((_theme) => {
                                return (<DropdownMenuItem className='cursor-pointer'
                                    onClick={() => {
                                        setTheme(_theme)
                                        const t = _theme.name
                                        dispatch(setActionTheme(t))
                                    }}
                                    key={_theme.name}>
                                    {_theme.name}
                                    <DropdownMenuShortcut>{<_theme.icon />}</DropdownMenuShortcut>
                                </DropdownMenuItem>)
                            })
                        }


                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
