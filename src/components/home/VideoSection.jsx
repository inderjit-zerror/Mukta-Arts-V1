import React from 'react';
import Image from 'next/image';

const VideoSection = () => {
    return (
        <section className="relative w-full h-[100svh] bg-black overflow-hidden flex items-center justify-center group cursor-pointer">

            {/* Background Image */}
            {/* Using a placeholder for now. Replace src with your actual image path */}
            <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop"
                alt="Video Thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />

            {/* Black Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none"></div>

            {/* Play Button */}
            <div className="relative z-10 w-20 h-16 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-md group-hover:bg-black/80 transition-colors duration-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white ml-1"
                >
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
            </div>

        </section>
    );
};

export default VideoSection;
