import React from 'react'
import { Button } from './ui/button.js'
import { Input } from './ui/input.js'
export const action = async ({ request }) => {
    const formData = await request.formData()
    // const id = formData.get('tracking_number')
    // return redirect(`tracking/${id}`)
    return null
}

type ITrackingProps = {
    defaultValue?: string,
    onSubmit?: (value: any) => void,
}
const TrackingInput = ({
    defaultValue,
    onSubmit = (e) => {
        e.preventDefault()
    }
}: ITrackingProps) => {
    return (
        <div
            className='max-w-[40rem]  w-full border h-16 my-8 rounded-sm mx-auto bg-white'
        >
            <form
                method='post'
                onSubmit={onSubmit}
                className='flex justify-between h-full'
            >
                <div

                    className='flex-1 overflow-hidden relative pl-2 py-2
                    h-full
                    flex 
                    flex-col
                    justify-end
                    '
                >

                    <input
                        defaultValue={defaultValue}
                        type='text'
                        required
                        className='rounded-none
                        text-lg
                        h-10 w-full focus:outline-none
                    !ring-0
                    focus:border-none hover:outline-none hover:border-none shadow-none 
                    peer 
                    
                    shadow-0
                    ring-offset-0
                    !outline-none
                    cursor-pointer
                    focus-visible:outline-none 
                    focus-visible:font-medium
                    focus-visible:ring-0
                    focus-visible:border-none
                    
                    '
                        id='tracking_number'
                        name='tracking_number'
                    />
                    <label
                        htmlFor='tracking_number'
                        className='absolute ml-2 
                        left-0
                width-
                cursor-pointer
                peer-focus:top-0
                peer-focus:text-xs
                transition-all
                duration-500
                sm:text-xl
                text-sm
                peer-valid:text-xs
                peer-invalid:top-1/2
                peer-valid:top-0
                peer-valid:translate-y-2
                peer-invalid:-translate-y-1/2
                peer-focus:translate-y-2
                peer-valid:italic
                text-gray-500
                '
                    >
                        Enter  your tracking number
                    </label>
                </div>
                <Button
                    type='submit'
                    className='rounded-sm h-full my-0 px-6 lg:px-7'
                >
                    Track
                </Button>

            </form>

        </div>
    )
}

export default TrackingInput