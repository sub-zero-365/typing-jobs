import React from "react";
import Trusted from "../sections/Trusted.js";
import Hero from "../components/Hero/Hero.js";
import HowItWorks from "../sections/HowItWorks.js";
import RequestService from "../sections/RequestService.js";
import Stats from "../sections/Stats.js";
import Testimonial from "../sections/Testimonials.js";
import NavigationArrow from "./ProtectedRoute/NavigationArrow.js";
import Marquee from "react-fast-marquee";
import OurProjectsExample from "../sections/OurProjectsExample.js";
import OurStaff from "../sections/OurStaff.js";
export default function Home() {
    return (
        <>
            <NavigationArrow />
            <Hero />
            <div className="mb-4"/>
            <div className="border-2 w-[calc(100%-1rem)] max-w-6xl border-colorPrimary rounded-full px-6 mx-auto">

            <Marquee className="px-0" pauseOnHover speed={100}>
               <pre className="px-0 py-2"> I can be a React component, multiple React components, or just some text. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, laborum.</pre>
            </Marquee>

            </div>
            <Trusted />
            <Stats />
            <RequestService />
            <Testimonial />
            <OurProjectsExample/>
            <OurStaff/>
            <HowItWorks />
        </>
    );
}
