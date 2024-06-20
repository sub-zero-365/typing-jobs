import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
// import 'swiper/swiper-bundle.min.css';

interface Video {
  url: string;
  title: string;
  fallbackImage: string;
}

const HeroSection: React.FC = () => {
  const videos: Video[] = [
    { url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', title: 'Video 1', fallbackImage: 'https://www.example.com/image1.jpg' },
    { url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', title: 'Video 2', fallbackImage: 'https://www.example.com/image2.jpg' },
    { url: 'https://www.youtube.com/watch?v=yg8116aeD7E', title: 'Video 3', fallbackImage: 'https://www.example.com/image3.jpg' },
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="h-full"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index} className="relative">
            <VideoSlide video={video} />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {video.title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Your subtitle or description goes here.
              </motion.p>
              <motion.a
                href="#your-link"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Call to Action
              </motion.a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

interface VideoSlideProps {
  video: Video;
}

const VideoSlide: React.FC<VideoSlideProps> = ({ video }) => {
  const [showFallback, setShowFallback] = useState<boolean>(false);

  return (
    <>
      {showFallback ? (
        <img
          src={video.fallbackImage}
          alt={video.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <ReactPlayer
          url={video.url}
          className="absolute top-0 left-0 w-full h-full object-cover"
          playing
          loop
          muted
          width="100%"
          height="100%"
          onError={() => setShowFallback(true)}
        />
      )}
    </>
  );
};

export default HeroSection;
