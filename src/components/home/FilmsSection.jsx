import React from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";

const films = [
  {
    id: 1,
    title: "YAADEIN",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800", // Placeholder for Yaadein
  },
  {
    id: 2,
    title: "AITRAAZ",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800", // Placeholder for Aitraaz
  },
  {
    id: 3,
    title: "KAANCHI",
    director: "SUBASH GHAI",
    producer: "SUBASH GHAI",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800", // Placeholder for Kaanchi
  },
];

const FilmsSection = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-12 bg-white text-black">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight">Films.</h2>
        <div className="flex gap-4 pb-2">
          <button className="p-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            <RiArrowLeftLine size={24} />
          </button>
          <button className="p-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            <RiArrowRightLine size={24} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {films.map((film) => (
          <div key={film.id} className="flex flex-col group cursor-pointer">
            {/* Image */}
            <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden bg-gray-200">
              <img
                src={film.image}
                alt={film.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
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
        ))}
      </div>
    </section>
  );
};

export default FilmsSection;
