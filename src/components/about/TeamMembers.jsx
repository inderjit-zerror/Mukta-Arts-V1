"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RiFacebookFill, RiTwitterXLine } from "@remixicon/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const team = [
  { name: "Subhash Ghai", titles: ["Executive Chairman - Mukta Arts Ltd"], image: "/img/actor/1.jpg" },
  { name: "Rahul Puri", titles: ["Managing Director - Mukta Arts Ltd", "Director - Academics - Whistling Woods International", "Director - Mukta A2 Cinemas Private Ltd"], image: "/img/actor/2.jpg" },
  { name: "Parvez Farooqui", titles: ["Director - Mukta Arts Ltd"], image: "/img/actor/3.jpg" },
  { name: "Kapil Bagla", titles: ["Independent Director - Mukta Arts Ltd"], image: "/img/actor/4.jpg" },
  { name: "Rajendra Doshi", titles: ["Independent Director - Mukta Arts Ltd"], image: "/img/actor/5.jpg" },
  { name: "Mrs. Madhumati Ramchandra Lele", titles: ["Independent Director - Mukta Arts Ltd"], image: "/img/actor/6.jpg" },
  { name: "Rentala Chandrashekhar", titles: ["Independent Director - Mukta Arts Ltd"], image: "/img/last/1.jpg" },
  { name: "Meghna Ghai Puri", titles: ["President - Whistling Woods International"], image: "/img/last/3.jpg" },
  { name: "Ravi Gupta", titles: ["Dean - Whistling Woods International"], image: "/img/last/5.png" },
  { name: "Raju Farooqui", titles: ["Producer"], image: "/img/last/6.jpg" },
  { name: "Satwik Lele", titles: ["Chief Operating Officer"], image: "/img/last/7.jpg" },
  { name: "Sanjay Ghai", titles: ["COO - Mukta A2 Cinemas"], image: "/img/sg/1.jpg" },
  { name: "Jabir Contractor", titles: ["Vice President - Production"], image: "/img/sg/2.jpg" },
  { name: "Ms. Pratiksha Panchal", titles: ["Company Secretary"], image: "/img/sg/3.png" },
];

const TeamMembers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const indicatorRef = useRef(null);
  const lineFillRef = useRef(null);
  const namesInnerRef = useRef(null);

  useGSAP(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${team.length * 150}`, // Scrolling length to get through all members
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          let progress = self.progress;
          let newIndex = Math.round(progress * (team.length - 1));

          setActiveIndex((prev) => {
            if (prev !== newIndex) {
              const itemHeight = 48; // Corresponds to h-12
              const targetY = newIndex * itemHeight;

              // Animate the white square indicator down the line
              gsap.to(indicatorRef.current, {
                y: targetY,
                duration: 0.2,
                ease: "power2.out"
              });

              // Animate the solid line filling up down to the indicator
              gsap.to(lineFillRef.current, {
                height: targetY,
                duration: 0.2,
                ease: "power2.out"
              });

              // Auto-scroll the names list up if it goes beyond the visible container
              if (namesInnerRef.current && namesInnerRef.current.parentElement) {
                const containerHeight = namesInnerRef.current.parentElement.offsetHeight;
                if (targetY > containerHeight / 2) {
                  gsap.to(namesInnerRef.current, {
                    y: -(targetY - containerHeight / 2 + itemHeight),
                    duration: 0.3,
                    ease: "power2.out"
                  });
                } else {
                  gsap.to(namesInnerRef.current, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }

              return newIndex;
            }
            return prev;
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const activePerson = team[activeIndex];

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#00609C] flex items-center overflow-hidden py-10">
      <div className="w-full mx-auto px-4 md:px-8  flex flex-col lg:flex-row gap-8 lg:gap-16 w-full h-full lg:max-h-[700px]">

        {/* Left Column: Heading */}
        <div className="lg:w-3/12 flex flex-col justify-start pt-10">
          <p className="text-white/80 text-sm tracking-wide uppercase mb-3">Team Members</p>
          <h5 className="text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight">
            People Behind<br />The Vision
          </h5>
        </div>

        {/* Middle Column: Names List */}
        <div className="lg:w-4/12 relative h-full max-h-[50vh] lg:max-h-full flex items-start pt-10">
          {/* Scrollable Container (hidden overflow, controlled by GSAP) */}
          <div className="relative w-full h-full overflow-hidden">
            <div ref={namesInnerRef} className="w-full relative flex flex-col">
              {team.map((person, i) => (
                <div
                  key={i}
                  className={`h-12 flex items-center transition-all duration-300 ${activeIndex === i ? 'text-white text-[1.35rem] font-medium' : 'text-white/50 text-[1.05rem] font-light'
                    }`}
                >
                  {person.name}
                </div>
              ))}
            </div>
          </div>

          {/* Right Border Line & Indicator */}
          <div className="absolute right-0 top-10 bottom-10 w-[1px] bg-white/20">
            {/* Bold solid line that draws down */}
            <div
              ref={lineFillRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-white mt-6"
              style={{ height: '0px' }}
            ></div>

            {/* Indicator Square */}
            <div
              ref={indicatorRef}
              className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-white top-0 mt-6"
            ></div>
          </div>
        </div>

        {/* Right Column: Person Info */}
        <div className="lg:w-5/12 h-full flex flex-col justify-start lg:justify-center lg:pl-12 pt-10 lg:pt-0 relative">

          <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-black/10 shadow-xl transition-all duration-500">
            <Image
              src={activePerson.image}
              alt={activePerson.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>

          <div className="text-white text-sm md:text-[0.95rem] space-y-1 mb-8 opacity-90 font-light">
            {activePerson.titles.map((title, i) => (
              <p key={i}>{title}</p>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <a href="#" className="w-[34px] h-[34px] border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#00609C] transition-colors">
              <RiFacebookFill size={16} />
            </a>
            <a href="#" className="w-[34px] h-[34px] border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#00609C] transition-colors">
              <RiTwitterXLine size={16} />
            </a>
            <a href="#" className="px-5 py-[7px] border border-white/30 text-[0.65rem] md:text-xs font-semibold tracking-widest text-white hover:bg-white hover:text-[#00609C] transition-colors uppercase">
              View Full Profile
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TeamMembers;
