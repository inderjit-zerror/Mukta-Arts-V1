"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

export const filmsData = [
  {
    category: "ALL",
    items: [
      { id: "all-1", title: "YAADEIN", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "all-2", title: "AITRAAZ", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "all-3", title: "KAANCHI", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "all-4", title: "KARMA", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "all-5", title: "RAM LAKHAN", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "all-6", title: "SAUDAGAR", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "all-7", title: "KHALNAYAK", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "all-8", title: "PARDES", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "all-9", title: "TAAL", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
    ]
  },
  {
    category: "ENTERTAINMENT FILMS",
    items: [
      { id: "ent-1", title: "HERO", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "ent-2", title: "KARZ", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "ent-3", title: "VIDHATA", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "ent-4", title: "JOGGER'S PARK", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "ent-5", title: "IQBAL", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "ent-6", title: "36 CHINA TOWN", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "ent-7", title: "APNA SAPNA MONEY MONEY", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "ent-8", title: "GOOD BOY BAD BOY", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "ent-9", title: "BLACK & WHITE", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
    ]
  },
  {
    category: "SEARCHLIGHT FILMS",
    items: [
      { id: "search-1", title: "YAADEIN", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "search-2", title: "AITRAAZ", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "search-3", title: "KAANCHI", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "search-4", title: "KARMA", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "search-5", title: "RAM LAKHAN", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "search-6", title: "SAUDAGAR", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "search-7", title: "KHALNAYAK", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "search-8", title: "PARDES", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "search-9", title: "TAAL", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
    ]
  },
  {
    category: "SHORT FILMS",
    items: [
      { id: "short-1", title: "HERO", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "short-2", title: "KARZ", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "short-3", title: "VIDHATA", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "short-4", title: "JOGGER'S PARK", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "short-5", title: "IQBAL", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "short-6", title: "36 CHINA TOWN", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "short-7", title: "APNA SAPNA MONEY MONEY", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "short-8", title: "GOOD BOY BAD BOY", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "short-9", title: "BLACK & WHITE", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
    ]
  },
  {
    category: "REGIONALS FILMS",
    items: [
      { id: "reg-1", title: "YAADEIN", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "reg-2", title: "AITRAAZ", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "reg-3", title: "KAANCHI", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "reg-4", title: "KARMA", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "reg-5", title: "RAM LAKHAN", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "reg-6", title: "SAUDAGAR", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
      { id: "reg-7", title: "KHALNAYAK", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C1.png" },
      { id: "reg-8", title: "PARDES", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C2.png" },
      { id: "reg-9", title: "TAAL", description: "A captivating story of love, revenge, and destiny.", image: "/img/home/C3.png" },
    ]
  }
];

export default function FilmsComponent() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [displayCategory, setDisplayCategory] = useState("ALL");
  const [isAnimating, setIsAnimating] = useState(false);

  const gridRef = useRef(null);
  const containerRef = useRef(null);

  const handleFilmClick = (e, film) => {
    e.preventDefault();
    if (isAnimating) return;
    setIsAnimating(true);

    localStorage.setItem("selectedFilmImage", film.image);
    localStorage.setItem("selectedFilmTitle", film.title);
    localStorage.setItem("selectedFilmDesc", film.description);

    const card = e.currentTarget;
    const imgContainer = card.querySelector(".relative.w-full.aspect-\\[4\\/5\\]");
    const img = imgContainer.querySelector("img");
    const rect = img.getBoundingClientRect();

    const clone = img.cloneNode();
    clone.id = "transition-clone";
    document.body.appendChild(clone);

    gsap.set(clone, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 9999,
      objectFit: "cover",
      margin: 0
    });

    gsap.set(img, { opacity: 0 });

    const elementsToHide = [
      containerRef.current.querySelector("h2"),
      containerRef.current.querySelector(".flex.flex-wrap"),
      ...gsap.utils.toArray(".film-card").filter((c) => c !== card.parentElement)
    ];

    gsap.to(elementsToHide, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
    gsap.to(card.querySelectorAll("h3, .relative.py-4, .bg-black\\/20"), {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });

    const containerWidth = window.innerWidth;
    const px = 40;
    const gap = 48;
    const maxW2xl = 672;

    let targetWidth, targetHeight, targetLeft, targetTop;

    if (containerWidth >= 768) {
      const flexContainerInnerWidth = containerWidth - px * 2;
      const availableForFlexItems = flexContainerInnerWidth - gap;
      let leftWidth = availableForFlexItems / 2;
      let rightWidth = availableForFlexItems / 2;

      if (leftWidth > maxW2xl) {
        leftWidth = maxW2xl;
        rightWidth = availableForFlexItems - leftWidth;
      }

      targetWidth = Math.min(600, rightWidth);
      targetHeight = targetWidth * (5 / 4);
      targetLeft = containerWidth - px - targetWidth;
      targetTop = (window.innerHeight - targetHeight) / 2;
    } else {
      targetWidth = Math.min(600, containerWidth - px * 2);
      targetHeight = targetWidth * (5 / 4);
      targetLeft = (containerWidth - targetWidth) / 2;
      targetTop = window.innerHeight * 0.3;
    }

    gsap.to(clone, {
      top: targetTop,
      left: targetLeft,
      width: targetWidth,
      height: targetHeight,
      duration: 0.7,
      ease: "expo.inOut",
      onComplete: () => {
        router.push("/work-in-progress");
      }
    });
  };

  const handleCategoryChange = (category) => {
    if (category === activeCategory || isAnimating) return;

    setIsAnimating(true);
    setActiveCategory(category);

    // Animate out current cards
    const cards = gsap.utils.toArray(".film-card", gridRef.current);

    gsap.to(cards, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      stagger: 0.03, // Slightly faster stagger for exit
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setDisplayCategory(category); // Swap data after animation finishes
      },
    });
  };

  // Animate in new cards whenever displayCategory changes
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gsap.utils.toArray(".film-card", gridRef.current);

    // Kill any ongoing tweens to prevent conflicts
    gsap.killTweensOf(cards);

    gsap.fromTo(cards,
      { opacity: 0, y: -20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          setIsAnimating(false);
        },
      }
    );
  }, [displayCategory]);

  return (
    <section
      ref={containerRef}
      className=" mx-auto px-4 sm:px-6 pt-[20vh] lg:px-8 py-16 min-h-screen bg-white text-black"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Page Title */}
      <h2
        className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[7rem] font-bold tracking-tighter mb-10"

      >
        Our Films
      </h2>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
        {filmsData.map(({ category }) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            disabled={isAnimating}
            className={`px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${activeCategory === category
              ? "bg-[#1c2c44] text-white border-[#1c2c44]" // Active state
              : "bg-transparent text-gray-600 border-gray-400 hover:bg-gray-100 hover:text-black hover:border-gray-500"
              }`}
          >
            <p>

              {category}
            </p>
          </button>
        ))}
      </div>

      {/* Films Grid */}
      <div
        ref={gridRef}
        className="flex flex-wrap -ml-8 gap-y-16"
      >
        {filmsData.find(cat => cat.category === displayCategory)?.items.map((film) => (
          <div
            key={film.id}
            className="film-card opacity-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-8"
          >
            <div
              className="flex flex-col group cursor-pointer h-full"
              onClick={(e) => handleFilmClick(e, film)}
              onMouseEnter={() => router.prefetch("/work-in-progress")}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden ">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col  ">
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {film.title}
                </h3>

                <div className="relative py-4 mt-auto">
                  {/* Top animated line (draws left to right) */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-black/20">
                    <div className="absolute top-0 left-0 h-full bg-black w-0 transition-all duration-500 ease-out group-hover:w-full"></div>
                  </div>

                  <h3 className=" tracking-tighter capitalize opacity-75 ">
                    {film.description}
                  </h3>
                </div>

                {/* Bottom animated line (draws right to left) */}
                <div className="relative w-full h-[1px] bg-black/20">
                  <div className="absolute top-0 right-0 h-full bg-black w-0 transition-all duration-500 ease-out group-hover:w-full delay-75"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}