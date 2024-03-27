import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils.js'
import useMousePosition from '../hooks/mouse-hooks/useMouseHook.js';

const SideDrawer = ({ toggle, setToggle }) => {
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const ref = useRef(null)
    const { x } = useMousePosition({ ref: ref });
    // useEffect(() => {
    //     const W = window.innerWidth;
    //     let w = W - x
    //     if (w >=16*25) {
    //         setToggle(true)
    //         // setIsMouseDown(false)
    //     }

    // }, [x])
    let timer = null
    return (
        <>
            <span
                className={cn(`fixed shadow
                top-1/2 
                z-[10000]
                right-[0rem]
                    -translate-y-1/2
                    size-[2rem]
                    bg-red-600
                    cursor-pointer
                    group-[.active]:top-[0rem]
                    group-[.active]:translate-y-0
                    transition-all
            duration-[1s]
            
                    `
                    , toggle && "top-[0rem] translate-y-0 lg:top-[calc(calc(100%-min(30rem,calc(100%-2rem)))/2)] lg:right-[calc(min(25rem,calc(100%-2rem))+4rem)] right-[min(25rem,calc(100%-2rem))]"
                )}
                onMouseDown={() => {
                    timer = setTimeout(() => {
                        setIsMouseDown(true)
                    }, 200);
                }}
                onClick={(e) => {
                    setToggle(!toggle)
                }}
            ></span>
            <div
                onMouseUp={() => {
                    setIsMouseDown(false)
                    clearTimeout(timer)
                }}
                onClick={()=>setToggle(false)}
                ref={ref}
                className={cn(`fixed inset-0
                group
                size-full flex  items-center z-[9000] bg-black/25`,
                    toggle ? "active visible" : "invisible"
                )}
            >
                <div
                onClick={e=>e.stopPropagation()}
                    // style={{
                    //     right: isMouseDown && `min(calc(calc(100% - 25rem) - ${x}px),2rem)`
                    // }}
                    className={cn(`bg-green-900 outline-dotted
               lg:h-[min(30rem,calc(100%-2rem))]
               h-[min(30rem,calc(100%-2rem))]-
               h-full
                absolute
                transition-all
                duration-[1s]
                w-[min(25rem,calc(100%-2rem))]
                -right-[min(25rem,calc(100%-2rem))]
                group-[.active]:right-0
                group-[.active]:lg:right-[4rem]
                  `
                        ,
                    )}>

                    <span
                        className='absolute shadow  top-0 -right-[2rem]
                        size-[2rem]
                        bg-red-600
                        cursor-pointer
                        '
                        onClick={(e) => {
                            setToggle(!toggle)
                        }}
                    ></span>
                </div>

            </div>
        </>
    )
}

export default SideDrawer