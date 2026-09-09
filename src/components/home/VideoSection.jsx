import React from 'react';
import Image from 'next/image';

const VideoSection = () => {
    return (
        <section className="relative w-full h-[100svh] bg-black overflow-hidden flex items-center justify-center group cursor-pointer">


            <video
                src="/video/video.mp4"
                loop muted autoPlay
                alt="Video Thumbnail"
                className="absolute inset-0 w-full h-full object-cover  scale-[2] group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />

            {/* Black Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none"></div> */}


        </section>
    );
};

export default VideoSection;
