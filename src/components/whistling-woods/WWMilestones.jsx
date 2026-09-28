"use client";
import React, { useState } from 'react';

const UNIQUE_DATA = [
    { year: '2006', text: 'Foundation of Whistling Woods International.' },
    { year: '2010', text: 'Expanded campus facilities and introduced new courses.' },
    { year: '2011', text: 'Ranked among the top 10 film schools globally.' },
    { year: '2013', text: 'Introduced degree programs in animation and media.' },
    { year: '2014', text: "Partnered with the Tata Institute of Social Sciences (TISS) to offer UG & PG degree.\n\nLaunched India's first UG applied arts degrees in Filmmaking, Acting & Music programmes." },
    { year: '2015', text: 'Collaborated with international universities for student exchange.' },
    { year: '2016', text: 'Launched School of Design and School of Fashion.' },
    { year: '2018', text: 'Celebrated over 2000 alumni working in the industry.' },
    { year: '2020', text: 'Adapted to hybrid learning models successfully.' },
    { year: '2023', text: 'Continuing the legacy of excellence in creative arts.' },
];

// Duplicate data to create a large continuous/wrapping wheel effect
const MOCK_DATA = [...UNIQUE_DATA, ...UNIQUE_DATA, ...UNIQUE_DATA, ...UNIQUE_DATA];

const WWMilestones = () => {
    // Default to the middle of the duplicated data to allow rotating backwards seamlessly initially
    const [rotationState, setRotationState] = useState({
        activeIndex: 14, // 2014 from the second block
        rotation: -14 * (360 / MOCK_DATA.length)
    });

    // For text animation trigger
    const [fadeKey, setFadeKey] = useState(0);

    const angleStep = 360 / MOCK_DATA.length;
    // Safely calculate the index for the text description
    const safeDataIndex = ((rotationState.activeIndex % UNIQUE_DATA.length) + UNIQUE_DATA.length) % UNIQUE_DATA.length;

    const handleDotClick = (i) => {
        if (i === rotationState.activeIndex) return;

        let diff = i - rotationState.activeIndex;
        const N = MOCK_DATA.length;

        // Find shortest path to allow smooth wrap-around
        if (diff > N / 2) diff -= N;
        if (diff < -N / 2) diff += N;

        setRotationState(prev => ({
            activeIndex: i,
            rotation: prev.rotation - (diff * angleStep)
        }));

        // Trigger text animation
        setFadeKey(prev => prev + 1);
    };

    return (
        <section className="bg-[#0b6b9c] text-white overflow-hidden py-24 relative flex flex-col items-center z-50">
            {/* Header section matching the blue reference design */}
            <div className="text-center z-10 relative px-4 max-w-5xl mt-10">
                <h4 className="text-3xl md:text-5xl lg:text-[44px] font-bold mb-6 leading-tight">
                    WWI Milestones — From Vision To<br className="hidden md:block" />
                    A Global Creative Community
                </h4>
                <p className="text-sm md:text-base mx-auto text-white/90 max-w-2xl leading-relaxed">
                    From a bold vision to a thriving community shaping the future of<br className="hidden md:block" />
                    media, communication, and creative arts.
                </p>
            </div>

            {/* Timeline Container */}
            <div className="relative w-full h-[500px] md:h-[600px]  flex justify-center">

                {/* Vertical Dotted Line for active item */}
                <div className="absolute top-[30vh] left-1/2 w-px h-[60px] md:h-[80px] border-l border-dashed border-white/40 z-20" />

                {/* Active Text Description (with key for CSS re-animation) */}
                <div className="absolute top-[40vh] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-center z-20 pointer-events-none">
                    <p
                        key={fadeKey}
                        className="text-white text-sm md:text-base font-medium whitespace-pre-line leading-relaxed opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards]"
                    >
                        {UNIQUE_DATA[safeDataIndex]?.text || ''}
                    </p>
                </div>

                {/* Centering Wrapper for Wheel */}
                <div className="absolute top-[80px] left-1/2 z-0 mt-[10vh] -translate-x-1/2">

                    {/* The Large Rotating Wheel with CSS Transitions */}
                    <div
                        className="relative rounded-full border border-dashed border-black/30 shrink-0"
                        style={{
                            width: '3000px',
                            height: '3000px',
                            transform: `rotate(${rotationState.rotation}deg)`,
                            transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                        }}
                    >
                        {MOCK_DATA.map((item, i) => {
                            const rotation = i * angleStep;
                            const isActive = rotationState.activeIndex === i;

                            return (
                                <div
                                    key={i}
                                    className="absolute origin-bottom z-10 cursor-pointer group"
                                    style={{
                                        top: 0,
                                        left: '50%',
                                        marginLeft: '-20px', // Centers the 40px width element
                                        width: '40px', // Wider clickable area
                                        height: '1500px', // Radius
                                        transform: `rotate(${rotation}deg)`
                                    }}
                                    onClick={() => handleDotClick(i)}
                                >
                                    {/* Dot */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <div
                                            className={`rounded-full transition-all duration-300
                                                ${isActive
                                                    ? 'bg-[#ff5a00] w-5 h-5 shadow-[0_0_15px_rgba(255,90,0,0.5)]'
                                                    : 'bg-white w-3 h-3 group-hover:scale-150'
                                                }
                                            `}
                                        />
                                    </div>

                                    {/* Year Text placed radially outside the arc */}
                                    <div className="absolute top-[-30px] md:top-[-45px] left-1/2 -translate-x-1/2 -translate-y-full text-center">
                                        <span
                                            className={`text-2xl md:text-4xl font-bold tracking-wide transition-all duration-300
                                                ${isActive
                                                    ? 'text-white-900!'
                                                    : 'text-white/40! group-hover:text-white!'
                                                }
                                            `}
                                        >
                                            {item.year}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Injected Keyframes for smooth text animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(15px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </section>
    );
};

export default WWMilestones;
