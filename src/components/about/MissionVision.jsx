"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    value: "42+",
    text: "A collection of iconic films that shaped generations, from Karz and Hero to Taal, reflecting Mukta Arts' legacy of memorable storytelling and cinematic excellence.",
  },
  {
    value: "4,000+",
    text: "Whistling Woods International nurtures emerging creative talent through world-class education, hands-on learning, and industry exposure across film, communication, and the arts.",
  },
  {
    value: "65+",
    text: "Mukta A2 brings the magic of cinema closer to audiences across India and Bahrain, delivering diverse films, modern theatres, and memorable experiences for movie lovers.",
  },
];

const MissionVision = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    tl.fromTo(
      ".mission-label",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        ".mission-headline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".stat-item",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.4"
      );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#FAFAFA]"
    >
      <div className=" mx-auto px-4 md:px-8">
        {/* Top Content */}
        <div className="flex flex-col items-center justify-center mb-32 md:mb-40">
          <p className="mission-label text-[#666] text-sm md:text-base font-medium mb-8">
            Mission & Vision
          </p>
          <h5 className="mission-headline text-3xl md:text-5xl lg:text-[3.25rem] text-center text-black max-w-[1000px] leading-[1.25] md:leading-[1.3] font-normal tracking-tight">
            Building A World-Class Ecosystem For Indian Storytelling—Creating Powerful Content, Nurturing Creative Talent, And Connecting Stories With Audiences Across Screens And Borders.
          </h5>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item flex flex-col justify-between border-l border-black/10 pl-6 md:pl-10 min-h-[300px] md:min-h-[350px]"
            >
              <h3 className="text-5xl lg:text-[4rem] font-normal text-black tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[#555] text-base md:text-lg leading-relaxed mt-12 md:mt-auto pr-4">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
