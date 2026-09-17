import React from 'react';

export default function Footer() {
  return (
    <div id="footer" className="min-h-screen bg-[#0474BA] text-white flex flex-col font-sans relative overflow-hidden">

      {/* Top Navigation / Stats Bar */}
      <div className="w-full flex flex-wrap justify-between items-center px-4 md:px-8 py-4 text-[10px] md:text-xs font-semibold tracking-wider uppercase opacity-90">
        <span className="flex items-center gap-2"><span className="text-sm">★</span> 4000+ Graduates</span>
        <span className="flex items-center gap-2"><span className="text-sm">★</span> 1300+ Students</span>
        <span className="flex items-center gap-2"><span className="text-sm">★</span> Since 1978</span>
        <span className="flex items-center gap-2"><span className="text-sm">★</span> Padma Shri</span>
        <span className="flex items-center gap-2"><span className="text-sm">★</span> Filmfare Legacy</span>
        <span className="flex items-center gap-2"><span className="text-sm">★</span> Whistling Woods</span>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 lg:px-32 py-12 lg:py-20 ">

        {/* HEADPHONE */}
        <div id="footer-headphone" className="w-full bg- lg:w-1/2 flex justify-center lg:justify-start mb-12 lg:mb-0 min-h-[300px]">

        </div>

        {/* Right Column - Text & Call to Action */}
        <div className="w-full lg:w-1/2 flex flex-col items-start max-w-xl relative z-20">
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-medium leading-tight mb-6">
            Have something<br />
            worth Sharing?<br />
            Let the world know<br />
            your story.
          </h1>

          <h3 className=" tracking-tighter  capitalize mb-6">
            Have a story that deserves to be seen? Share your script
            with Mukta Arts and give your idea the opportunity to
            grow into a powerful cinematic experience, brought to
            life with the craft, creativity, and vision of a team that has
            been telling stories for generations.
          </h3>

          <button className="bg-white text-[#22385b] px-6 py-2.5 text-sm font-semibold  shadow-md hover:bg-gray-100 transition-colors mb-16">
            Submit Script
          </button>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {/* YouTube */}
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            {/* X (Twitter) */}
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </main>

      {/* Huge Background Bottom Text */}
      <div className=" -bottom-8 md:-bottom-16 left-4 md:left-12 z-0 overflow-visible pointer-events-none px-10">
        <h1 className="text-[120px] md:text-[180px] lg:text-[240px] font-bold leading-none tracking-tight whitespace-nowrap text-white flex items-start">
          Mukta Arts
          <h4 className="text-3xl md:text-5xl lg:text-6xl font-normal mb-auto ">
            LTD
          </h4>
        </h1>
      </div>
    </div>
  );
}