'use client'

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const textContent = "Founded In 2006 By Subhash Ghai Inside Mumbai's Filmcity, Whistling Woods International Is India's Premier Media And Creative Arts Institute. Ranked Among The World's Top 10 Film Schools By The Hollywood Reporter, WWI Sets The Standard For Media, Tech, And Entertainment Education.";

const WWStats = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // Text Reveal Animation on Scroll
        const words = textRef.current.querySelectorAll('.word');

        gsap.fromTo(words,
            { color: "#C0C0C0" }, // Initial gray state
            {
                color: "#000000",
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    end: "bottom 40%",
                    scrub: 1,
                }
            }
        );

        // Stats Columns Animation
        gsap.from(".stat-col", {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".stats-container",
                start: "top 85%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-[#FAFAFA] py-24 md:py-32 lg:py-40  px-4 md:px-8 lg:px-16 overflow-hidden">
            <div className=" mx-auto">

                {/* Scroll Reveal Text */}
                <div className="mb-32 md:mb-48 flex justify-center">
                    <h5
                        ref={textRef}
                        className="text-[28px] md:text-4xl lg:text-[2.75rem] text-center w-2/3 leading-[1.3] font-medium tracking-tight"
                    >
                        {textContent.split(" ").map((word, index) => (
                            <span key={index} className="word inline-block mr-[0.25em]">
                                {word}
                            </span>
                        ))}
                    </h5>
                </div>

                {/* Stats Grid */}
                <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24">

                    {/* Stat 1 */}
                    <div className="stat-col flex flex-col justify-between border-l border-[#D4D4D4] pl-6 lg:pl-10 min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
                        <h3 className="text-4xl md:text-[42px] font-normal text-black tracking-tight">18+</h3>
                        <p className="text-[#555] text-[14px] md:text-[15px] leading-relaxed pr-4">
                            For over 18 years, WWI has shaped creative talent through world-class education, industry exposure, and hands-on learning.
                        </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="stat-col flex flex-col justify-between border-l border-[#D4D4D4] pl-6 lg:pl-10 min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
                        <h3 className="text-4xl md:text-[42px] font-normal text-black tracking-tight">4,000+</h3>
                        <p className="text-[#555] text-[14px] md:text-[15px] leading-relaxed pr-4">
                            A global community of 4,000+ alumni shaping successful careers across film, media, communication, and the creative industries.
                        </p>
                    </div>

                    {/* Stat 3 */}
                    <div className="stat-col flex flex-col justify-between border-l border-[#D4D4D4] pl-6 lg:pl-10 min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
                        <h3 className="text-4xl md:text-[42px] font-normal text-black tracking-tight">1,300+</h3>
                        <p className="text-[#555] text-[14px] md:text-[15px] leading-relaxed pr-4">
                            A vibrant community of 1,300+ students pursuing diverse undergraduate, postgraduate, and diploma programs.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WWStats;
