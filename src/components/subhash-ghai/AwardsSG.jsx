import React from 'react';

const awards = [
  {
    title: "National Film Award",
    year: "1986",
    desc: "Awarded the National Film Award for Best Feature Film on National Integration for Karma (1986), recognising the film's powerful message of unity, patriotism, and national harmony. The honour further strengthened Subhash Ghai's reputation for creating commercially successful cinema with meaningful social themes.",
    img: "/img/sg/7.png"
  },
  {
    title: "Filmfare Lifetime Achievement Award",
    year: "2022",
    desc: "Honoured in 2022 for his outstanding contribution to Indian cinema, recognising a distinguished career marked by influential films, creative excellence, and a lasting impact on the Indian entertainment industry.",
    img: "/img/sg/8.png"
  },
  {
    title: "IIFA Outstanding Contribution To Indian Cinema",
    year: "2015",
    desc: "Awarded the IIFA Outstanding Contribution to Indian Cinema in 2015, recognising Subhash Ghai's remarkable filmmaking journey, creative influence, and lasting contribution to the growth of Hindi cinema.",
    img: "/img/sg/9.png"
  }
];

export default function AwardsSG() {
  return (
    <section className="w-full bg-[#f8f9fa] px-6 py-16 md:px-12 md:py-30 lg:px-10  font-['SwitzerR'] text-black">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-start">
        <div className="md:col-span-3">
          <p className="text-gray-500 text-[13px] md:text-sm">Awards and Recognition</p>
        </div>
        <div className="md:col-span-5 pl-30">
          <h4 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] font-['SwitzerM'] tracking-tight">
            Decades Of<br />Acclaim
          </h4>
        </div>
        <div className="md:col-span-4 lg:col-span-3 lg:col-start-10">
          <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed pt-2">
            Celebrating decades of creativity, influence, and cinematic excellence.
          </p>
        </div>
      </div>

      {/* Awards List */}
      <div className="flex flex-col w-full border-t border-gray-200">
        {awards.map((award, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 md:py-16 border-b border-gray-200">

            {/* Left Col - Title and Year */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <h3 className="text-[2rem] lg:text-[2.5rem] font-medium leading-[1.1] font-['SwitzerM'] tracking-tight mb-8 md:mb-0 pr-4">
                {award.title}
              </h3>
              <p className="text-gray-500 text-sm font-['SwitzerR']">{award.year}</p>
            </div>

            {/* Middle Col - Desc */}
            <div className="md:col-span-4">
              <p className="text-[#555] text-[13px] md:text-sm leading-[1.6] md:pr-10 lg:pr-16 pt-1">
                {award.desc}
              </p>
            </div>

            {/* Right Col - Image */}
            <div className="md:col-span-4 overflow-hidden">
              <img
                src={award.img}
                alt={award.title}
                className="w-full h-[300px] lg:h-[350px] object-cover transition-transform duration-700 ease-out hover:scale-110"
              />
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
