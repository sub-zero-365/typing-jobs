import React from "react";
import Trusted from "../sections/Trusted.js";
import Hero from "../components/Hero/Hero.js";
import HowItWorks from "../sections/HowItWorks.js";
import RequestService from "../sections/RequestService.js";
import Stats from "../sections/Stats.js";
import Testimonial from "../sections/Testimonials.js";
import NavigationArrow from "./ProtectedRoute/NavigationArrow.js";

export default function Home() {
    return (
        <>
            <NavigationArrow />
            <Hero />
            <Trusted />
            <Stats />
            <RequestService />
            <Testimonial />
            <HowItWorks />
        </>
    );
}
