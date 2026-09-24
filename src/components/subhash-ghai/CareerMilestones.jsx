"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP registers the plugin only on the client side
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const milestonesData = [
    {
        year: "1976",
        title: "Directorial Debut",
        desc: "His directorial debut marked the beginning of a celebrated journey in Indian cinema.",
        img: "/img/sg/3.png",
        containerClass: "w-[300px] flex flex-col -mt-50 shrink-0",
        imgClass: "w-full h-[220px] object-cover grayscale",
        textPosition: "top"
    },
    {
        year: "1983",
        title: "Hero — Breakthrough",
        desc: "Hero became a defining breakthrough, strengthening his position as a leading voice in Hindi cinema.",
        img: "/img/sg/4.png",
        containerClass: "w-[360px] flex flex-col -mt-10 shrink-0",
        imgClass: "w-full h-[450px] object-cover",
        textPosition: "top",
        descClass: "pr-8"
    },
    {
        year: "1990",
        title: "Founded Mukta Arts",
        desc: "",
        img: "/img/sg/5.png",
        containerClass: "w-[320px] flex flex-col mb-40 shrink-0",
        imgClass: "w-full h-[220px] object-cover mb-4",
        textPosition: "bottom"
    },
    {
        year: "1997",
        title: "Pardes — Global Hit",
        desc: "",
        img: "/img/sg/6.png",
        containerClass: "w-[280px] flex flex-col mb-0 shrink-0",
        imgClass: "w-full h-[300px] object-cover mb-4",
        textPosition: "bottom"
    },
    {
        year: "2001",
        title: "Subhash Ghai Foundation",
        desc: "Expanded vision towards nurturing talent and supporting the entertainment industry.",
        img: "/img/sg/3.png",
        containerClass: "w-[300px] flex flex-col -mt-50 shrink-0",
        imgClass: "w-full h-[220px] object-cover grayscale",
        textPosition: "top"
    },
    {
        year: "2008",
        title: "Yuvvraaj",
        desc: "A musical masterpiece demonstrating continued innovation in Hindi cinema.",
        img: "/img/sg/4.png",
        containerClass: "w-[360px] flex flex-col -mt-10 shrink-0",
        imgClass: "w-full h-[450px] object-cover",
        textPosition: "top",
        descClass: "pr-8"
    },
    {
        year: "2015",
        title: "Lifetime Achievement",
        desc: "",
        img: "/img/sg/5.png",
        containerClass: "w-[320px] flex flex-col mb-40 shrink-0",
        imgClass: "w-full h-[220px] object-cover mb-4",
        textPosition: "bottom"
    },
    {
        year: "2023",
        title: "Global Recognition",
        desc: "",
        img: "/img/sg/6.png",
        containerClass: "w-[280px] flex flex-col mb-0 shrink-0",
        imgClass: "w-full h-[300px] object-cover mb-4",
        textPosition: "bottom"
    }
];

export default function CareerMilestones() {
    const containerRef = useRef(null);
    const scrollTrackRef = useRef(null);
    const progressLineRef = useRef(null);
    const yearsRef = useRef([]);
    const dotsRef = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const track = scrollTrackRef.current;

            // Calculate the total scrollable width
            const getScrollAmount = () => {
                return track.scrollWidth - window.innerWidth;
            };

            // 1. Horizontal Scroll Animation
            gsap.to(track, {
                x: () => -getScrollAmount(),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true, // Recalculates on window resize
                },
            });

            // 2. Timeline Progress Bar Animation
            gsap.to(progressLineRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;

                        // Dynamically generate thresholds based on the number of milestones
                        const numItems = milestonesData.length;
                        const thresholds = Array.from({ length: numItems }, (_, i) => i / (numItems - 1));

                        yearsRef.current.forEach((year, i) => {
                            if (year && dotsRef.current[i]) {
                                // Highlight text and dots when scroll reaches their threshold
                                if (progress >= thresholds[i] - 0.05) {
                                    year.classList.remove("text-gray-400");
                                    year.classList.add("text-black");
                                    dotsRef.current[i].classList.remove("bg-gray-300");
                                    dotsRef.current[i].classList.add("bg-black");
                                } else {
                                    year.classList.add("text-gray-400");
                                    year.classList.remove("text-black");
                                    dotsRef.current[i].classList.add("bg-gray-300");
                                    dotsRef.current[i].classList.remove("bg-black");
                                }
                            }
                        });
                    },
                },
            });
        }, containerRef);

        return () => ctx.revert(); // Cleanup GSAP on unmount
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-[#F8F9FA] overflow-hidden font-sans text-black"
        >
            {/* Horizontal Scrolling Track */}
            <div
                ref={scrollTrackRef}
                className="flex h-full items-center pl-[50vw] pr-[50vw] gap-[6vw] mb-auto w-max"
            >
                {milestonesData.map((milestone, index) => (
                    <div key={index} className={milestone.containerClass}>
                        {milestone.textPosition === "top" ? (
                            <>
                                <h3 className="text-[1.35rem] font-medium tracking-tight mb-2">
                                    {milestone.title}
                                </h3>
                                {milestone.desc && (
                                    <p className={`text-gray-600 text-[13px] leading-[1.6] mb-5 ${milestone.descClass || ""}`}>
                                        {milestone.desc}
                                    </p>
                                )}
                                <span className="text-[10px] font-bold text-gray-500 mb-2 font-mono uppercase tracking-widest">
                                    {milestone.year}
                                </span>
                                <img
                                    src={milestone.img}
                                    alt={milestone.title}
                                    className={milestone.imgClass}
                                />
                            </>
                        ) : (
                            <>
                                <span className="text-[10px] font-bold text-gray-500 mb-2 font-mono uppercase tracking-widest">
                                    {milestone.year}
                                </span>
                                <img
                                    src={milestone.img}
                                    alt={milestone.title}
                                    className={milestone.imgClass}
                                />
                                <h3 className="text-[1.25rem] font-medium tracking-tight">
                                    {milestone.title}
                                </h3>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Static Timeline Footer */}
            <div className="absolute bottom-16 left-12 right-12 md:left-20 md:right-20 z-20">
                <div className="relative w-full h-[1px] bg-gray-300">

                    {/* Animated Black Progress Line */}
                    <div
                        ref={progressLineRef}
                        className="absolute left-0 top-[-1px] h-[2px] bg-black origin-left"
                        style={{ width: "100%", transform: "scaleX(0)" }}
                    ></div>

                    {/* Timeline Nodes */}
                    {milestonesData.map((milestone, i) => (
                        <div
                            key={milestone.year}
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{ left: `${(i / (milestonesData.length - 1)) * 100}%` }}
                        >
                            {/* Year Text */}
                            <div
                                ref={(el) => (yearsRef.current[i] = el)}
                                className={`absolute bottom-5 left-0 text-[1.25rem] md:text-[1.75rem] font-medium tracking-tight transition-colors duration-300 ${i === 0 ? "text-black" : "text-gray-400"
                                    }`}
                            >
                                {milestone.year}
                            </div>
                            {/* Dot */}
                            <div
                                ref={(el) => (dotsRef.current[i] = el)}
                                className={`w-[6px] h-[6px] rounded-full transition-colors duration-300 -ml-[3px] ${i === 0 ? "bg-black" : "bg-gray-300"
                                    }`}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}