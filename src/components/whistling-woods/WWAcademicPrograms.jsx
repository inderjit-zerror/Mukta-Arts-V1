"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const programsData = [
  {
    id: "01",
    title: "University Affiliation",
    description:
      "Partnered with Tata Institute of Social Sciences (TISS) (a Category 1 University) to offer accredited Bachelor's and Master's degrees across 1 to 4-year programs",
    mainImage:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200",
    thumbImage:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "02",
    title: "Global Partnerships",
    description:
      "Collaborating with renowned international institutions to provide our students with a global perspective, exchange programs, and diverse cultural experiences in their curriculum.",
    mainImage:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
    thumbImage:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "03",
    title: "Industry Integration",
    description:
      "Seamless integration with the media and entertainment industry, ensuring hands-on experience, direct placement opportunities, and live project work.",
    mainImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
    thumbImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=200",
  },
];

export default function WWAcademicPrograms() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const numItems = programsData.length;

      // Initial States setup
      gsap.set(".program-text:not(:first-child)", { autoAlpha: 0, y: 30 });
      gsap.set(".program-text:first-child", { autoAlpha: 1, y: 0 });

      gsap.set(".main-img:not(:first-child)", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(".main-img:first-child", { clipPath: "inset(0% 0% 0% 0%)", zIndex: 1 });

      gsap.set(".thumb-indicator:not(:first-child)", { width: 0, autoAlpha: 0 });
      gsap.set(".thumb-indicator:first-child", { width: "2rem", autoAlpha: 1 });

      gsap.set(".thumb-wrap:not(:first-child)", { opacity: 0.4 });
      gsap.set(".thumb-wrap:first-child", { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * numItems}`,
          pin: true,
          scrub: 1, // smooth scrub effect
        },
      });

      // Build timeline steps
      programsData.forEach((_, i) => {
        if (i === 0) return; // Skip first item

        // Set correct z-index so incoming image is above previous
        gsap.set(`.main-img-${i}`, { zIndex: i + 1 });

        tl.to(`.program-text-${i - 1}`, { autoAlpha: 0, y: -30, duration: 1 }, `step${i}`)
          .to(`.program-text-${i}`, { autoAlpha: 1, y: 0, duration: 1 }, `step${i}`)

          // Image reveal from bottom
          .to(`.main-img-${i}`, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power3.inOut" }, `step${i}-=0.2`)

          // Thumb indicators update
          .to(`.thumb-indicator-${i - 1}`, { width: 0, autoAlpha: 0, duration: 1 }, `step${i}`)
          .to(`.thumb-indicator-${i}`, { width: "2rem", autoAlpha: 1, duration: 1 }, `step${i}`)
          .to(`.thumb-wrap-${i - 1}`, { opacity: 0.4, duration: 1 }, `step${i}`)
          .to(`.thumb-wrap-${i}`, { opacity: 1, duration: 1 }, `step${i}`);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#f7f8f9] py-20 min-h-screen text-black" ref={sectionRef}>
      <div className=" mx-auto h-full flex flex-col px-10">

        {/* Animation Area */}
        <div className="flex-1 flex items-center relative min-h-[500px]">

          {/* Left Content (Text) */}
          <div className="w-[30%] h-full flex flex-col justify-center relative z-10 pr-10">
            <div className="relative w-full h-[200px]">
              {programsData.map((item, i) => (
                <div
                  key={`text-${i}`}
                  className={`program-text program-text-${i} absolute top-1/2 -translate-y-1/2 left-0 w-full`}
                >
                  <h3 className="text-2xl font-semibold mb-6">{item.title}</h3>
                  <div className="w-full h-[1px] bg-gray-300 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Center Content (Main Image) */}
          <div className="w-[50%] h-full flex justify-center items-center relative z-0">
            <div className="relative w-full aspect-[4/3] max-h-[70vh] overflow-hidden rounded-sm shadow-xl">
              {programsData.map((item, i) => (
                <div
                  key={`main-img-${i}`}
                  className={`main-img main-img-${i} absolute inset-0 w-full h-full`}
                >
                  <img
                    src={item.mainImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Content (Thumbnails & indicators) */}
          <div className="w-[20%] h-full flex flex-col justify-center items-end relative z-10 pl-10">
            <div className="flex flex-col gap-12">
              {programsData.map((item, i) => (
                <div
                  key={`thumb-${i}`}
                  className={`thumb-wrap thumb-wrap-${i} flex items-center gap-4`}
                >
                  <span className="text-sm font-medium text-gray-400">{item.id}</span>

                  {/* Active Line Indicator */}
                  <div className="relative h-[1px] bg-gray-300 w-8">
                    <div className={`thumb-indicator thumb-indicator-${i} absolute left-0 top-0 h-full bg-black`}></div>
                  </div>

                  <div className="w-20 h-12 overflow-hidden rounded-sm bg-gray-200">
                    <img
                      src={item.thumbImage}
                      alt={`Thumb ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
