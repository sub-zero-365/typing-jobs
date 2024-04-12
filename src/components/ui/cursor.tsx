import React from 'react'
import { Pointer } from 'lucide-react';
import { motion } from 'framer-motion'
const Cursor = ({ x, y }: {
    x: number;
    y: number;
}) => {

    return (
        <motion.div
        
            className='absolute 
group-hover:scale-100 
grid place-items-center rounded-full text-white bg-blue-900/10 size-10  z-40'
            style={{
                left: x,
                top: y
            }}
        >
            <Pointer />
        </motion.div>
    )
}

export default Cursor