"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP registers the plugin only on the client side
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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
                        // Thresholds for the 4 milestones (0%, 33%, 66%, 100%)
                        const thresholds = [0, 0.33, 0.66, 0.99];

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
            {/* Sticky Header */}
            {/* <div className="absolute top-16 left-12 md:left-20 z-20 pointer-events-none">
                <h2 className="text-[2.75rem] leading-[1.1] font-medium tracking-tight">
                    Career <br /> Milestones
                </h2>
            </div> */}

            {/* Horizontal Scrolling Track */}
            <div
                ref={scrollTrackRef}
                className="flex h-full items-center pl-[50vw] pr-[50vw] gap-[6vw] mb-auto  w-max "
            >
                {/* Milestone 1: 1976 */}
                <div className="w-[300px] flex flex-col -mt-50  shrink-0">
                    <h3 className="text-[1.35rem] font-medium tracking-tight mb-2">
                        Directorial Debut
                    </h3>
                    <p className="text-gray-600 text-[13px] leading-[1.6] mb-5">
                        His directorial debut marked the beginning of a celebrated journey in
                        Indian cinema.
                    </p>
                    <span className="text-[10px] font-bold text-gray-500 mb-2 font-mono uppercase tracking-widest">
                        1976
                    </span>
                    <img
                        src="/img/sg/3.png"
                        alt="Directorial Debut"
                        className="w-full h-[220px] object-cover grayscale"
                    />
                </div>

                {/* Milestone 2: 1983 */}
                <div className="w-[360px] flex flex-col -mt-10 shrink-0">
                    <h3 className="text-[1.35rem] font-medium tracking-tight mb-2">
                        Hero — Breakthrough
                    </h3>
                    <p className="text-gray-600 text-[13px] leading-[1.6] mb-5 pr-8">
                        Hero became a defining breakthrough, strengthening his position as a
                        leading voice in Hindi cinema.
                    </p>
                    <span className="text-[10px] font-bold text-gray-500 mb-2 font-mono uppercase tracking-widest">
                        1983
                    </span>
                    <img
                        src="/img/sg/4.png"
                        alt="Hero Breakthrough"
                        className="w-full h-[450px] object-cover "
                    />
                </div>

                {/* Milestone 3: 1990 */}
                <div className="w-[320px] flex flex-col mb-40 shrink-0">
                    <span className="text-[10px] font-bold text-gray-500 mb-2 font-mono uppercase tracking-widest">
                        1990
                    </span>
                    <img
                        src="/img/sg/5.png"
                        alt="Founded Mukta Arts"
                        className="w-full h-[220px] object-cover mb-4"
                    />
                    <h3 className="text-[1.25rem] font-medium tracking-tight">
                        Founded Mukta Arts
                    </h3>
                </div>

                {/* Milestone 4: 1997 */}
                <div className="w-[280px] flex flex-col mb-0 shrink-0">
                    <span className="text-[10px] font-bold text-gray-500 mb-2 font-mono uppercase tracking-widest">
                        1997
                    </span>
                    <img
                        src="/img/sg/6.png"
                        alt="Pardes Global Hit"
                        className="w-full h-[300px] object-cover mb-4"
                    />
                    <h3 className="text-[1.25rem] font-medium tracking-tight">
                        Pardes — Global Hit
                    </h3>
                </div>
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
                    {["1976", "1983", "1990", "1997"].map((year, i) => (
                        <div
                            key={year}
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{ left: `${(i / 3) * 100}%` }}
                        >
                            {/* Year Text */}
                            <div
                                ref={(el) => (yearsRef.current[i] = el)}
                                className={`absolute bottom-5 left-0 text-[1.75rem] font-medium tracking-tight transition-colors duration-300 ${i === 0 ? "text-black" : "text-gray-400"
                                    }`}
                            >
                                {year}
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