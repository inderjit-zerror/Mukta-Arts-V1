"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const data = [
    {
        title: "Whistling Woods",
        image: "/img/home/1.jpg",
        desc: "19 films one visionary voice.\nSubhash Ghai reflect a distinctive cinematic vision that has left an enduring mark on Indian cinema. shorter",
        pos: "top-[15%] left-[15%]"
    },
    {
        title: "Mukta Art Production",
        image: "/img/home/2.jpg",
        desc: "19 films one visionary voice.\nSubhash Ghai reflect a distinctive cinematic vision that has left an enduring mark on Indian cinema. shorter",
        pos: "bottom-[5%] left-[85%]"
    },
    {
        title: "Mukta VN Films",
        image: "/img/home/3.jpg",
        desc: "19 films one visionary voice.\nSubhash Ghai reflect a distinctive cinematic vision that has left an enduring mark on Indian cinema. shorter",
        pos: "top-[5%] right-[0%]"
    },
    {
        title: "Mukta A2 Cinemas",
        image: "/img/home/4.jpg",
        desc: "19 films one visionary voice.\nSubhash Ghai reflect a distinctive cinematic vision that has left an enduring mark on Indian cinema. shorter",
        pos: "bottom-[5%] left-[15%]"
    }
];

const Elder = () => {
    const containerRef = useRef(null);
    const listRef = useRef(null);
    const titlesRef = useRef([]);
    const popupsRef = useRef([]);
    const finalRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        data.forEach((_, i) => {
            // Fade in the title
            tl.to(titlesRef.current[i], { color: "#ffffff", opacity: 1, duration: 1 }, `step${i}`);

            // Continuous vertical parallax movement
            tl.fromTo(popupsRef.current[i],
                { y: "60vh" },
                { y: "-60vh", duration: 3.5, ease: "none" },
                `step${i}`
            );

            // Fade in the popup
            tl.fromTo(popupsRef.current[i],
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 1 },
                `step${i}`
            );

            // Hold for a bit
            tl.to({}, { duration: 1.5 }, `step${i}+=1`);

            // Fade them out if not the last item
            if (i !== data.length - 1) {
                tl.to(titlesRef.current[i], { color: "#5c6d86", opacity: 0.5, duration: 1 }, `end${i}`);
                tl.to(popupsRef.current[i], { autoAlpha: 0, duration: 1 }, `end${i}`);
            } else {
                // Last item: fade out the whole list and the popup
                tl.to(listRef.current, { autoAlpha: 0, y: -50, duration: 2 }, `end${i}`);
                tl.to(popupsRef.current[i], { autoAlpha: 0, duration: 1 }, `end${i}`);
            }
        });

        // Fade in final text container
        tl.to(finalRef.current, { autoAlpha: 1, duration: 0.1 }, "-=1");

        // Animate words staggered
        tl.to(".final-word", {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out"
        }, "-=1");

        // Hold final text
        tl.to({}, { duration: 2 });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full h-[600vh] relative bg-[#2f496e] text-white overflow-clip">
            <div className="w-full h-[100vh] sticky top-0 left-0 overflow-hidden flex items-center justify-center">

                {/* Background Grid  */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center ">

                    {/* <div className="absolute w-[96vw] max-w-full flex items-center justify-between top-1/2 -translate-y-1/2 z-0">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-white">
                            <polygon points="16,4 0,8 16,12" />
                        </svg>
                        <div className="absolute left-3 right-3 h-[1px] bg-white/40"></div>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-white">
                            <polygon points="0,4 16,8 0,12" />
                        </svg>
                    </div>

                  
                    <div className="absolute h-full w-[1px] bg-white/40 left-1/2 -translate-x-1/2 z-0"></div>

                   
                    <div className="absolute w-[35vw] h-[35vw] min-w-[300px] min-h-[300px] rounded-full border border-white/40 z-0"></div>
                    <div className="absolute w-[65vw] h-[65vw] min-w-[600px] min-h-[600px] rounded-full border border-white/40 z-0"></div> */}

                    <img src="/img/home/BGt.png" alt="IMG" className='w-full h-full object-cover object-center' />
                </div>

                {/* List Container */}
                <div ref={listRef} className="relative z-10 flex flex-col items-center gap-1 md:gap-2">
                    {data.map((item, i) => (
                        <h2
                            key={i}
                            ref={el => titlesRef.current[i] = el}
                            className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-[#5c6d86] opacity-50"
                        >
                            {item.title}
                        </h2>
                    ))}
                </div>

                {/* Popups */}
                {data.map((item, i) => (
                    <div
                        key={i}
                        ref={el => popupsRef.current[i] = el}
                        className={`absolute z-20 w-64 md:w-80 lg:w-96 flex flex-col gap-3 opacity-0 invisible transform -translate-x-1/2 ${item.pos}`}
                    >
                        <div className="w-full aspect-video relative overflow-hidden shadow-2xl rounded-sm">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-base md:text-lg lg:text-xl mb-1">{item.desc.split('\n')[0]}</h3>
                            <p className="text-white/70 text-xs md:text-sm">{item.desc.split('\n')[1]}</p>
                        </div>
                    </div>
                ))}

                {/* Final Text */}
                <div
                    ref={finalRef}
                    className="absolute z-30 w-full max-w-5xl px-6 md:px-12 opacity-0 invisible"
                >
                    <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white/90 flex flex-wrap gap-x-2 md:gap-x-3 gap-y-2">
                        {"For over four decades, Mukta Arts has shaped Indian cinema through unforgettable stories, visionary filmmaking, and a lasting passion for the art of storytelling."
                            .split(" ")
                            .map((word, i) => (
                                <span
                                    key={i}
                                    className={`final-word opacity-0 translate-y-8 inline-block ${i >= 4 ? 'text-[#e2a866]' : ''}`}
                                >
                                    {word}
                                </span>
                            ))}
                    </h4>
                </div>

            </div>
        </div>
    );
};

export default Elder;