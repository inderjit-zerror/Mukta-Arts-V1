// "use client";

// import React, { useRef, useState, useEffect } from 'react';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { usePathname, useRouter } from 'next/navigation';
// import Link from 'next/link';

// const Header = () => {
//   const containerRef = useRef(null);
//   const menuButtonRef = useRef(null);
//   const menuTextRef = useRef(null);
//   const magneticAreaRef = useRef(null);
//   const menuOverlayRef = useRef(null);
//   const closeButtonRef = useRef(null);
//   const bgOverlayRef = useRef(null);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const tl = useRef();
//   const router = useRouter();
//   const pathname = usePathname();
//   const isTransitioningRef = useRef(false);

//   const { contextSafe } = useGSAP({ scope: containerRef });

//   const createTimeline = contextSafe(() => {
//     if (tl.current) tl.current.kill();
//     tl.current = gsap.timeline({ paused: true });

//     tl.current.to(bgOverlayRef.current, {
//       opacity: 1,
//       pointerEvents: "auto",
//       duration: 0.8,
//       ease: "power2.inOut"
//     }, 0)
//       .to(menuOverlayRef.current, {
//         x: '0%',
//         duration: 1,
//         ease: "expo.inOut"
//       }, 0)
//       .to('.menu-line', {
//         width: '100%',
//         duration: 0.8,
//         stagger: 0.05,
//         ease: "expo.inOut"
//       }, "-=0.6")
//       .to('.menu-item-text', {
//         y: '0%',
//         duration: 0.8,
//         stagger: 0.05,
//         ease: "expo.out"
//       }, "-=0.7")
//       .fromTo(closeButtonRef.current, {
//         opacity: 0,
//         rotate: -90,
//         scale: 0.5
//       }, {
//         opacity: 1,
//         rotate: 0,
//         scale: 1,
//         duration: 0.8,
//         ease: "expo.out"
//       }, "-=0.6");
//   });

//   useGSAP(() => {
//     createTimeline();
//   }, { scope: containerRef });

//   useEffect(() => {
//     if (isMenuOpen) {
//       tl.current.play();
//     } else {
//       tl.current.reverse();
//       // Reset dropdown when menu is closed
//       setTimeout(() => setOpenDropdown(null), 800);
//     }
//   }, [isMenuOpen]);

//   const handleLinkClick = (e, href) => {
//     e.preventDefault();
//     if (isTransitioningRef.current) return;

//     // If clicking the current page, just close the menu
//     if (href === pathname || href === pathname + '/') {
//       setIsMenuOpen(false);
//       return;
//     }

//     isTransitioningRef.current = true;

//     // Fade out menu contents
//     gsap.to('.menu-item-text, .menu-line', { opacity: 0, duration: 0.4, ease: 'power2.inOut', stagger: 0.02 });
//     gsap.to(closeButtonRef.current, { opacity: 0, duration: 0.3, ease: 'power2.inOut' });
//     gsap.to(bgOverlayRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });

//     // Expand menu to cover screen
//     gsap.to(menuOverlayRef.current, {
//       width: '100vw',
//       duration: 1,
//       ease: 'expo.inOut',
//       onComplete: () => {
//         router.push(href);
//       }
//     });
//   };

//   useEffect(() => {
//     // If the pathname changed and we are in the middle of a transition, slide it out
//     if (isTransitioningRef.current) {
//       gsap.to(menuOverlayRef.current, {
//         x: '-100%',
//         duration: 1,
//         ease: 'expo.inOut',
//         delay: 0.2, // brief delay to allow new page to render
//         onComplete: () => {
//           setIsMenuOpen(false);
//           isTransitioningRef.current = false;

//           // Reset styles to CSS defaults
//           gsap.set(bgOverlayRef.current, { clearProps: 'all' });
//           gsap.set(menuOverlayRef.current, { clearProps: 'all' });
//           gsap.set('.menu-item-text, .menu-line', { clearProps: 'all' });
//           gsap.set(closeButtonRef.current, { clearProps: 'all' });

//           // Rebuild the menu timeline to prevent GSAP overwrite issues
//           createTimeline();
//         }
//       });
//     }
//   }, [pathname]);

//   const handleMouseMove = contextSafe((e) => {
//     if (isMenuOpen) return; // Don't do magnetic effect if menu is open

//     const { clientX, clientY } = e;
//     const { left, top, width, height } = magneticAreaRef.current.getBoundingClientRect();

//     const x = clientX - (left + width / 2);
//     const y = clientY - (top + height / 2);

//     gsap.to(menuButtonRef.current, {
//       x: x * 0.4,
//       y: y * 0.4,
//       duration: 0.6,
//       ease: "power2.out"
//     });

//     gsap.to(menuTextRef.current, {
//       x: x * 0.2,
//       y: y * 0.2,
//       duration: 0.6,
//       ease: "power2.out"
//     });
//   });

//   const handleMouseLeave = contextSafe(() => {
//     if (isMenuOpen) return;

//     gsap.to([menuButtonRef.current, menuTextRef.current], {
//       x: 0,
//       y: 0,
//       duration: 1,
//       ease: "elastic.out(1, 0.4)"
//     });
//   });

//   return (
//     <header ref={containerRef} className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center pointer-events-none z-99999">
//       <div className="pointer-events-auto relative z-[60]">
//         {pathname !== '/' && (
//           <Link href="/">
//             <img src="/img/logo/logo.png" alt="Logo" className="h-8 md:h-12 w-auto object-contain" />
//           </Link>
//         )}
//       </div>

//       {/* Background Blur Overlay */}
//       <div
//         ref={bgOverlayRef}
//         className="fixed inset-0 w-screen h-screen bg-black/70 opacity-0 pointer-events-none z-[40]"
//         style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
//         onClick={() => setIsMenuOpen(false)}
//       ></div>

//       {/* Main Menu Button */}
//       <div
//         ref={magneticAreaRef}
//         className={`pointer-events-auto relative p-0 cursor-pointer z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         onClick={() => setIsMenuOpen(true)}
//       >
//         <button
//           ref={menuButtonRef}
//           className="relative flex items-center justify-center gap-3 bg-[#111] text-white px-7 py-1  overflow-hidden group hover:bg-[#222] transition-colors duration-300"
//         >
//           <div className="absolute inset-0 bg-[#0474BA] translate-y-[101%]  group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
//           <span
//             ref={menuTextRef}
//             className="relative z-10  transition-colors duration-500 delay-100 block"
//           >
//             Menu
//           </span>
//         </button>
//       </div>

//       {/* Side Menu Overlay */}
//       <div
//         ref={menuOverlayRef}
//         className="fixed top-0 right-0 w-full md:w-[50vw] h-[100svh] bg-[#0474BA] translate-x-full pointer-events-auto flex flex-col justify-center px-8 md:px-20 z-50 shadow-2xl"
//       >
//         <button
//           ref={closeButtonRef}
//           onClick={() => setIsMenuOpen(false)}
//           className="absolute top-10 right-10 text-white text-3xl font-extralight hover:text-gray-400 transition-colors cursor-pointer w-12 h-12 flex items-center justify-center"
//         >
//           ✕
//         </button>

//         <div className="flex flex-col w-full relative mt-[20vh] mb-auto">
//           <div className="w-0 h-[1px] bg-white/80 menu-line"></div>
//           {[
//             { name: "Home", url: '/' },
//             {
//               name: "About",
//               dropdown: [
//                 { name: "Board of Directors", url: "/under-development" },
//                 { name: "Investor Relations", url: "/under-development" },
//                 { name: "Company Overview", url: "/under-development" }
//               ]
//             },
//             { name: "Subhash Ghai", url: "/under-development" },
//             {
//               name: "The Ecosystem",
//               dropdown: [
//                 { name: "Mukta Arts Productions", url: "/our-films" },
//                 { name: "Whistling Woods", url: "/under-development" },
//                 { name: "Mukta A2 Cinemas", url: "/under-development" },
//                 { name: "SGM Studios", url: "/under-development" },
//                 { name: "Mukta VN Films", url: "/under-development" }
//               ]
//             },
//             { name: "Submit Script", url: "/under-development" }
//           ].map((item, index) => (
//             <React.Fragment key={index}>
//               {item.dropdown ? (
//                 <div className="py-2 md:py-1 block overflow-hidden">
//                   <div
//                     className="menu-item-text translate-y-full text-white cursor-pointer flex justify-between items-center group"
//                     onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
//                   >
//                     <h4 className="inline-block font-light! transform origin-left transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-skew-x-12 group-hover:translate-x-4">
//                       {item.name}
//                     </h4>
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className={`transform transition-transform duration-500 mr-2 md:mr-8 ${openDropdown === index ? 'rotate-180' : ''}`}
//                     >
//                       <path d="m6 9 6 6 6-6" />
//                     </svg>
//                   </div>
//                   <div
//                     className={`flex flex-col gap-1 ml-6 md:ml-8 overflow-hidden transition-all duration-500 ease-in-out ${openDropdown === index ? 'max-h-80 opacity-100 mt-4 mb-2' : 'max-h-0 opacity-0 mt-0 mb-0'}`}
//                   >
//                     {item.dropdown.map((subItem, subIndex) => (
//                       <a
//                         key={subIndex}
//                         href={subItem.url}
//                         onClick={(e) => handleLinkClick(e, subItem.url)}
//                         className="block w-fit group"
//                       >
//                         <span className="inline-block text-white/70 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-skew-x-12 group-hover:translate-x-4 text-lg md:text-xl font-light transform origin-left">
//                           {subItem.name}
//                         </span>
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <a href={item.url} onClick={(e) => handleLinkClick(e, item.url)} className="py-2 md:py-1 block overflow-hidden group">
//                   <div className="menu-item-text translate-y-full text-white">
//                     <h4 className="inline-block font-light! transform origin-left transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-skew-x-12 group-hover:translate-x-4">
//                       {item.name}
//                     </h4>
//                   </div>
//                 </a>
//               )}
//               <div className="w-0 h-[1px] bg-white/80 menu-line"></div>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const containerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuTextRef = useRef(null);
  const magneticAreaRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const closeButtonRef = useRef(null);
  const bgOverlayRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const tl = useRef();
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioningRef = useRef(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const createTimeline = contextSafe(() => {
    if (tl.current) tl.current.kill();
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(bgOverlayRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.8,
      ease: "power2.inOut"
    }, 0)
      .to(menuOverlayRef.current, {
        x: '0%',
        duration: 1,
        ease: "expo.inOut"
      }, 0)
      .to('.menu-line', {
        width: '100%',
        duration: 0.8,
        stagger: 0.05,
        ease: "expo.inOut"
      }, "-=0.6")
      .to('.menu-item-text', {
        y: '0%',
        duration: 0.8,
        stagger: 0.05,
        ease: "expo.out"
      }, "-=0.7")
      .fromTo(closeButtonRef.current, {
        opacity: 0,
        rotate: -90,
        scale: 0.5
      }, {
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.8,
        ease: "expo.out"
      }, "-=0.6");
  });

  useGSAP(() => {
    createTimeline();
  }, { scope: containerRef });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
      // Reset dropdown when menu is closed
      setTimeout(() => setOpenDropdown(null), 800);
    }
  }, [isMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (isTransitioningRef.current) return;

    // If clicking the current page, just close the menu
    if (href === pathname || href === pathname + '/') {
      setIsMenuOpen(false);
      return;
    }

    isTransitioningRef.current = true;

    // Fade out menu contents (including dropdown sub-items)
    gsap.to('.menu-item-text, .menu-line, .menu-subitem-text', { opacity: 0, duration: 0.4, ease: 'power2.inOut', stagger: 0.02 });
    gsap.to(closeButtonRef.current, { opacity: 0, duration: 0.3, ease: 'power2.inOut' });
    gsap.to(bgOverlayRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });

    // Expand menu to cover screen
    gsap.to(menuOverlayRef.current, {
      width: '100vw',
      duration: 1,
      ease: 'expo.inOut',
      onComplete: () => {
        router.push(href);
      }
    });
  };

  useEffect(() => {
    // If the pathname changed and we are in the middle of a transition, slide it out
    if (isTransitioningRef.current) {
      gsap.to(menuOverlayRef.current, {
        x: '-100%',
        duration: 1,
        ease: 'expo.inOut',
        delay: 0.2, // brief delay to allow new page to render
        onComplete: () => {
          setIsMenuOpen(false);
          isTransitioningRef.current = false;

          // Reset styles to CSS defaults
          gsap.set(bgOverlayRef.current, { clearProps: 'all' });
          gsap.set(menuOverlayRef.current, { clearProps: 'all' });
          gsap.set('.menu-item-text, .menu-line, .menu-subitem-text', { clearProps: 'all' });
          gsap.set(closeButtonRef.current, { clearProps: 'all' });

          // Rebuild the menu timeline to prevent GSAP overwrite issues
          createTimeline();
        }
      });
    }
  }, [pathname]);

  const handleMouseMove = contextSafe((e) => {
    if (isMenuOpen) return; // Don't do magnetic effect if menu is open

    const { clientX, clientY } = e;
    const { left, top, width, height } = magneticAreaRef.current.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(menuButtonRef.current, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(menuTextRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (isMenuOpen) return;

    gsap.to([menuButtonRef.current, menuTextRef.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.4)"
    });
  });

  return (
    <header ref={containerRef} className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center pointer-events-none z-99999">
      <div className="pointer-events-auto relative z-[60]">
        {pathname !== '/' && (
          <Link href="/">
            <img src="/img/logo/logo.png" alt="Logo" className="h-8 md:h-12 w-auto object-contain" />
          </Link>
        )}
      </div>

      {/* Background Blur Overlay */}
      <div
        ref={bgOverlayRef}
        className="fixed inset-0 w-screen h-screen bg-black/70 opacity-0 pointer-events-none z-[40]"
        style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Main Menu Button */}
      <div
        ref={magneticAreaRef}
        className={`pointer-events-auto relative p-0 cursor-pointer z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsMenuOpen(true)}
      >
        <button
          ref={menuButtonRef}
          className="relative flex items-center justify-center gap-3 bg-[#111] text-white px-7 py-1  overflow-hidden group hover:bg-[#222] transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-[#0474BA] translate-y-[101%]  group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
          <span
            ref={menuTextRef}
            className="relative z-10  transition-colors duration-500 delay-100 block"
          >
            Menu
          </span>
        </button>
      </div>

      {/* Side Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed top-0 right-0 w-full md:w-[50vw] h-[100svh] bg-[#0474BA] translate-x-full pointer-events-auto flex flex-col justify-center px-8 md:px-20 z-50 shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-10 right-10 text-white text-3xl font-extralight hover:text-gray-400 transition-colors cursor-pointer w-12 h-12 flex items-center justify-center"
        >
          ✕
        </button>

        <div className="flex flex-col w-full relative mt-[20vh] mb-auto">
          <div className="w-0 h-[1px] bg-white/80 menu-line"></div>
          {[
            { name: "Home", url: '/' },
            {
              name: "About", url: "/under-development"

            },
            { name: "Subhash Ghai", url: "/under-development" },
            {
              name: "The Ecosystem",
              dropdown: [
                { name: "Mukta Arts Productions", url: "/our-films" },
                { name: "Whistling Woods", url: "/under-development" },
                { name: "Mukta A2 Cinemas", url: "/under-development" },
                { name: "SGM Studios", url: "/under-development" },
                { name: "Mukta VN Films", url: "/under-development" }
              ]
            },
            { name: "Submit Script", url: "/under-development" }
          ].map((item, index) => (
            <React.Fragment key={index}>
              {item.dropdown ? (
                <div className="py-2 md:py-1 block overflow-hidden">
                  <div
                    className="menu-item-text translate-y-full text-white cursor-pointer flex justify-between items-center group"
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  >
                    <h4 className="inline-block font-light! transform origin-left transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-skew-x-12 group-hover:translate-x-4">
                      {item.name}
                    </h4>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transform transition-transform duration-500 mr-2 md:mr-8 ${openDropdown === index ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                  <div
                    className={`flex flex-col gap-1 ml-6 md:ml-8 overflow-hidden transition-all duration-500 ease-in-out ${openDropdown === index ? 'max-h-80 opacity-100 mt-4 mb-2' : 'max-h-0 opacity-0 mt-0 mb-0'}`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.url}
                        onClick={(e) => handleLinkClick(e, subItem.url)}
                        className="block w-fit group menu-subitem-text"
                      >
                        <span className="relative inline-block text-white/70 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-skew-x-12 group-hover:translate-x-5 text-lg md:text-xl font-light transform origin-left">
                          <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                          {subItem.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a href={item.url} onClick={(e) => handleLinkClick(e, item.url)} className="py-2 md:py-1 block overflow-hidden group">
                  <div className="menu-item-text translate-y-full text-white">
                    <h4 className="inline-block font-light! transform origin-left transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-skew-x-12 group-hover:translate-x-4">
                      {item.name}
                    </h4>
                  </div>
                </a>
              )}
              <div className="w-0 h-[1px] bg-white/80 menu-line"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;