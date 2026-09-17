"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const data = [
    {
        title: "Whistling Woods",
        image: "/img/ma/WhistlingWoods.jpg",
        shortDesc: "Whistling Woods International (WWI) is India's premier institute for film, communication, and creative and performing arts.",
        fullDesc: "Whistling Woods International (WWI) is India's premier institute for film, communication, and creative and performing arts. Founded in 2006, it has grown into one of the country's most respected names in media and entertainment education, training students across cinematography, direction, editing, production, screenwriting, animation, acting, music, design, journalism and more. WWI's degree and diploma programs are offered in partnership with the Tata Institute of Social Sciences (TISS), and its curriculum blends theoretical grounding with hands-on, industry-oriented learning, supported by technology partnerships with global names including Apple, Google, Adobe, Sony, Epic Games and Intel. Spread across a 5.5-acre campus, the institute brings together state-of-the-art infrastructure, industry-grade technology and dedicated facilities for all programmes. Since its first graduating batch in 2008, WWI has trained over 4,000 alumni, with 1,300 students currently enrolled. Its standing has been recognised internationally: The Hollywood Reporter has repeatedly rated it among the ten best film schools in the world, Forbes named it a Global Institute of Influence in 2015, and FICCI honoured it as India's Best Institute for Creative and Performing Arts in 2019. WWI remains true to the vision it was founded on, that India's creative industries deserve a world-class institution of their own, one built to train not just technicians, but the storytellers, artists and innovators shaping the future of media and entertainment.",
        website: "https://www.whistlingwoods.net/",
        pos: "top-[15%] left-[15%]",
        color1: "#c02690",
        color2: "#2d346b"
    },
    {
        title: "Mukta Art Production",
        image: "/img/ma/MuktaArtProduction.png",
        shortDesc: "Subhash Ghai is one of Indian cinema’s most influential figures, a filmmaker and visionary who went beyond making films to build an ecosystem around them.",
        fullDesc: "PRODUCTION - MAL Filmmography (Features, Regional, Select, Shorts)\n\nSUBHASH GHAI\nFounder & Chairman, Mukta Arts Ltd.\n\nSubhash Ghai is one of Indian cinema’s most influential figures, a filmmaker and visionary who went beyond making films to build an ecosystem around them. Over more than five decades, he has shaped Hindi cinema across every facet of the industry, as a storyteller behind the camera, as a producer and entrepreneur who built one of India’s leading entertainment companies, and as an institution-builder who extended his vision into distribution, exhibition and education. His work has helped create an enterprise that spans the journey of a film from creation to audience, while contributing to the growth and evolution of the wider Indian entertainment industry. Across a career spanning 19 films, 14 of which became hits or blockbusters, Ghai has told stories that explore love, ambition, family, identity, society and the human condition. From Karz, Hero and Ram Lakhan to Saudagar, Khal Nayak, Pardes and Taal, his work has introduced audiences to indelible characters, music and storytelling that continue to resonate across generations. In 1978, he founded Mukta Films, which grew into Mukta Arts Ltd., evolving from a production house into a broader entertainment enterprise spanning production, distribution and exhibition. Taking the company public in 2000 reflected his larger vision of bringing structure, professionalism and institutional rigour to the Indian film business. He has been equally invested in creating opportunities for others. In 2006, he founded Whistling Woods International, driven by the conviction that India's growing creative industries needed a world-class institution dedicated to nurturing talent. The institute has since trained thousands of students across filmmaking, acting, music, animation, media and other creative disciplines, many of whom have gone on to build accomplished careers across the industry. Beyond his films and institutions, Ghai has consistently used cinema as a lens on society and its shifting aspirations, reflecting the cultural landscape of its time while creating space for new voices and new forms of creative expression. Today, he continues to guide Mukta Arts as its Founder and Chairman, with a vision that reaches beyond producing films, toward growing Indian cinema, nurturing creative talent and building institutions that shape its future.",
        website: "https://muktaarts.com",
        pos: "bottom-[5%] left-[85%]",
        color1: "#a52288",
        color2: "#272a63"
    },
    {
        title: "Mukta VN Films",
        image: "/img/ma/MuktaVNFilms.jpg",
        shortDesc: "Mukta VN Films is Mukta Arts’ film programming and distribution services venture, established in 2014 as a joint venture with UFO Moviez.",
        fullDesc: "Mukta VN Films is Mukta Arts’ film programming and distribution services venture, established in 2014 as a joint venture with UFO Moviez. The company manages film programming across a growing network of cinemas nationwide, working at the intersection of content, exhibition and audience demand. Building on Mukta Arts’ longstanding experience in film programming, Mukta VN Films works with cinema operators to curate and schedule content across screens, balancing film availability, audience preferences and market dynamics. Mukta Arts’ programming legacy dates back to its earlier Mukta Movies Distributors division, which provided programming services to several of India’s leading multiplex and single-screen chains during their early stages of growth, including PVR, INOX, Cinepolis, Big Cinemas, Fame, Fun Cinemas, DT and Carnival Cinemas. Today, Mukta VN Films manages programming for around 195 screens across India, continuing Mukta Arts’ role in connecting films with audiences and helping shape what plays on screens across the country.",
        website: null,
        pos: "top-[5%] right-[0%]",
        color1: "#7e1c79",
        color2: "#202257"
    },
    {
        title: "Mukta A2 Cinemas",
        image: "/img/ma/MuktaA2Cinemas.jpg",
        shortDesc: "Mukta A2 Cinemas is the exhibition arm of Mukta Arts, founded with a vision to make the big-screen experience accessible to audiences across India.",
        fullDesc: "Mukta A2 Cinemas is the exhibition arm of Mukta Arts, founded with a vision to make the big-screen experience accessible to audiences across India. Built around the idea of offering quality cinema at affordable prices, the brand has grown into a diverse cinema exhibition network spanning established and emerging markets. Today, Mukta A2 Cinemas operates 73 screens across 26 locations in India, alongside 16 screens through its joint venture with Asian Cinemas. Its international presence includes six screens in Bahrain, with the company also managing an additional 10 screens in the country and expanding its cinema management operations into Saudi Arabia. The cinemas combine modern projection and sound technology with comfortable seating, food and beverage offerings and a focus on delivering an accessible, high-quality movie-going experience. From major cities to emerging Tier II and Tier III markets, Mukta A2 Cinemas continues to take the magic of the big screen to a wider and more diverse audience.",
        website: "https://muktaa2cinemas.in/",
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
    const [activeItem, setActiveItem] = useState(null);

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

            // Change background gradient smoothly over the entire scroll of this item
            tl.to(containerRef.current, {
                "--color1": item.color1,
                "--color2": item.color2,
                duration: 3.5,
                ease: "power1.inOut"
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

        // Fade in final text container & change background to final smoothly
        tl.to(containerRef.current, {
            "--color1": finalColors.color1,
            "--color2": finalColors.color2,
            duration: 3,
            ease: "power1.inOut"
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

    }, { scope: containerRef, dependencies: [] });

    return (
        <div
            ref={containerRef}
            className="w-full h-[1000vh] relative z-[888] text-white overflow-clip"
            style={{
                "--color1": "#0474BA",
                "--color2": "#0474BA",
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
                <div ref={listRef} className="relative z-10 flex flex-col items-center gap-1 md:gap-2 pointer-events-none">
                    {data.map((item, i) => (
                        <h2
                            key={i}
                            ref={el => titlesRef.current[i] = el}
                            className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-[#7889a1] opacity-50"
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
                        className={`absolute z-[888] w-64 md:w-80 lg:w-96 flex flex-col gap-3 opacity-0 invisible transform -translate-x-1/2 ${item.pos}`}
                    >
                        <div className="w-full aspect-video relative overflow-hidden shadow-2xl rounded-sm">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-base md:text-lg lg:text-xl mb-1">{item.title}</h3>
                            <p className="text-white/70 text-xs md:text-sm line-clamp-3">{item.shortDesc}</p>

                            <div className="flex justify-between items-center mt-4 relative z-[9999]">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setActiveItem(item); }}
                                    className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                                >
                                    +
                                </button>
                                {item.website && (
                                    <a
                                        href={item.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-xs uppercase tracking-widest border-b border-white/40 hover:border-white text-white/80 hover:text-white transition-colors pb-0.5 cursor-pointer py-2"
                                    >
                                        Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Final Text */}
                <div
                    ref={finalRef}
                    className="absolute z-30 w-full max-w-5xl px-6 md:px-12 opacity-0 invisible pointer-events-none"
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

                {/* Sidebar for Full Description */}
                <div
                    className={`fixed top-0 right-0 h-[100dvh] w-full md:w-[50vw] bg-[#0474BA] backdrop-blur-2xl border-l border-white/10 z-[888] transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeItem ? 'translate-x-0' : 'translate-x-full'} pointer-events-auto shadow-2xl flex flex-col`}
                >
                    <button
                        onClick={() => setActiveItem(null)}
                        className="absolute top-4 left-4 md:top-8 md:left-8 text-white text-1xl font-extralight hover:text-white/60 transition-colors cursor-pointer w-12 h-12 flex items-center justify-center z-20 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full"
                    >
                        ✕
                    </button>

                    <div className="flex-1 overflow-y-auto p-6 pt-20 md:p-16 lg:p-20 flex flex-col">
                        {activeItem && (
                            <>
                                {/* <div className="w-full aspect-video rounded-sm overflow-hidden mb-10 flex-shrink-0 shadow-2xl relative">
                                    <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                                    <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
                                </div> */}

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-wide">{activeItem.title}</h2>

                                <p className="text-white/80 text-sm md:text-base lg:text-lg font-light leading-relaxed whitespace-pre-wrap">
                                    {activeItem.fullDesc}
                                </p>

                                {activeItem.website && (
                                    <div className="mt-12 mb-4">
                                        <a
                                            href={activeItem.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black hover:bg-gray-200 text-xs md:text-sm font-medium tracking-[0.2em] uppercase transition-colors"
                                        >
                                            Visit Website
                                        </a>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Elder;