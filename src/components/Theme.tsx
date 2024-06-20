import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTheme } from '../actions/themeSlice';
import { cn } from '../lib/utils';
import React from 'react';
import { SunDim, SunIcon } from 'lucide-react';
// import { toggleTheme } from '../../../actions/themeSlice';
// import { cn } from '../../../lib/utils';
// import { rootState } from '../../../redux/store';
// import { IconRepository } from '../../../repository/icons/icon.repository';
// import { CiSun } from 'react-icons/ci'
type Props = {
    className?: string,// for the round ball
    containerClassName?: string // the container housing the round ball
}
// dear reader/tester please fixed this code style or color for me 
// this is the code that toggle the theme in the app
// it can be used at any place in the app as long as you import it 
// containerClassName-->is for the big container or the box
// className is for the round circle 
// you can customize the color here 
// or importing and customize
export default function ThemeToggler({ className,
    containerClassName }: Props) {
    const isDarkTheme = useSelector((state: RootState) => state.theme.currentTheme) == 'dark'

    const dispath = useDispatch()
    const toggleSwitch = () => dispath(toggleTheme());

    return (
        <>


            {/* <p className='text-green-600 dark:text-blue-600'>testing the code here</p> */}
            <div
                key='somerandomtexthere'
                className={cn('w-[min(8rem,calc(100%-1rem))] relative bg-white border border-colorPrimary cursor-pointer py-1 px-2  rounded-full flex items-center mx-auto ',
                    isDarkTheme && 'justify-end',
                    isDarkTheme && 'bg-gray-600 active',
                    containerClassName
                )}
                // data-isDarkTheme={isDarkTheme}
                onClick={toggleSwitch}>
             
                <motion.div className={cn('size-8  transition-colors duration-500 ring-[1px] bg-gray-500 rounded-full',
                    isDarkTheme && 'bg-red-600',
                    className
                )} layout transition={spring} >
                    <div className='size-full  flex items-center justify-center rounded-full'>
                        {
                            isDarkTheme ? <SunIcon size={20} /> : <SunDim size={20} />
                        }
                    </div>
                </motion.div>
            </div>
        </>
    );
}

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
};
