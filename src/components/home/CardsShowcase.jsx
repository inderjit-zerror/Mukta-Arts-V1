
"use client";

import Image from "next/image";
import { useState } from "react";

let arr = [
  {
    no: ".4",
    clr: "#0470B1",
    img: "/img/home/1.jpg",
    title: "Global Recognition",
    desc: "Recognized worldwide for pushing boundaries and creating impactful digital experiences that inspire and engage users on a global scale. Recognized worldwide for pushing boundaries and creating impactful digital experiences that inspire and engage users on a global scale."
  },
  {
    no: ".3",
    clr: "#00A7E1",
    img: "/img/home/2.jpg",
    title: "Design Excellence",
    desc: "Awarded for exceptional user interface design, balancing aesthetic appeal with highly intuitive user journeys.Awarded for exceptional user interface design, balancing aesthetic appeal with highly intuitive user journeys."
  },
  {
    no: ".2",
    clr: "#0470B1",
    img: "/img/home/3.jpg",
    title: "Innovation Award",
    desc: "Celebrating groundbreaking approaches to solving complex problems through technology, creativity, and forward-thinking. Celebrating groundbreaking approaches to solving complex problems through technology, creativity, and forward-thinking."
  },
  {
    no: ".1",
    clr: "#00A7E1",
    img: "/img/home/4.jpg",
    title: "Best In Class",
    desc: "Honored as the industry standard for excellence, setting the benchmark for quality, performance, and user satisfaction.Honored as the industry standard for excellence, setting the benchmark for quality, performance, and user satisfaction."
  },
];

export default function CardsShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full h-screen max-sm:hidden  relative z-[10] overflow-hidden ">
      {/* Title */}
      <div className="w-full absolute top-[-10%] left-2 px-10 pt-20 z-50 pointer-events-none">
        <h1 className="text-[8vw] font-semibold tracking-tighter text-black">Awards.</h1>
      </div>

      {/* 3D Container */}
      <div
        className="absolute inset-0 flex items-center justify-center pt-[15vh] translate-y-30"
        style={{ perspective: "1500px" }}
      >
        <div
          className="relative w-full max-w-6xl h-[65vh] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {arr.map((item, index) => {
            let translateY = "0px";
            if (hoveredIndex !== null) {
              translateY = hoveredIndex === index ? "-100px" : "400px";
            }

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute w-[55vw] max-w-[90%] h-full shadow-[-15px_15px_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out cursor-pointer flex border-l border-white/10"
                style={{
                  backgroundColor: item.clr,
                  zIndex: index,
                  transform: `translateX(${(index - 1.5) * 17}%) translateY(${translateY}) translateZ(${index * 60}px) rotateY(15deg)`,
                  transformOrigin: "center center",
                }}
              >
                {/* Number */}
                <div className="absolute top-8 left-8 text-white text-5xl md:text-7xl font-bold opacity-95 z-10  tracking-tighter">
                  {item.no}
                </div>

                {/* Content */}
                <div className="w-full h-full flex flex-row items-center pt-16">
                  {/* Image Area */}
                  <div className="w-1/2 h-full relative flex items-center justify-center p-8">
                    <div className="relative w-full h-[80%]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-contain drop-shadow-2xl "
                      />
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-px h-[50%] bg-white/50"></div>

                  {/* Text Area */}
                  <div className="w-1/2 h-full flex flex-col  p-12 pl-10 text-white">
                    <div className="mt-1 mb-5">
                      <h3 className="text-3xl md:text-4xl ">{item.title}</h3>
                    </div>
                    <div className="mb-4">
                      <p className=" tracking-tighter  capitalize  ">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

