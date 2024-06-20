import React from "react";
import Marquee from "react-fast-marquee";
import Hero from "../components/Hero/Hero.js";
import HowItWorks from "../sections/HowItWorks.js";
import OurProjectsExample from "../sections/OurProjectsExample.js";
import RequestService from "../sections/RequestService.js";
import Stats from "../sections/Stats.js";
import Testimonial from "../sections/Testimonials.js";
import Trusted from "../sections/Trusted.js";
import NavigationArrow from "./ProtectedRoute/NavigationArrow.js";
import { Helmet } from "react-helmet";
import OurStaff from "../sections/OurStaff.js";
export default function Home() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Top-Quality Printing Services | My Printing Service</title>
                <meta name="description" content="My Printing Service offers top-quality printing solutions for all your business and personal needs. From business cards to large format printing, we provide fast, reliable, and affordable services. Contact us today for a quote!" />
                <meta name="keywords" content="printing services, business cards, flyers, posters, large format printing, custom printing, print shop, online printing" />
                <meta name="author" content="My Printing Service" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Top-Quality Printing Services | My Printing Service" />
                <meta property="og:description" content="My Printing Service offers top-quality printing solutions for all your business and personal needs. From business cards to large format printing, we provide fast, reliable, and affordable services. Contact us today for a quote!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="http://mysite.com/example" />
                <meta property="og:image" content="http://mysite.com/images/print-service.jpg" />
                <meta property="og:site_name" content="My Printing Service" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Top-Quality Printing Services | My Printing Service" />
                <meta name="twitter:description" content="My Printing Service offers top-quality printing solutions for all your business and personal needs. From business cards to large format printing, we provide fast, reliable, and affordable services. Contact us today for a quote!" />
                <meta name="twitter:image" content="http://mysite.com/images/print-service.jpg" />
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="alternate" href="http://mysite.com/example" hrefLang="en" />
            </Helmet>
            <NavigationArrow />
            <Hero />

            <div className="mb-4" />
            <div className="border-2 w-[calc(100%-1rem)] max-w-6xl border-colorPrimary rounded-full px-6 mx-auto">

                <Marquee className="px-0" pauseOnHover speed={100}>
                    <pre className="px-0 py-2"> I can be a React component, multiple React components, or just some text. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, laborum.</pre>
                </Marquee>
                {/* <HeroSection /> */}
            </div>
            <Trusted />
            <Stats />
            <RequestService />
            <Testimonial />
            <OurProjectsExample />
            <OurStaff />
            <HowItWorks />
        </>
    );
}
