"use client";

import React, { useCallback } from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import useEmblaCarousel from "embla-carousel-react";

const films = [
  {
    id: 1,
    title: "YAADEIN",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: `/img/home/C1.png`,
  },
  {
    id: 2,
    title: "AITRAAZ",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: `/img/home/C2.png`,
  },
  {
    id: 3,
    title: "KAANCHI",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: `/img/home/C3.png`,
  },
  {
    id: 4,
    title: "YAADEIN",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: `/img/home/C1.png`,
  },
  {
    id: 5,
    title: "AITRAAZ",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: `/img/home/C2.png`,
  },
  {
    id: 6,
    title: "KAANCHI",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: `/img/home/C3.png`,
  },
  {
    id: 7,
    title: "YAADEIN",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: `/img/home/C1.png`,
  },
  {
    id: 8,
    title: "KAANCHI",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: `/img/home/C2.png`,
  },
];

const FilmsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    duration: 60,
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-12 text-black film-section-wrapper">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 film-text-content">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight">Films.</h2>
        <div className="flex gap-4 pb-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="p-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors relative z-10 cursor-pointer"
          >
            <RiArrowLeftLine size={24} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="p-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors relative z-10 cursor-pointer"
          >
            <RiArrowRightLine size={24} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-8">
          {films.map((film) => (
            <div
              key={film.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-8"
            >
              <div className="flex flex-col group cursor-pointer h-full">
                {/* Image */}
                <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden ">
                  <img
                    src={film.image}
                    alt={film.title}
                    className=" w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow film-text-content">
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                    {film.title}
                  </h3>

                  <div className="border-t border-black py-4 mt-auto">
                    <p className="text-sm font-medium uppercase tracking-wider mb-1 text-gray-700">
                      DIRECTOR: {film.director}
                    </p>
                    <p className="text-sm font-medium uppercase tracking-wider text-gray-700">
                      PRODUCER: {film.producer}
                    </p>
                  </div>
                  <div className="border-t border-black w-full h-[1px]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilmsSection;
