import React from 'react'

const Footer = ({ className }: { className?: string }) => {
    return (
        <div className='border bg-orange-500 py-10 bg-black/90 text-white
        px-3
        '

        >
            <div className="
        sm:max-w-6xl  mx-auto
            ">

                <div className='lg:grid grid-cols-12 lg:flex-row '>
                    <div className='flex-none  col-span-4'>
                        {import.meta.env.VITE_APP_NAME}
                    </div>
                    <div className='flex-1 grid col-span-8
                    grid-cols-[repeat(auto-fit,minmax(min(10rem,calc(100%-60px)),_1fr))]'>
                        {

                            Array.from({ length: 3 }, (arr) => {
                                return (
                                    <ul>
                                        <li>
                                            <h1 className='text-blue-500'>name</h1>
                                            <ul>
                                                {Array.from({ length: 4 }, () => {
                                                    return <li>
                                                        some text
                                                    </li>
                                                })}
                                            </ul>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Footer