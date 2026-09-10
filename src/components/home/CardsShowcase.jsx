
"use client";

import Image from "next/image";

let arr = [
  { no: ".4", clr: "#0470B1" },
  { no: ".3", clr: "#00A7E1" },
  { no: ".2", clr: "#0470B1" },
  { no: ".1", clr: "#00A7E1" },
];

export default function CardsShowcase() {
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
            const isFront = index === 3;

            return (
              <div
                key={index}
                className="absolute w-[55vw] max-w-[90%] h-full shadow-[-15px_15px_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out hover:-translate-y-30 cursor-pointer flex border-l border-white/10"
                style={{
                  backgroundColor: item.clr,
                  zIndex: index,
                  transform: `translateX(${(index - 1.5) * 17}%) translateZ(${index * 60}px) rotateY(15deg)`,
                  transformOrigin: "center center",
                }}
              >
                {/* Number */}
                <div className="absolute top-8 left-8 text-white text-5xl md:text-7xl font-bold opacity-95 z-10  tracking-tighter">
                  {item.no}
                </div>

                {/* Content - Only on Front Card for performance and visual match */}
                {isFront && (
                  <div className="w-full h-full flex flex-row items-center pt-16">
                    {/* Image Area */}
                    <div className="w-1/2 h-full relative flex items-center justify-center p-8">
                      <div className="relative w-full h-[80%]">
                        <Image
                          src="/img/home/halftone_trophy.jpg"
                          alt="Trophy"
                          fill
                          className="object-contain drop-shadow-2xl mix-blend-multiply"
                        />
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-px h-[50%] bg-white/50"></div>

                    {/* Text Area */}
                    <div className="w-1/2 h-full flex flex-col  p-12 pl-10 text-white">
                      <div className="mt-1 mb-5">
                        <h2 className="text-3xl md:text-4xl ">Title Here</h2>
                      </div>
                      <div className="mb-4">
                        <h3 className=" tracking-tighter  capitalize  ">
                          Lorem ipsum dolor sit amet consectetur. Et eu ullamcorper eget lorem nunc. At quisque nunc libero sapien risus in. Felis dolor vitae consectetur imperdiet justo integer. Venenatis interdum commodo gravida sed. Risus pharetra non congue nec molestie commodo.
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

