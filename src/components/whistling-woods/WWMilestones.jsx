// "use client";
// import React, { useState } from 'react';

// const UNIQUE_DATA = [
//     { year: '2006', text: 'Foundation of Whistling Woods International.' },
//     { year: '2010', text: 'Expanded campus facilities and introduced new courses.' },
//     { year: '2011', text: 'Ranked among the top 10 film schools globally.' },
//     { year: '2013', text: 'Introduced degree programs in animation and media.' },
//     { year: '2014', text: "Partnered with the Tata Institute of Social Sciences (TISS) to offer UG & PG degree.\n\nLaunched India's first UG applied arts degrees in Filmmaking, Acting & Music programmes." },
//     { year: '2015', text: 'Collaborated with international universities for student exchange.' },
//     { year: '2016', text: 'Launched School of Design and School of Fashion.' },
//     { year: '2018', text: 'Celebrated over 2000 alumni working in the industry.' },
//     { year: '2020', text: 'Adapted to hybrid learning models successfully.' },
//     { year: '2023', text: 'Continuing the legacy of excellence in creative arts.' },
// ];

// // Duplicate data to create a large continuous/wrapping wheel effect
// const MOCK_DATA = [...UNIQUE_DATA, ...UNIQUE_DATA, ...UNIQUE_DATA, ...UNIQUE_DATA];

// const WWMilestones = () => {
//     // Default to the middle of the duplicated data to allow rotating backwards seamlessly initially
//     const [rotationState, setRotationState] = useState({
//         activeIndex: 14, // 2014 from the second block
//         rotation: -14 * (360 / MOCK_DATA.length)
//     });

//     // For text animation trigger
//     const [fadeKey, setFadeKey] = useState(0);

//     const angleStep = 360 / MOCK_DATA.length;
//     // Safely calculate the index for the text description
//     const safeDataIndex = ((rotationState.activeIndex % UNIQUE_DATA.length) + UNIQUE_DATA.length) % UNIQUE_DATA.length;

//     const handleDotClick = (i) => {
//         if (i === rotationState.activeIndex) return;

//         let diff = i - rotationState.activeIndex;
//         const N = MOCK_DATA.length;

//         // Find shortest path to allow smooth wrap-around
//         if (diff > N / 2) diff -= N;
//         if (diff < -N / 2) diff += N;

//         setRotationState(prev => ({
//             activeIndex: i,
//             rotation: prev.rotation - (diff * angleStep)
//         }));

//         // Trigger text animation
//         setFadeKey(prev => prev + 1);
//     };

//     return (
//         <section className="bg-[#0b6b9c] text-white overflow-hidden py-24 relative flex flex-col items-center z-50">
//             {/* Header section matching the blue reference design */}
//             <div className="text-center z-10 relative px-4 max-w-5xl mt-10">
//                 <h4 className="text-3xl md:text-5xl lg:text-[44px] font-bold mb-6 leading-tight">
//                     WWI Milestones — From Vision To<br className="hidden md:block" />
//                     A Global Creative Community
//                 </h4>
//                 <p className="text-sm md:text-base mx-auto text-white/90 max-w-2xl leading-relaxed">
//                     From a bold vision to a thriving community shaping the future of<br className="hidden md:block" />
//                     media, communication, and creative arts.
//                 </p>
//             </div>

//             {/* Timeline Container */}
//             <div className="relative w-full h-[500px] md:h-[600px]  flex justify-center">

//                 {/* Vertical Dotted Line for active item */}
//                 <div className="absolute top-[30vh] left-1/2 w-px h-[60px] md:h-[80px] border-l border-dashed border-white/40 z-20" />

//                 {/* Active Text Description (with key for CSS re-animation) */}
//                 <div className="absolute top-[40vh] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-center z-20 pointer-events-none">
//                     <p
//                         key={fadeKey}
//                         className="text-white text-sm md:text-base font-medium whitespace-pre-line leading-relaxed opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards]"
//                     >
//                         {UNIQUE_DATA[safeDataIndex]?.text || ''}
//                     </p>
//                 </div>

//                 {/* Centering Wrapper for Wheel */}
//                 <div className="absolute top-[80px] left-1/2 z-0 mt-[10vh] -translate-x-1/2">

//                     {/* The Large Rotating Wheel with CSS Transitions */}
//                     <div
//                         className="relative rounded-full border border-dashed border-black/30 shrink-0"
//                         style={{
//                             width: '3000px',
//                             height: '3000px',
//                             transform: `rotate(${rotationState.rotation}deg)`,
//                             transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
//                         }}
//                     >
//                         {MOCK_DATA.map((item, i) => {
//                             const rotation = i * angleStep;
//                             const isActive = rotationState.activeIndex === i;

//                             return (
//                                 <div
//                                     key={i}
//                                     className="absolute origin-bottom z-10 cursor-pointer group"
//                                     style={{
//                                         top: 0,
//                                         left: '50%',
//                                         marginLeft: '-20px', // Centers the 40px width element
//                                         width: '40px', // Wider clickable area
//                                         height: '1500px', // Radius
//                                         transform: `rotate(${rotation}deg)`
//                                     }}
//                                     onClick={() => handleDotClick(i)}
//                                 >
//                                     {/* Dot */}
//                                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                                         <div
//                                             className={`rounded-full transition-all duration-300
//                                                 ${isActive
//                                                     ? 'bg-[#ff5a00] w-5 h-5 shadow-[0_0_15px_rgba(255,90,0,0.5)]'
//                                                     : 'bg-white w-3 h-3 group-hover:scale-150'
//                                                 }
//                                             `}
//                                         />
//                                     </div>

//                                     {/* Year Text placed radially outside the arc */}
//                                     <div className="absolute top-[-30px] md:top-[-45px] left-1/2 -translate-x-1/2 -translate-y-full text-center">
//                                         <span
//                                             className={`text-2xl md:text-4xl font-bold tracking-wide transition-all duration-300
//                                                 ${isActive
//                                                     ? 'text-white-900!'
//                                                     : 'text-white/40! group-hover:text-white!'
//                                                 }
//                                             `}
//                                         >
//                                             {item.year}
//                                         </span>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>

//             {/* Injected Keyframes for smooth text animation */}
//             <style dangerouslySetInnerHTML={{
//                 __html: `
//                 @keyframes fade-in-up {
//                     0% { opacity: 0; transform: translateY(15px); }
//                     100% { opacity: 1; transform: translateY(0); }
//                 }
//             `}} />
//         </section>
//     );
// };

// export default WWMilestones;


"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

const UNIQUE_DATA = [
    { year: '2006', text: 'Foundation of Whistling Woods International.' },
    { year: '2010', text: 'Expanded campus facilities and introduced new courses.' },
    { year: '2011', text: 'Ranked among the top 10 film schools globally.' },
    { year: '2013', text: 'Introduced degree programs in animation and media.' },
    { year: '2014', text: "Partnered with the Tata Institute of Social Sciences (TISS) to offer UG & PG degree." },
    { year: '2015', text: 'Collaborated with international universities for student exchange.' },
    { year: '2016', text: 'Launched School of Design and School of Fashion.' },
    { year: '2018', text: 'Celebrated over 2000 alumni working in the industry.' },
    { year: '2020', text: 'Adapted to hybrid learning models successfully.' },
    { year: '2023', text: 'Continuing the legacy of excellence in creative arts.' },
];

const N = UNIQUE_DATA.length;

/* ---------- Tuning knobs ---------- */
const SCROLL_DRIVEN = true;   // true = section pins and scrolling rotates the wheel. false = click only
const SCROLL_VH = 55;         // scroll distance (in vh) per year while pinned
const STEP = 16.5;            // degrees between two years on the wheel
const ARC_TOP = 170;          // y position (px, inside the stage) of the active dot
const ACCENT = '#d1582b';

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// Makes every year "dwell" in the centre for a bit, then glide to the next one
const dwell = (x) => {
    const i = Math.floor(x);
    const f = x - i;
    let g = clamp((f - 0.25) / 0.5, 0, 1);
    g = g * g * (3 - 2 * g);
    return i + g;
};

const WWMilestones = () => {
    const sectionRef = useRef(null);
    const wheelRef = useRef(null);
    const rafRef = useRef(0);
    const currentRef = useRef(SCROLL_DRIVEN ? 0 : 4);
    const targetRef = useRef(SCROLL_DRIVEN ? 0 : 4);

    const [active, setActive] = useState(SCROLL_DRIVEN ? 0 : 4);
    const [vw, setVw] = useState(1260);

    // Wheel radius follows the screen width (≈707px at 1260px wide, like the design)
    const R = clamp(vw * 0.56, 380, 780);

    const applyRotation = () => {
        if (wheelRef.current) {
            wheelRef.current.style.transform = `rotate(${-currentRef.current * STEP}deg)`;
        }
    };

    // Smoothly chase the target position (scroll "scrub" with easing)
    const kick = useCallback(() => {
        if (rafRef.current) return;
        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const tick = () => {
            const diff = targetRef.current - currentRef.current;
            if (Math.abs(diff) < 0.0008) {
                currentRef.current = targetRef.current;
                applyRotation();
                setActive(Math.round(currentRef.current));
                rafRef.current = 0;
                return;
            }
            currentRef.current += diff * (reduce ? 1 : 0.085);
            applyRotation();
            const idx = Math.round(currentRef.current);
            setActive((p) => (p === idx ? p : idx));
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    // Viewport width
    useEffect(() => {
        const onResize = () => setVw(window.innerWidth);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Scroll -> target index
    useEffect(() => {
        applyRotation();
        if (!SCROLL_DRIVEN) return;

        const onScroll = () => {
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = el.offsetHeight - window.innerHeight;
            if (total <= 0) return;
            const p = clamp(-rect.top / total, 0, 1);
            targetRef.current = dwell(p * (N - 1));
            kick();
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        };
    }, [kick]);

    const handleDotClick = (i) => {
        if (i === active) return;

        if (SCROLL_DRIVEN && sectionRef.current) {
            // Scroll to the matching position so scroll + click stay in sync
            const el = sectionRef.current;
            const total = el.offsetHeight - window.innerHeight;
            const top = el.getBoundingClientRect().top + window.scrollY + (i / (N - 1)) * total;
            window.scrollTo({ top, behavior: 'smooth' });
        } else {
            targetRef.current = i;
            kick();
        }
    };

    const paragraphs = UNIQUE_DATA[active]?.text.split('\n\n') || [];

    return (
        <section
            ref={sectionRef}
            className="relative text-white"
            style={{
                backgroundColor: '#2b6aab',
                height: SCROLL_DRIVEN ? `calc(100vh + ${(N - 1) * SCROLL_VH}vh)` : undefined,
            }}
        >
            <div
                className={
                    SCROLL_DRIVEN
                        ? 'sticky top-0 overflow-hidden'
                        : 'relative overflow-hidden pb-10'
                }
                style={SCROLL_DRIVEN ? { height: '100vh', minHeight: 680 } : undefined}
            >
                {/* Grain texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: NOISE, opacity: 0.12, mixBlendMode: 'overlay' }}
                />

                {/* Header */}
                <div
                    className="relative z-10 text-center px-4 mx-auto max-w-5xl"
                    style={{ paddingTop: 'clamp(28px, 8vh, 80px)' }}
                >
                    {/* <h2
                        className="font-medium  tracking-tight mb-5"
                        style={{ fontSize: 'clamp(28px, 3.3vw, 44px)' }}
                    >
                        WWI Milestones — From Vision To
                        <br className="hidden md:block" /> A Global Creative Community
                    </h2> */}

                    <h4 className='mb-5'>
                        WWI Milestones — From Vision To <br /> A Global Creative Community
                    </h4>
                    <p className="text-sm mx-auto text-white/90 max-w-md leading-relaxed">
                        From a bold vision to a thriving community shaping the future of
                        media, communication, and creative arts.
                    </p>
                </div>

                {/* Stage */}
                <div className="relative w-full  " style={{ height: 560 }}>
                    {/* Fixed connector lines around the active year */}
                    <div className="absolute  left-1/2 w-px bg-white/40 z-20" style={{ top: ARC_TOP - 150, height: 40 }} />
                    <div className="absolute  left-1/2 w-px bg-white/40 z-20" style={{ top: ARC_TOP - 51, height: 25 }} />
                    <div className="absolute  left-1/2 w-px bg-white/40 z-20" style={{ top: ARC_TOP + 56, height: 56 }} />

                    {/* Description */}
                    <div
                        className="absolute  left-1/2 -translate-x-1/2 w-full px-6 text-center z-20 pointer-events-none"
                        style={{ top: ARC_TOP + 150, maxWidth: 440 }}
                    >
                        <div key={active} className="wwm-fade">
                            {paragraphs.map((p, idx) => (
                                <p
                                    key={idx}
                                    className={`text-[15px] leading-[1.45] ${idx > 0 ? 'mt-4' : ''}`}
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Wheel */}
                    <div
                        ref={wheelRef}
                        className="absolute rounded-full border \ border-dashed border-white/30"
                        style={{
                            left: '50%',
                            top: ARC_TOP,
                            width: R * 2,
                            height: R * 2,
                            marginLeft: -R,
                            willChange: 'transform',
                        }}
                    >
                        {UNIQUE_DATA.map((item, i) => {
                            const isActive = active === i;
                            return (
                                <div
                                    key={item.year}
                                    className="absolute group cursor-pointer"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        width: 0,
                                        height: 0,
                                        transform: `rotate(${i * STEP}deg) translateY(${-R}px)`,
                                    }}
                                    onClick={() => handleDotClick(i)}
                                >
                                    {/* Dot (with a larger hit area) */}
                                    <div
                                        className="absolute flex items-center justify-center"
                                        style={{ width: 48, height: 48, left: -24, top: -24 }}
                                    >
                                        <div
                                            className="rounded-full group-hover:scale-125"
                                            style={{
                                                width: isActive ? 20 : 16,
                                                height: isActive ? 20 : 16,
                                                backgroundColor: isActive ? ACCENT : '#fff',
                                                transition: 'all 0.35s ease',
                                            }}
                                        />
                                    </div>

                                    {/* Year, placed radially outside the arc */}
                                    <span
                                        className="absolute whitespace-nowrap font-medium select-none"
                                        style={{
                                            left: 0,
                                            bottom: 58,
                                            transform: 'translateX(-50%)',
                                            fontSize: 'clamp(22px, 2.7vw, 36px)',
                                            lineHeight: 1.1,
                                            color: '#fff',
                                            opacity: isActive ? 1 : 0.8,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                    >
                                        {item.year}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes wwmFade {
                        0%   { opacity: 0; transform: translateY(14px); filter: blur(4px); }
                        100% { opacity: 1; transform: translateY(0);    filter: blur(0); }
                    }
                    .wwm-fade { animation: wwmFade 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
                    @media (prefers-reduced-motion: reduce) { .wwm-fade { animation: none; } }
                `,
                }}
            />
        </section>
    );
};

export default WWMilestones;
