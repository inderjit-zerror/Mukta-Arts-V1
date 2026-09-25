"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; // Let's use useGSAP as it is installed

const slides = [
  {
    title: "Film Legacy",
    year: "1978",
    desc: "Founded by Subhash Ghai, Mukta Arts has played a defining role in shaping Indian cinema through decades of iconic films, powerful storytelling, memorable music, and unforgettable characters. Its landmark productions have created lasting cultural milestones, connecting with audiences across generations while setting new standards in mainstream Indian entertainment.",
    bg: "/img/last/1.jpg"
  },
  {
    title: "Film First",
    year: "1980",
    desc: "Continuing the tradition of storytelling, we have always put the film first. Every script, every character, and every scene is meticulously crafted to deliver an unforgettable cinematic experience. Our commitment to quality has resulted in some of the most beloved and critically acclaimed movies in the industry.",
    bg: "/img/last/2.avif"
  },
  {
    title: "Media",
    year: "2000",
    desc: "Expanding beyond traditional filmmaking, Mukta Arts has embraced the digital revolution. From state-of-the-art post-production facilities to comprehensive media education at Whistling Woods International, we are building a holistic media ecosystem that nurtures talent and pushes the boundaries of entertainment.",
    bg: "/img/last/3.jpg"
  }
];

const FilmLegacy = () => {
  const containerRef = useRef(null);
  const titlesContainerRef = useRef(null);
  const bgRefs = useRef([]);
  const titleRefs = useRef([]);
  const indexRefs = useRef([]);
  const yearRefs = useRef([]);
  const descRefs = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    slides.forEach((slide, i) => {
      if (i === 0) return;

      const prevTitle = titleRefs.current[i - 1];
      const currentTitle = titleRefs.current[i];
      const currentBg = bgRefs.current[i];

      const prevDesc = descRefs.current[i - 1];
      const currentDesc = descRefs.current[i];

      const prevIndex = indexRefs.current[i - 1];
      const currentIndex = indexRefs.current[i];

      const prevYear = yearRefs.current[i - 1];
      const currentYear = yearRefs.current[i];

      const firstTitleOffset = titleRefs.current[0].offsetLeft;
      const currentTitleOffset = currentTitle.offsetLeft;
      const moveX = -(currentTitleOffset - firstTitleOffset);

      tl.addLabel(`slide${i}`)

        // Background crossfade
        .to(currentBg, { opacity: 1, duration: 1, ease: "none" }, `slide${i}`)

        // Move titles container
        .to(titlesContainerRef.current, { x: moveX, duration: 1, ease: "power2.inOut" }, `slide${i}`)

        // Title opacities
        .to(prevTitle, { opacity: 0.3, duration: 1, ease: "power2.inOut" }, `slide${i}`)
        .to(currentTitle, { opacity: 1, duration: 1, ease: "power2.inOut" }, `slide${i}`)

        // Animate out previous content
        .to([prevDesc, prevIndex, prevYear], {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power1.in"
        }, `slide${i}`)

        // Animate in current content
        .to([currentDesc, currentIndex, currentYear], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power1.out"
        }, `slide${i}+=0.6`);
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, i) => (
          <div
            key={`bg-${i}`}
            ref={el => bgRefs.current[i] = el}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.bg})`,
              opacity: i === 0 ? 1 : 0
            }}
          >
            <div className="absolute inset-0 bg-black/60 md:bg-black/80 backdrop-blur-[2px]"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center bg">

        {/* Titles Container */}
        <div className="w-full overflow-hidden mb-12 md:mb-16 ">
          <div className="pl-4 md:pl-10">
            <div className="flex items-center gap-12 md:gap-32 whitespace-nowrap w-max relative" ref={titlesContainerRef}>
              {slides.map((slide, i) => (
                <h2
                  key={`title-${i}`}
                  ref={el => titleRefs.current[i] = el}
                  className="text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tight text-white"
                  style={{ opacity: i === 0 ? 1 : 0.3 }}
                >
                  {slide.title}
                </h2>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Line & Meta Info */}
        <div className="w-full flex items-center px-4 md:px-10 mb-12 md:mb-20">
          <div className="relative w-8 md:w-12 h-6 overflow-hidden">
            {slides.map((slide, i) => (
              <div
                key={`index-${i}`}
                ref={el => indexRefs.current[i] = el}
                className="absolute top-0 left-0 text-sm md:text-base font-mono tracking-widest text-white"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {i + 1}/{slides.length}
              </div>
            ))}
          </div>

          <div className="flex-1 h-[1px] bg-white/30 mx-4 md:mx-8"></div>

          <div className="relative w-12 ml-auto md:w-16 h-6 overflow-hidden text-right">
            {slides.map((slide, i) => (
              <div
                key={`year-${i}`}
                ref={el => yearRefs.current[i] = el}
                className="absolute top-0 right-0 text-sm md:text-base font-mono tracking-widest text-white"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {slide.year}
              </div>
            ))}
          </div>
        </div>

        {/* Descriptions */}
        <div className="relative w-full px-4 md:px-[15%] flex justify-center h-[200px]">
          <div className="relative w-full md:w-[700px] lg:w-[800px]">
            {slides.map((slide, i) => (
              <div
                key={`desc-${i}`}
                ref={el => descRefs.current[i] = el}
                className="absolute top-0 left-0 w-full"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <p className="text-[15px] md:text-lg leading-[1.7] text-gray-200 text-center md:text-left">
                  {slide.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FilmLegacy;
