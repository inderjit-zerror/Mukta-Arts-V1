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
        pos: "top-[15%] left-[15%]",
        color1: "#c02690",
        color2: "#2d346b"
    },
    {
        title: "Mukta Art Production",
        image: "/img/home/2.jpg",
        desc: "19 films one visionary voice.\nSubhash Ghai reflect a distinctive cinematic vision that has left an enduring mark on Indian cinema. shorter",
        pos: "bottom-[5%] left-[85%]",
        color1: "#a52288",
        color2: "#272a63"
    },
    {
        title: "Mukta VN Films",
        image: "/img/home/3.jpg",
        desc: "19 films one visionary voice.\nSubhash Ghai reflect a distinctive cinematic vision that has left an enduring mark on Indian cinema. shorter",
        pos: "top-[5%] right-[0%]",
        color1: "#7e1c79",
        color2: "#202257"
    },
    {
        title: "Mukta A2 Cinemas",
        image: "/img/home/4.jpg",
        desc: "19 films one visionary voice.\nSubhash Ghai reflect a distinctive cinematic vision that has left an enduring mark on Indian cinema. shorter",
        pos: "bottom-[5%] left-[15%]",
        color1: "#5d186c",
        color2: "#191a4b"
    }
];

const finalColors = {
    color1: "#3c1a5e",
    color2: "#881a28"
};

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

        // 1. Draw SVG
        tl.fromTo(".h-line", { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" }, "start")
            .fromTo(".v-line", { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" }, "start")
            .fromTo(".draw-circle", { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" }, "start")
            .fromTo(".arrowhead", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "start+=1");

        // 2. Text animates from bottom
        tl.fromTo(titlesRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 0.5, stagger: 0.15, duration: 1, ease: "power2.out" },
            "start+=1.5"
        );

        // Hold a little bit before continuing
        tl.to({}, { duration: 0.5 });

        data.forEach((item, i) => {
            // Fade in the title
            tl.to(titlesRef.current[i], { color: "#ffffff", opacity: 1, duration: 1 }, `step${i}`);

            // Change background gradient
            tl.to(containerRef.current, {
                "--color1": item.color1,
                "--color2": item.color2,
                duration: 1
            }, `step${i}`);

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

        // Fade in final text container & change background to final
        tl.to(containerRef.current, {
            "--color1": finalColors.color1,
            "--color2": finalColors.color2,
            duration: 1
        }, "-=1");

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
        <div
            ref={containerRef}
            className="w-full h-[700vh] relative text-white overflow-clip"
            style={{
                "--color1": "#2f496e",
                "--color2": "#2f496e",
                background: "linear-gradient(135deg, var(--color1) 0%, var(--color2) 100%)"
            }}
        >
            <div className="w-full h-[100vh] sticky top-0 left-0 overflow-hidden flex items-center justify-center">

                {/* Background Grid  */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full min-w-[800px] object-cover opacity-60" viewBox="0 0 1478 782" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line className="v-line" x1="739.15" y1="-6.55671e-09" x2="739.15" y2="782" stroke="white" strokeWidth="0.3" pathLength="100" strokeDasharray="100" />
                        <line className="h-line" x1="41" y1="390.85" x2="1437" y2="390.85" stroke="white" strokeWidth="0.3" pathLength="100" strokeDasharray="100" />
                        <circle className="draw-circle" cx="739" cy="391" r="239.85" stroke="white" strokeWidth="0.3" pathLength="100" strokeDasharray="100" />
                        <circle className="draw-circle" cx="739" cy="391" r="400.85" stroke="white" strokeWidth="0.3" pathLength="100" strokeDasharray="100" />
                        <path className="arrowhead" d="M1437 386L1478 391.5L1437 396V386Z" fill="#D9D9D9" fillOpacity="0.4" />
                        <path className="arrowhead" d="M41 386L0 391.5L41 396V386Z" fill="#D9D9D9" fillOpacity="0.4" />
                    </svg>
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