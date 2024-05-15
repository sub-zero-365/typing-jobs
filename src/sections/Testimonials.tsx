import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Heading, { VariantHeading } from '../components/Heading';
import ReactStars from 'react-stars'
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { Textarea } from "../components/ui/textarea"
import { cn } from "@/lib/utils"
import { useMediaQuery } from 'react-responsive'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../components/ui/drawer"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
interface Review {
    readonly name: string;
    readonly review: string;
    readonly starCount: number;
}
const reviews = [
    {
        name: "Sarah Smith",
        review: "I was so impressed with the quality of my prints! The colors were vibrant and the paper felt luxurious. I will definitely be using your services again.",
        starCount: 4
    },
    {
        name: "David Jones",
        review: "Fast, friendly, and fantastic results! I needed some brochures printed last minute and they were able to accommodate my tight deadline without any issues. Highly recommend!",
        starCount: 3.5
    },
    {
        name: "Lisa Miller",
        review: "This printing company is a lifesaver!  Their online upload process is so easy and convenient. Plus, the turnaround time is unbeatable. I've used them for business cards, flyers, and even some photo prints, and I've always been happy.",
        starCount: 5
    },
    {
        name: "Michael Brown",
        review: "I run a small business and rely on this printing service for all my needs. Their prices are competitive and the quality is top-notch. They've also been incredibly helpful with design suggestions in the past. A true one-stop shop!",
        starCount: 5
    },
    {
        name: "Emily Johnson",
        review: "I was a bit nervous ordering prints online, but this company made the whole process stress-free. The customer service was excellent and they answered all my questions promptly. The prints arrived beautifully packaged and exactly as I ordered.  Thank you!",
        starCount: 4
    },
    {
        name: "Charles Williams",
        review: "From design assistance to high-quality printing, this company exceeded my expectations. I needed a unique design for my wedding invitations and their team was incredibly creative and patient with my revisions. The final product was stunning and my guests couldn't stop raving about them. Highly recommend for any special occasion printing needs!",
        starCount: 3
    }
];
const SingleTestimonial = ({ name, review, starCount }: Review) => {
    return (
        <figure className="snip1157 ">
            <blockquote
                className='!line-clamp-8 pb-2'
            >{review}
                <div className="arrow"></div>
            </blockquote>
            <div className='size-16'></div>
            <div className="author">
                <h5>{name}<span>
                    <ReactStars
                        count={5}
                        value={starCount}
                        edit={false}
                        size={24}
                        color="orange"
                        color2={'#fed900'} />
                </span></h5>
            </div>
        </figure>)
}
const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
};
const Testimonial = () => {
    const buttonRef = React.useRef<any>(null)
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })
    function ProfileForm({ className }: React.ComponentProps<"form">) {
        return (
            <form className={cn("grid items-start gap-4", className)}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" defaultValue="ecg@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@egc" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">review</Label>
                    <Textarea
                        cols={58}
                        placeholder="Type your message here." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="username">please rate us</Label>
                    <ReactStars

                        count={5}
                        value={3}
                        edit={true}
                        size={24}
                        color="orange"
                        color2={'#fed900'} />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        )
    }
    return (

        <div className='bg-white overflow-hidden--'>
            <div className='max-w-6xl mx-auto'>
                <Heading className='text-center text-blue-800 font-black text-3xl max-w-fit mx-auto'>
                    Testimonials

                </Heading>
                <VariantHeading  className='text-center font-black text-4xl text-blue-950 lg:text-6xl py-10 px-5 max-w-4xl mx-auto'>
                    Saticfied People’s Say About Our Service
                </VariantHeading>
                <Swiper
                    pagination={pagination}
                    slidesPerView={1.2}
                    spaceBetween={10}
                    autoplay={{
                        delay: 1500,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3.1,
                            spaceBetween: 50,
                        },
                    }}

                    loop={true}
                    translate="yes"
                    modules={[Autoplay, Pagination]}
                    className="!w-full pb-20"
                >
                    {reviews.map((review, idx) => <SwiperSlide className=" w-full" key={idx}>
                        <SingleTestimonial
                            {...review}
                            key={idx}
                        />

                    </SwiperSlide>)}
                </Swiper>

                {/* modal starts here */}
                {
                    isDesktop ?
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger ref={buttonRef} asChild className='hidden'>
                                <Button variant="outline">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Review</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <ProfileForm />
                            </DialogContent>
                        </Dialog>
                        :
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild ref={buttonRef} className='hidden'>
                                <Button variant="outline">Edit Profile</Button>
                            </DrawerTrigger>
                            <DrawerContent className=''>
                                <DrawerHeader className="text-left">
                                    <DrawerTitle>Add Review</DrawerTitle>
                                    <DrawerDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DrawerDescription>
                                </DrawerHeader>
                                <ProfileForm className="px-4" />
                                <DrawerFooter className="pt-2">
                                    <DrawerClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>

                }




                {/* modal ends here */}

                <Button
                    onClick={() => {
                        buttonRef.current?.click()
                    }}
                    className="block sticky btn bg-colorPrimary
            w-[min(420px,calc(100%-1rem))] px-0
            mx-auto font-bold text-sm z-50 h-14 lg:ml-auto lg:mr-4
            bottom-0 rounded-none   left-0 uppercase  text-center ">
                    Please Leave a review <span className="size-6 ml-2 inline-flex justify-center items-center rounded-full ring  place-items-center"><Plus size={15} className='inline-block' /></span>
                </Button>
            </div>
        </div>
    )
}

export default Testimonial