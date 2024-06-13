import React from 'react'
import MovableBackgroundSection from '../components/ui/MovableBackgroundSection'
import Heading from '../components/Heading'
import Marquee from "react-fast-marquee";

const ManagementCard = () => {
    return (<div className='bg-orange-300  flex flex-col mt-20  mr-8 w-44 skew-x-[15deg]  relative'>
        <div className='relative z-[40] bg-white'>
            <img src="https://irad.cm/images/PCA_1.jpg" alt="som" className='size-full ' />
      <div className='pl-4 pb-1'>
      <Heading className='text-orange-500 font-semibold mb-0'>some title</Heading>
            <p>rose text</p>

      </div>

        </div>
        <div className=' size-full -right-3 absolute -top-4  bg-blue-400 ' />

    </div>)

}
const OurStaff = () => {
    return (
        <div className='max-w-6xl-- mx-auto ' style={{ perspective: "100px" }}>
            <MovableBackgroundSection imageUrl={"https://swiperjs.com/demos/images/nature-2.jpg"} >
                <Marquee className="px-0" speed={100} pauseOnHover>
                    {Array.from({ length: 6 }, (arr, idx) => <ManagementCard key={idx} />)}
                </Marquee>
            </MovableBackgroundSection>

        </div>
    )
}

export default OurStaff
