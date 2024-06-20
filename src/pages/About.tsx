import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { VariantHeading } from '../components/Heading';
import Stats from '../sections/Stats';
import Trusted from "../sections/Trusted.js";

function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Mock data for services
  const services = [
    {
      title: 'Digital Printing',
      description: 'High-quality digital printing for various types of documents and marketing materials.',
      icon: '💻'
    },
    {
      title: 'Offset Printing',
      description: 'Traditional offset printing services for large quantities and precise color reproduction.',
      icon: '🖨️'
    },
    {
      title: 'Large Format Printing',
      description: 'Large format printing solutions for posters, banners, and signage.',
      icon: '📏'
    },
    {
      title: 'Custom Printing Projects',
      description: 'Customized printing services tailored to meet specific business and personal needs.',
      icon: '🎨'
    }
  ];

  return (
    <div >
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us | My Printing Service</title>
        <meta name="description" content="Learn more about My Printing Service. We provide high-quality printing solutions for businesses and individuals. Our services include digital printing, offset printing, large format printing, and more. Get in touch with us today!" />
        <meta name="keywords" content="about us, printing service, print shop, digital printing, offset printing, large format printing, business printing, personal printing" />
        <meta name="author" content="My Printing Service" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About Us | My Printing Service" />
        <meta property="og:description" content="Learn more about My Printing Service. We provide high-quality printing solutions for businesses and individuals. Our services include digital printing, offset printing, large format printing, and more. Get in touch with us today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://mysite.com/about" />
        <meta property="og:image" content="http://mysite.com/images/about-us.jpg" />
        <meta property="og:site_name" content="My Printing Service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | My Printing Service" />
        <meta name="twitter:description" content="Learn more about My Printing Service. We provide high-quality printing solutions for businesses and individuals. Our services include digital printing, offset printing, large format printing, and more. Get in touch with us today!" />
        <meta name="twitter:image" content="http://mysite.com/images/about-us.jpg" />
        <link rel="canonical" href="http://mysite.com/about" />
        <link rel="alternate" href="http://mysite.com/about" hrefLang="en" />
      </Helmet>
      <div className="min-h-screen text-gray-900 dark:text-gray-100 max-w-6xl mx-auto">
        <div className=' bg-red-400-- relative'>
          <div className="absolute inset-0 bg-colorPrimary/80 flex items-center justify-center flex-col">

            <VariantHeading className='font-black text-6xl uppercase absolute italic !opacity-40 text-orange-300'>
              About us
            </VariantHeading>
            <p className='text-white px-4 max-w-2xl'>
              My Printing Service is a trusted provider of comprehensive printing solutions. Established with a passion for print and a commitment to quality, we serve businesses and individuals with a wide range of printing needs.
              At My Printing Service, we understand the importance of effective communication through print. Whether you need promotional materials, business documents, or personal projects, our goal is to exceed your expectations with every print job.
            </p>
          </div>
          <img 
          
          src="https://d1nuzn6tpp7gri.cloudfront.net/public/pictures/W1siZiIsIjIwMjMvMTIvMjkvMTYvNTgvNDEvYzViOWRiYTQtZThiOC00OGQ4LTg5NDAtMzYwN2QwNWU1NDc3L0lNR18wOTEzLmpwZyJdLFsicCIsImVuY29kZSIsImpwZWciLCItcXVhbGl0eSA4NSJdXQ/c5011f1c91b3ed5d/IMG_0913.jpeg?name=IMG+0913"
           className='inset-0 size-full max-h-[min(calc(100vh-4rem),30rem)]' alt="someimage" />

        </div>

        <Stats />
        <Trusted/>
        

        <div className="container mx-auto p-4">
         
          <div className="grid- grid-cols-1  gap-8 hidden">
      
            <div className="space-y-4">
              <motion.h2
                className="text-2xl font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our Services
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center bg-blue-500 rounded-full w-12 h-12 text-white mb-4">
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </motion.div>
                ))}
              </div>
              <motion.h2
                className="text-2xl font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Our Team
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Meet the dedicated professionals behind My Printing Service. Our team brings together years of experience and expertise in the printing industry. We are committed to delivering exceptional results and ensuring your satisfaction with every project.
              </motion.p>
              <motion.h2
                className="text-2xl font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                Our Values
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                At My Printing Service, integrity, creativity, and customer satisfaction are at the heart of everything we do. We believe in fostering long-term relationships with our clients based on trust, transparency, and quality service. Our commitment to excellence drives us to continuously improve and innovate in the printing industry.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AboutPage;
