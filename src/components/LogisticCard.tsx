import React from 'react'
import { Button } from './ui/button.js'
import { motion } from "framer-motion"
interface IlogisticCard {
    deleteImg: (value: any) => void,
    imageObject: any,
}
const varaints = {
    show: {

    }
    , hidden: {
        opacity: 0,
        transiton: {
            delay: 0.4,
            duration: 1
        }
    }
}
const LogisticCard = ({ imageObject, deleteImg}: IlogisticCard) => {
    if (!imageObject) return
    return (
        <motion.div
            className='max-w-sm mx-auto border-2 ring-[1px]  ring-black p-2 rounded-sm'
            initial={{
                y: 10
            }}
            animate={{
                y: 0
            }}
            exit={
                {
                    opacity: 0,
                    transition: {
                        delay: 1, duration: 2
                    }
                }
            }
        >
            <div className='flex flex-col space-y-2'>
                <div className='h-[14rem] overflow-hidden rounded-sm shadow-sm'>
                    <img
                        className='object-fit max-w-full w-full h-full'
                        src={URL.createObjectURL(imageObject.image)}
                        alt="" />
                </div>

                <div className='flex justify-between px-4 py-1 '>
                    <h5 className='text-xl font-medium leading-5 tracking-tighter'>{imageObject.text}</h5>
                    <span className='text-sm font-medium'>
                        {(imageObject.image.size / 1000000).toFixed(2)} mb
                    </span>
                </div>
                <Button variant='destructive'
                    type='button' onClick={() => deleteImg(imageObject.createdAt)}> delete image</Button>
                <div
                    className='mb-4'
                ></div>
            </div>
        </motion.div>
    )
}

export default LogisticCard