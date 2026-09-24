"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(Draggable);
}

const carouselItems = [
    { src: "/img/last/1.jpg", width: "w-[280px] md:w-[380px]", height: "h-[220px] md:h-[280px]" },
    { src: "/img/last/3.jpg", width: "w-[360px] md:w-[480px]", height: "h-[180px] md:h-[220px]" },
    { src: "/img/last/5.png", width: "w-[240px] md:w-[320px]", height: "h-[380px] md:h-[480px]" },
    { src: "/img/last/6.jpg", width: "w-[320px] md:w-[420px]", height: "h-[220px] md:h-[280px]" },
    { src: "/img/last/7.jpg", width: "w-[380px] md:w-[500px]", height: "h-[200px] md:h-[240px]" },
];

const AboutHero = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // We animate from 0 to -50% because the track contains two identical sets of items.
        let tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

        tl.to(track, {
            xPercent: -50,
            duration: 35, // Smooth slow scrolling
        });

        let dragStartProgress = 0;
        let dragStartX = 0;

        const dragInstance = Draggable.create(document.createElement("div"), {
            trigger: containerRef.current,
            type: "x",
            onPress: function () {
                tl.pause();
                dragStartProgress = tl.progress();
                dragStartX = this.x;
            },
            onDrag: function () {
                const trackWidth = track.scrollWidth;
                const movementWidth = trackWidth / 2;

                const deltaX = this.x - dragStartX;
                const progressDelta = -(deltaX / movementWidth);

                let newProgress = dragStartProgress + progressDelta;

                // Wrap progress between 0 and 1
                newProgress = newProgress % 1;
                if (newProgress < 0) newProgress += 1;

                tl.progress(newProgress);
            },
            onRelease: function () {
                tl.play();
            },
        });

        return () => {
            tl.kill();
            dragInstance[0]?.kill();
        };
    }, []);

    return (
        <section className="relative w-full pt-32 pb-16 overflow-hidden bg-[#FAFAFA]">
            <div className=" px-4 md:px-8 mb-24 ">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 ">
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-black max-w-3xl leading-[1.05]">
                        Cinema, Education & Exhibition At Scale.
                    </h1>
                </div>
                <p className="text-[#555]  text-lg md:text-xl ml-auto max-w-[28rem] leading-relaxed font-medium">
                    Pioneering India's cinematic corporatization, premier media pedagogy at Whistling Woods International, and multiplex storytelling across generations.
                </p>
            </div>

            <div
                ref={containerRef}
                className="w-full cursor-grab active:cursor-grabbing overflow-hidden"
            >
                <div
                    ref={trackRef}
                    className="flex items-center  w-max px-4 md:px-8"
                >
                    {/* Double the array for seamless infinite looping */}
                    {[...carouselItems, ...carouselItems].map((item, index) => (
                        <div
                            key={index}
                            className={`relative flex-shrink-0 ${item.width} ${item.height}`}
                        >
                            <Image
                                src={item.src}
                                alt={`Hero image ${index}`}
                                fill
                                sizes="(max-width: 768px) 80vw, 33vw"
                                className="object-cover"
                                quality={90}
                                priority={index < 4}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutHero;