"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PartnersSection() {
    const sectionRef = useRef(null);

    // GSAP Animations
    useGSAP(() => {
        const tl = gsap.timeline();

        // Animate the heading
        tl.fromTo(
            ".heading",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        // Stagger animate the partner cards
        tl.fromTo(
            ".partner-card",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" },
            "-=0.4"
        );
    }, { scope: sectionRef });

    const partners = [
        {
            id: 1,
            description: "Advanced cinema audio and immersive sound technology enhancing every production experience.",
            logo: (
                <div className="flex items-center text-black">
                    <svg viewBox="0 0 90 24" height="24" className="w-auto h-7 fill-current">
                        {/* Double-D Box */}
                        <rect x="0" y="0" width="36" height="24" rx="0" fill="currentColor" />
                        <path d="M 9 5 L 14 5 C 17.8 5 21 8.2 21 12 C 21 15.8 17.8 19 14 19 L 9 19 Z" fill="white" />
                        <path d="M 27 5 L 22 5 C 18.2 5 15 8.2 15 12 C 15 15.8 18.2 19 22 19 L 27 19 Z" fill="white" />
                        {/* Text */}
                        <text x="42" y="19" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" fill="currentColor" letterSpacing="-0.5">Dolby</text>
                    </svg>
                </div>
            ),
        },
        {
            id: 2,
            description: "Professional cinema cameras, lighting systems, and advanced film technology supporting high-quality productions.",
            logo: (
                <div className="flex items-center text-[#005596]">
                    <svg viewBox="0 0 90 24" height="24" className="w-auto h-7 fill-current">
                        <text x="0" y="20" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="26" fill="currentColor" letterSpacing="-1">ARRI</text>
                        <circle cx="68" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
                        <text x="66" y="10" fontFamily="Arial, sans-serif" fontSize="6" fill="currentColor">R</text>
                    </svg>
                </div>
            ),
        },
        {
            id: 3,
            description: "Professional imaging and cinema optics by Canon, delivering precision, clarity, and exceptional visual performance.",
            logo: (
                <div className="flex items-center text-[#cc0000]">
                    <svg viewBox="0 0 90 24" height="24" className="w-auto h-8 fill-current">
                        <text x="0" y="22" fontFamily="'Times New Roman', Times, serif" fontWeight="bold" fontStyle="italic" fontSize="30" fill="currentColor" letterSpacing="-2">Canon</text>
                    </svg>
                </div>
            ),
        },
    ];

    // Render one identical "block" of cards, used twice below for a seamless loop.
    const renderCards = (blockKey) =>
        [...partners, ...partners].map((partner, index) => (
            <div
                key={`${blockKey}-${partner.id}-${index}`}
                className=" bg-white border border-gray-200/80 p-8 w-[320px] flex flex-col justify-between shrink-0 shadow-sm"
            >
                <p className="text-[#555] text-[15px] leading-[1.6]">
                    {partner.description}
                </p>

                <div className=" mt-[20vh]">
                    {partner.logo}
                </div>
            </div>
        ));

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen bg-[#f8f9fa] py-24 px-6 flex flex-col items-center justify-center font-sans"
        >
            <div className="max-w-[1100px] w-full">

                {/* Heading */}
                <h2 className="heading text-[32px] md:text-[42px] font-semibold text-center text-[#111] mb-16 tracking-tight">
                    Technology & Industry Partners
                </h2>

                {/* Infinite Marquee Section */}
                <div className="marquee-container overflow-hidden mb-8 w-full relative">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            animation: marquee 30s linear infinite;
                            will-change: transform;
                        }
                        .marquee-container:hover .animate-marquee {
                            animation-play-state: paused;
                        }
                        @media (prefers-reduced-motion: reduce) {
                            .animate-marquee {
                                animation: none;
                            }
                        }
                    `}} />

                    {/*
                        Two identical blocks placed side by side. Because both blocks
                        are exactly the same width, animating from translateX(0) to
                        translateX(-50%) moves exactly one block's width — the moment
                        the animation loops back to 0%, the content lines up perfectly,
                        so the seam is invisible.
                    */}
                    <div className="animate-marquee flex w-max gap-6">
                        <div className="flex gap-6">
                            {renderCards("b1")}
                        </div>
                        <div className="flex gap-6">
                            {renderCards("b2")}
                        </div>
                    </div>
                </div>

                {/* Carousel Indicators (Static to match original design) */}
                <div className="flex justify-center items-center gap-2">
                    {[0, 1, 2, 3, 4].map((index) => (
                        <div
                            key={index}
                            className={`w-[7px] h-[7px] rounded-full ${index === 1
                                ? "bg-[#0070f3] border border-[#0070f3]"
                                : "bg-transparent border border-gray-300"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}