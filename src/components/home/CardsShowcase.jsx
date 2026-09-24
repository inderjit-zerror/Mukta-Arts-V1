
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

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
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Create smooth interpolators for x and y
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

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

  const handleNext = () => {
    setCardOrder((prev) => {
      const newOrder = [...prev];
      const frontCard = newOrder.pop();
      newOrder.unshift(frontCard);
      return newOrder;
    });
  };

  const handlePrev = () => {
    setCardOrder((prev) => {
      const newOrder = [...prev];
      const backCard = newOrder.shift();
      newOrder.push(backCard);
      return newOrder;
    });
  };

  return (
    <div className="w-full h-[100vh] max-sm:hidden  relative z-[10] mt-[30vh] overflow-hidden ">
      {/* Title */}
      <div className="w-full absolute top-[-10%] left-2 px-10 pt-20 z-50 pointer-events-none">
        <h2 className="text-[8vw] font-semibold tracking-tighter text-black">Awards.</h2 >
      </div>

      {/* 3D Container */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pt-[15vh] translate-y-30"
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
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => handleCardClick(originalIndex)}
                className="group absolute w-[40vw] max-w-[90%] h-[80%] transition-all duration-500 ease-out cursor-pointer"
                style={{
                  zIndex: visualIndex,
                  // We center the 8 cards by using (arr.length - 1) / 2 which is 3.5
                  // Kept a similar proportion for X offset and Z spacing to retain the exact same animation feel!
                  transform: `translateX(${(visualIndex - 3.5) * 11}%) translateY(-80px) translateZ(${visualIndex * 35}px) rotateY(15deg)`,
                  transformOrigin: "center center",
                }}
              >
                <div
                  className="w-full h-full shadow-[-15px_15px_40px_rgba(0,0,0,0.2)] flex border-l border-white/10 transition-transform duration-300 group-hover:-translate-y-6"
                  style={{ backgroundColor: item.clr }}
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
                        <h5 className="text-3xl md:text-4xl ">{item.title}</h5>
                      </div>
                      <div className="mb-4">
                        <p className="  capitalize  ">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-[10vh] bg-white "></div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-[5%] top-1/2 -translate-y-1/2 z-[9999] w-12 h-12 rounded-full border border-black/20 text-black flex items-center justify-center hover:bg-[#0474BA] hover:text-white transition-colors cursor-pointer bg-white/50 backdrop-blur-md shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-[5%] top-1/2 -translate-y-1/2 z-[9999] w-12 h-12 rounded-full border border-black/20 text-black flex items-center justify-center hover:bg-[#0474BA] hover:text-white transition-colors cursor-pointer bg-white/50 backdrop-blur-md shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      >
        <div className={`w-fit h-fit px-5 py-2 bg-black/20 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center  transition-transform duration-300 ease-out ${isHovering ? 'scale-100' : 'scale-50'} -translate-x-1/2 translate-y-4 `}>
          <span className="text-xs font-semibold tracking-widest uppercase">Click</span>
        </div>
      </div>
    </div>
  );
}

