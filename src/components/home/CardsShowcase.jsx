
"use client";

import Image from "next/image";
import { useState } from "react";

let arr = [
  {
    clr: "#0470B1",
    img: "/img/home/trophy_nb1.jpg",
    title: "Global Recognition",
    desc: "Recognized worldwide for pushing boundaries and creating impactful digital experiences that inspire and engage users on a global scale."
  },
  {
    clr: "#00A7E1",
    img: "/img/home/trophy_nb2.jpg",
    title: "Design Excellence",
    desc: "Awarded for exceptional user interface design, balancing aesthetic appeal with highly intuitive user journeys."
  },
  {
    clr: "#0470B1",
    img: "/img/home/trophy_nb3.jpg",
    title: "Innovation Award",
    desc: "Celebrating groundbreaking approaches to solving complex problems through technology, creativity, and forward-thinking."
  },
  {
    clr: "#00A7E1",
    img: "/img/home/trophy_nb4.jpg",
    title: "Best In Class",
    desc: "Honored as the industry standard for excellence, setting the benchmark for quality, performance, and user satisfaction."
  },
  {
    clr: "#0470B1",
    img: "/img/home/trophy_nb1.jpg",
    title: "Creative Mastery",
    desc: "Demonstrating exceptional creativity and vision in crafting compelling narratives that resonate with audiences everywhere."
  },
  {
    clr: "#00A7E1",
    img: "/img/home/trophy_nb2.jpg",
    title: "Tech Innovator",
    desc: "Recognized for leveraging cutting-edge technology to deliver seamless and engaging interactive experiences."
  },
  {
    clr: "#0470B1",
    img: "/img/home/trophy_nb3.jpg",
    title: "Audience Choice",
    desc: "Voted as the absolute favorite by audiences worldwide, signifying a deep connection with our core demographics."
  },
  {
    clr: "#00A7E1",
    img: "/img/home/trophy_nb4.jpg",
    title: "Legacy Award",
    desc: "Honoring decades of consistent excellence and a lasting positive impact on the digital and entertainment landscape."
  }
];

export default function CardsShowcase() {
  const [cardOrder, setCardOrder] = useState(arr.map((_, i) => i));

  const handleCardClick = (clickedIndex) => {
    const currentVisualIndex = cardOrder.indexOf(clickedIndex);
    const frontVisualIndex = cardOrder.length - 1;

    if (currentVisualIndex === frontVisualIndex) return; // Already at the front

    const newCardOrder = [...cardOrder];
    // Swap the clicked card with the front card
    const temp = newCardOrder[currentVisualIndex];
    newCardOrder[currentVisualIndex] = newCardOrder[frontVisualIndex];
    newCardOrder[frontVisualIndex] = temp;

    setCardOrder(newCardOrder);
  };

  return (
    <div className="w-full h-[120vh] max-sm:hidden  relative z-[10] mt-[30vh] overflow-hidden ">
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
          {arr.map((item, originalIndex) => {
            const visualIndex = cardOrder.indexOf(originalIndex);

            return (
              <div
                key={originalIndex}
                onClick={() => handleCardClick(originalIndex)}
                className="absolute w-[40vw] max-w-[90%] h-[80%] shadow-[-15px_15px_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out cursor-pointer flex border-l border-white/10"
                style={{
                  backgroundColor: item.clr,
                  zIndex: visualIndex,
                  // We center the 8 cards by using (arr.length - 1) / 2 which is 3.5
                  // Kept a similar proportion for X offset and Z spacing to retain the exact same animation feel!
                  transform: `translateX(${(visualIndex - 3.5) * 11}%) translateY(-80px) translateZ(${visualIndex * 35}px) rotateY(15deg)`,
                  transformOrigin: "center center",
                }}
              >
                {/* Number is removed as requested */}

                {/* Content */}
                <div className="w-full h-full flex flex-row items-center pt-16">
                  {/* Image Area */}
                  <div className="w-1/2 h-full relative flex items-center justify-center p-8">
                    <div className="relative w-full h-[80%]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-contain drop-shadow-2xl mix-blend-screen"
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

