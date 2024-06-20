import React from 'react'
import { Helmet } from "react-helmet";
import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';
import { Mail, User } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../components/ui/textarea';
import { VariantHeading } from '../components/Heading';
const Contact = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us | My Printing Service</title>
        <meta name="description" content="Get in touch with My Printing Service for all your printing needs. Contact us at 001234567 or email us at example@gmail.com. Visit us in Buea, Cameroon. We offer top-quality printing solutions for businesses and individuals. Reach out today!" />
        <meta name="keywords" content="contact us, printing services, print shop, business printing, personal printing, customer support, Buea, Cameroon" />
        <meta name="author" content="My Printing Service" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us | My Printing Service" />
        <meta property="og:description" content="Get in touch with My Printing Service for all your printing needs. Contact us at 001234567 or email us at example@gmail.com. Visit us in Buea, Cameroon. We offer top-quality printing solutions for businesses and individuals. Reach out today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://mysite.com/contact" />
        <meta property="og:image" content="http://mysite.com/images/contact-us.jpg" />
        <meta property="og:site_name" content="My Printing Service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | My Printing Service" />
        <meta name="twitter:description" content="Get in touch with My Printing Service for all your printing needs. Contact us at 001234567 or email us at example@gmail.com. Visit us in Buea, Cameroon. We offer top-quality printing solutions for businesses and individuals. Reach out today!" />
        <meta name="twitter:image" content="http://mysite.com/images/contact-us.jpg" />
        <link rel="canonical" href="http://mysite.com/contact" />
        <link rel="alternate" href="http://mysite.com/contact" hrefLang="en" />
      </Helmet>
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, repellat. Fugiat pariatur veritatis cumque. Natus, saepe est. Harum id eligendi alias ipsum? Beatae, neque magni debitis aspernatur temporibus alias eum! */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us | My Printing Service</title>
        <meta name="description" content="Get in touch with My Printing Service for all your printing needs. Contact us at 001234567 or email us at example@gmail.com. Visit us in Buea, Cameroon. We offer top-quality printing solutions for businesses and individuals. Reach out today!" />
        <meta name="keywords" content="contact us, printing services, print shop, business printing, personal printing, customer support, Buea, Cameroon" />
        <meta name="author" content="My Printing Service" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us | My Printing Service" />
        <meta property="og:description" content="Get in touch with My Printing Service for all your printing needs. Contact us at 001234567 or email us at example@gmail.com. Visit us in Buea, Cameroon. We offer top-quality printing solutions for businesses and individuals. Reach out today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://mysite.com/contact" />
        <meta property="og:image" content="http://mysite.com/images/contact-us.jpg" />
        <meta property="og:site_name" content="My Printing Service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | My Printing Service" />
        <meta name="twitter:description" content="Get in touch with My Printing Service for all your printing needs. Contact us at 001234567 or email us at example@gmail.com. Visit us in Buea, Cameroon. We offer top-quality printing solutions for businesses and individuals. Reach out today!" />
        <meta name="twitter:image" content="http://mysite.com/images/contact-us.jpg" />
        <link rel="canonical" href="http://mysite.com/contact" />
        <link rel="alternate" href="http://mysite.com/contact" hrefLang="en" />
      </Helmet>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex- justify-between items-center mb-8">
            {/* <h1 className="text-4xl font-bold">Contact Us</h1>
             */}
            <VariantHeading className='font-black text-4xl text-center '>
              Contact Us

            </VariantHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 max-w-5xl mx-auto gap-8">
            <div className='lg:col-span-6 lg:order-last'>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <form className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="email"
                      className='m-0 text-start font-medium text-sm sm:text-lg mb-1'
                    >Full Name </Label>
                    <div className='flex items-center bg-white focus-within:ring-2 transition-all duration-300 ring-1 ring-colorPrimary rounded-sm overflow-hidden'>
                      <span className='flex-none border-e-[1px] border-colorPrimary flex items-center justify-center size-10'>
                        <User size={20} />
                      </span>
                      <Input type="email" autoComplete='email'
                        className='h-10 flex-1  !shadow-none rounded-none !border-none focus-within:!ring-0 focus-within:border-none focus-within:shadow-none focus:shadow-none focus:border-0 focus:right-0 hover:border-none hover:ring-0'
                        id="email" placeholder="ramatou yoland "

                      />

                    </div>

                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="email"
                      className='m-0 text-start font-medium text-sm sm:text-lg mb-1'
                    >Email Address </Label>
                    <div className='flex items-center bg-white focus-within:ring-2 transition-all duration-300 ring-1 ring-colorPrimary rounded-sm overflow-hidden'>
                      <span className='flex-none border-e-[1px] border-colorPrimary flex items-center justify-center size-10'>
                        <Mail size={20} />
                      </span>
                      <Input type="email" autoComplete='email'
                        className='h-10 flex-1  !shadow-none rounded-none !border-none focus-within:!ring-0 focus-within:border-none focus-within:shadow-none focus:shadow-none focus:border-0 focus:right-0 hover:border-none hover:ring-0'
                        id="email" placeholder="example@gmail.com"

                      />

                    </div>

                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Label htmlFor="email"
                    className='m-0 text-start font-medium text-sm sm:text-lg mb-1'
                  >Your Message </Label>
                  <Textarea
                    // {...register("editSummary")}
                    className='!shadow-none text-lg max-w-[min(calc(100%-0.1rem),40rem)] mx-auto ring-1 ring-colorPrimary rounded-sm  focus-within:ring-colorPrimary focus-within:right-[1px]   focus:shadow-none   focus:ring-1 '>

                  </Textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full px-4 py-2 bg-colorPrimary text-white rounded-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
            <div className='lg:col-span-6'>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <motion.p
                className="mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <strong>Phone:</strong> <a href="tel:001234567" className="text-blue-500">001234567</a>
              </motion.p>
              <motion.p
                className="mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <strong>Email:</strong> <a href="mailto:example@gmail.com" className="text-blue-500">example@gmail.com</a>
              </motion.p>
              <motion.p
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
              >
                <strong>Address:</strong> Buea, Cameroon
              </motion.p>
              <SocialLinks />

              <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
              <motion.p
                className="mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true }}
              >
                Monday - Friday: 9:00 AM - 6:00 PM
              </motion.p>
              <motion.p
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                viewport={{ once: true }}
              >
                Saturday: 10:00 AM - 4:00 PM
              </motion.p>


            </div>
          </div>
          {/* <h2 className="text-2xl font-semibold mb-4">Find Us</h2> */}
          <motion.iframe
            className="w-full max-w-5xl  mx-auto h-72 rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509368!2d144.95373531590428!3d-37.816279742021885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727c4b43ad3d6b!2sBuea%2C%20Cameroon!5e0!3m2!1sen!2sau!4v1597596435564!5m2!1sen!2sau"
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            viewport={{ once: true }}
          ></motion.iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact