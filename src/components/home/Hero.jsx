import React from 'react';
import HeadphonesCanvas from './HeadphonesModel';

const Hero = () => {
  return (
    <section className="relative w-full h-[100svh] bg-white px-10 py-10 text-black overflow-hidden flex flex-col items-center justify-between">

      {/* Huge Background Text */}
      <div className="  w-full  text-center flex justify-start items-start z-0 select-none pointer-events-none">
        <h1 className="text-[16vw] leading-none font-medium tracking-tight whitespace-nowrap text-black m-0 p-0 flex items-start">
          Mukta Arts
          <span className="text-[3vw] font-bold mt-[2.5vw] ml-1 tracking-normal">Pvt</span>
        </h1>
      </div>

      {/* 3D Headphones Model */}
      <HeadphonesCanvas />

      {/* Bottom Left Content */}
      <div className=" z-20 max-w-[280px] md:max-w-[340px]  justify-start mr-auto">
        <h3 className=" tracking-tighter max-w-[600px] capitalize   mb-6">
          Mukta Arts Limited is one of India's leading production houses with business interests across the entertainment spectrum from Exhibition to Education.
        </h3>
        <button className="bg-[#0474BA] hover:bg-[#0666a1] text-white px-5 py-2.5 text-xs md:text-sm tracking-wide font-medium rounded-[3px] flex items-center gap-3 transition-colors cursor-pointer group">
          About Us
          <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

    </section>
  );
};

export default Hero;